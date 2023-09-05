import { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const GiftCards = () => {
  const user = JSON.parse(localStorage.getItem('cart_user')) || {cart: []}
  user.total = user.cart.reduce((acc, current) => {return acc + parseFloat(current.price)}, 0) || 0

  const [giftCards, setGiftCards] = useState([])
  const [userCart, setUserCart] = useState({cart: user.cart, total: user.total})

  const updateCart = async (card) => {
    try {
      user.cart.push(card)

      const update = await fetch(`https://rolling55ibackend-production.up.railway.app/api/users/cart/${user._id}`, {
        method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ cart: user.cart })
      })

      const result = await update.json()

      if (result.status === 'OK') {
        localStorage.setItem('cart_user', JSON.stringify(user))
        setUserCart(current => { return {cart: user.cart, total: current.total + parseFloat(card.price)} })
      } else {
        console.log(result.data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  // useEffect de Array vacío, se ejecuta SOLO al montar
  useEffect(() => {
    (async () => {
      try {
        const data = await fetch('https://rolling55ibackend-production.up.railway.app/api/giftcards')
        const dataJson = await data.json()
        setGiftCards(dataJson.data)
      } catch (error) {
        console.log(error.message)
      }
    })()
    
    return () => { }
  }, []);

  return (
    <>
      <Container className="col-xs-12 mt-4 mb-4 p-4 bg-light container-blocks">
        <Row>
          <Col>
            <h1>GiftCards aceptadas</h1>

            { user.hasOwnProperty('token') &&
              <div className="cart-box">
                <h5>Productos en carrito</h5>

                <div>
                  <Button variant="warning" style={{width: '100%'}}>
                    <i className="fa fa-shopping-cart fa-2x"></i>
                    <span className="badge bg-secondary ms-2">{userCart.cart.length > 0 ? userCart.cart.length : '0'}</span>
                    <span className="badge bg-secondary ms-1" style={{fontSize: '110%'}}>$ {userCart.total > 0 ? userCart.total : '0'}</span>
                  </Button>
                </div>
              </div>
            }
            <hr />
          </Col>
        </Row>
        
        <Row>
          { giftCards && giftCards.map(card => {
            return (
                <Col xs={12} md={6} lg={3} key={card._id}>
                  <div className="card mb-4">
                    <h5 className="card-title" style={{padding: '0.5em'}}>{card.title}</h5>
                    
                    <img src={card.image} alt={card.title} style={{width: '75%', height: '75%'}} />
                    
                    <div className="card-body">
                      <h3 className="card-text text-end">$ {card.price} AR</h3>
                      <div style={{width: '100%', textAlign: 'right'}}>
                        {user.hasOwnProperty('token') && ( <button className="btn btn-warning" onClick={() => {updateCart(card)}} style={{width: '64px'}}><i className="fa fa-cart-plus fa-2x"></i></button> )}
                      </div>
                    </div>
                  </div>
                </Col>
            )
            })
          }
        </Row>
      </Container>
    </>
  );
};

export default GiftCards