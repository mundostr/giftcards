import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [alertError, setAlertError] = useState('')
  const [frm, setFrm] = useState({ email: '', password: '' })
  
  useEffect(() => {
    (async () => {
    })();

    return () => {}
  }, []) // Array vacío, se ejecuta SOLO al montar

  const handleChange = (event) => {
    setFrm({...frm, [event.target.name]: event.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const frmElement = e.currentTarget

    if (!frmElement.checkValidity()) {
      setAlertError('Por favor, complete los campos requeridos')
      frmElement.querySelector('input[type=email]').focus()
    } else {
      if (frm.password.length > 0 && frm.password.length < 6) {
        setAlertError('La clave debe tener entre 6 y 12 caracteres')
        frmElement.querySelector('input[type=password]').focus()
      } else {
        setAlertError('')

        const resultado = await fetch('https://rolling55ibackend-production.up.railway.app/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(frm)
        })
        const resultadoJson = await resultado.json();

        if (resultadoJson.status == 'OK') {
          localStorage.setItem('cart_user', JSON.stringify(resultadoJson.data));
          navigate('/giftcards', { replace: true });
        } else {
          setAlertError(resultadoJson.data)
          frmElement.querySelector('input[type=email]').focus()
        }
      }
    }
  }

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
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" value={frm.email} name="email" maxLength={32} required autoFocus onChange={handleChange} />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Clave</Form.Label>
                  <Form.Control type="password" value={frm.password} name="password" maxLength={12} required onChange={handleChange} />
                </Form.Group>
                
                <Button type="submit" variant="warning">Ingresar</Button>

                {alertError && <Alert className="mt-3" key="warning" variant="warning">{alertError}</Alert>}
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
