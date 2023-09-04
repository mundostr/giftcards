import { Container, Row, Col, Card } from 'react-bootstrap'
import giftcard from '../img/giftcard.png'

const Home = () => {
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
            <Row className="card p-3">
              <img className="img-home" src={giftcard} alt="imagen gif" style={{width: '100%'}} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
