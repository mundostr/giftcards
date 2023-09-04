import { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const API_URL = 'http://localhost:5000/api/giftcards'

const GiftCards = () => {
  let user = JSON.parse(localStorage.getItem('cart_user')) || null

  const [giftCards, setGiftCards] = useState([])
  const [userCart, setUserCart] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(API_URL)
        const dataJson = await data.json()
        setGiftCards(dataJson.data)
      } catch (error) {
        console.log(error.message)
      }
    })();

    return () => { }
  }, []); // Array vació, se ejecuta SOLO al montar

  const addCart = (card) => {
    setUserCart({ idUser: user.id, product: card });
  };

  return (
    <>
      <Container className="col-xs-12 mt-4 mb-4 p-4 bg-light container-blocks">
        <Row>
          <Col>
            <h1>GiftCards disponibles</h1>

            { user &&
              <Button variant="warning">
                <i className="fa fa-shopping-cart fa-2x"></i>
                <span className="badge bg-secondary ms-2">{userCart ? userCart.length : '0'}</span>
              </Button>
            }
            <hr />
          </Col>
        </Row>
        
        <Row>
          { giftCards && giftCards.map(card => {
            return (
                <Col xs={12} md={6} lg={4} key={card._id}>
                  <div className="card mb-4">
                    <h5 className="card-title" style={{padding: '0.5em'}}>{card.title}</h5>
                    
                    <img src={card.image} alt={card.title} style={{width: '100%'}} />
                    <div className="card-body">
                      <h3 className="card-text text-end">{card.price}</h3>
                      <div className="d-grid gap-2">
                        {user && ( <button className="btn btn-warning" onClick={() => {addCart(card);}}>Agregar</button> )}
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

export default GiftCards;
