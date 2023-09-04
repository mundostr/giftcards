import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

import { users_data } from '../helpers/data.js'

const Login = () => {
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([])
  const [frm, setFrm] = useState({ username: '', password: '' })
  
  useEffect(() => {
    (async () => {
      /* const resultado = await fetch(URL_API)
      const resultadoJson = await resultado.json(); */
      setUsuarios(users_data)
    })();

    return () => {}
  }, []) // Array vacío, se ejecuta SOLO al montar

  const handleChange = (event) => {
    setFrm({...frm, [event.target.name]: event.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let usuarioIndex = usuarios.findIndex(item => { return item.username === frm.username });

    console.log(usuarioIndex);

    if (usuarioIndex > -1) {
      if (frm.password === usuarios[usuarioIndex].password) {
        const data = { username: usuarios[usuarioIndex].username, id: usuarios[usuarioIndex].id };
        localStorage.setItem('cart_user', JSON.stringify(data));
        navigate('/giftcards', { replace: true });
      }
    }
  };

  return (
    <>
      <Container className="container-fluid container-home">
        <Row>
          <Col className="col-xs-12 col-md-6 col-home">
            <Row>
              <h1>¿Tienes una Gift Card?</h1>
              <h3>Prueba todas las marcas que la aceptan de manera online</h3>
            </Row>
          </Col>

          <Col className="col-xs-12  col-md-6 col-home">
            <Row className="card p-3" style={{width: '100%'}}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control type="text" placeholder="Nombre" value={frm.username} name="username" maxLength={16} required  autoFocus onChange={handleChange} />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Clave</Form.Label>
                  <Form.Control type="password" value={frm.password} name="password" maxLength={12} required onChange={handleChange} />
                </Form.Group>
                
                <Button type="submit" variant="warning">Ingresar</Button>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* <Container className="col col-md-4 offset-md 4 mt-4 p-4 bg-light container-blocks">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Nombre" value={frm.username} name="username" maxLength={16} required  autoFocus onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Clave</Form.Label>
            <Form.Control type="password" value={frm.password} name="password" maxLength={12} required onChange={handleChange} />
          </Form.Group>

          <Button type="submit" variant="warning">Ingresar</Button>
        </Form>
      </Container> */}
    </>
  )
}

export default Login;
