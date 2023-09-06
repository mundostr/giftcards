import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Cart from "./pages/Cart.jsx"
import Login from "./pages/Login.jsx"
import Menu from './components/Menu.jsx'
import Error404 from './pages/Error404.jsx'
import GiftCards from './pages/GiftCards.jsx'

function App() {
  return (
    <Router>
      <Menu />
      
      {/*
      Nuestro paquete de rutas solo contiene un Home, un Login y el listado de Giftcars.
      Por supuesto podemos agregar otras según sea necesario. El route de 404 siempre queda
      al final para capturar cualquier ruta incorrecta que se introduzca manualmente en la URL.
      */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/giftcards" element={<GiftCards />} />
        
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
