import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [alertError, setAlertError] = useState('')
  const [frm, setFrm] = useState({ email: '', password: '' })
  
  // useEffect con array vacío, se ejecuta SOLO al montar
  useEffect(() => {
    (async () => {
    })();

    return () => {}
  }, [])

  // Cada vez que hay un cambio de contenido en los campos del formulario,
  // actualizamos el objeto frm
  const handleChange = (event) => {
    setFrm({...frm, [event.target.name]: event.target.value});
  };

  const handleSubmit = async (e) => {
    // Evitamos que el navegador siga su secuencia habitual, manejaremos nosotros el formulario
    e.preventDefault()

    // Generamos referencia al objeto de formulario en el DOM para chequear validez.
    const frmElement = e.currentTarget
    if (!frmElement.checkValidity()) {
      setAlertError('Por favor, complete los campos requeridos')
      frmElement.querySelector('input[type=email]').focus()
    } else {
      // Aunque el HTML nos indique formulario válido, podemos agregar más controles aquí
      if (frm.password.length > 0 && frm.password.length < 6) {
        setAlertError('La clave debe tener entre 6 y 12 caracteres')
        frmElement.querySelector('input[type=password]').focus()
      } else {
        // Si todo está bien, realizamos una solicitud POST a la API, enviando el contenido del formulario
        setAlertError('')

        const resultado = await fetch('https://rolling55ibackend-production.up.railway.app/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(frm)
        })
        const resultadoJson = await resultado.json();

        // Si la API responde con un OK, quiere decir que la autenticación fue exitosa, disponemos de datos
        // de usuario, incluyendo un token, los almacenamos en localStorage.
        if (resultadoJson.status == 'OK') {
          localStorage.setItem('cart_user', JSON.stringify(resultadoJson.data));
          navigate('/giftcards', { replace: true });
        } else {
          // Si hubo algún problema, el objeto data contendrá el mensaje de error, lo mostramos y volvemos al formulario
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
              {/*
              noValidate evita que el navegador muestre los mensajes de validación por defecto en los campos,
              los reemplazaremos por nuestro Alert con un mensaje personalizado para cada caso.

              MUY IMPORTANTE que el name de los input (Form.Control) coincida con lo que el endpoint espera,
              caso contrario hay que rearmar el objeto con las keys que corresponde más arriba en la solicitud POST
              */}
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

                {/*
                Esta caja de alerta solo aparece si alertError contiene algún texto
                */}
                {alertError && <Alert className="mt-3" key="warning" variant="warning">{alertError}</Alert>}
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login;
