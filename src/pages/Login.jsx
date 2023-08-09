import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

import { users_data } from '../helpers/data.js'

const Login = () => {
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([])
  const [frm, setFrm] = useState({ username: '', password: '' })

  useEffect(() => {
    (async () => {
      setUsuarios(users_data)
    })();

    return () => { }
  }, []) // Array vacío, se ejecuta SOLO al montar

  const handleChange = (event) => {
    const focusUser = document.querySelector("input[name='username']");
    const focusPassword = document.querySelector("input[name='password']");
    if (event.target.name === 'username') {
      let usuarioIndex = usuarios.findIndex(item => { return item.username === event.target.value });
      if (usuarioIndex > -1) {
        focusUser.classList.remove("is-invalid");
      } else {
        focusUser.classList.add("is-invalid");
      }
    } else if (event.target.name === 'password') {
      let usuarioIndex = usuarios.findIndex(item => { return item.username === frm.username });
      if (usuarioIndex > -1 && event.target.value === usuarios[usuarioIndex].password) {
        focusPassword.classList.remove("is-invalid");
      } else {
        focusPassword.classList.add("is-invalid");
      }
    }

    setFrm({ ...frm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let usuarioIndex = usuarios.findIndex(item => { return item.username === frm.username });
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
      <Container className="col col-md-4 offset-md 4 mt-4 p-4 bg-light container-blocks">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Nombre" value={frm.username} name="username" maxLength={16} required autoFocus onChange={handleChange} />
            <Form.Control.Feedback type="invalid">
              El usuario no es valido
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Clave</Form.Label>
            <Form.Control type="password" value={frm.password} name="password" maxLength={12} required onChange={handleChange} />
            <Form.Control.Feedback type="invalid">
              La contraseña no es correcta
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="warning">Ingresar</Button>
        </Form>
      </Container>
    </>
  )
}

export default Login;
