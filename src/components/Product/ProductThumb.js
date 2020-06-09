import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Container,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
} from 'reactstrap';
import '../../assets/css/product.css';

export default function ProductThumb() {
  const clickHandler = (e) => {
    console.log('클릭됨');
  };

  return (
    <Card style={{}}>
      <CardBody style={{ width: 'fit-content' }}>
        <Row>
          <Col>
            <img
              src="/upup.png"
              alt="..."
              className="img-thumbnail"
              style={{ cursor: 'pointer' }}
              onClick={clickHandler}
            ></img>
          </Col>
        </Row>
        <Row className="mt-2 thumbBox">
          <Col>
            <img
              src="/upup.png"
              alt="..."
              className="img-thumbnail"
              style={{ width: '30%', cursor: 'pointer' }}
              onClick={clickHandler}
            ></img>
            <img
              src="/upup.png"
              alt="..."
              className="img-thumbnail"
              style={{ width: '30%', cursor: 'pointer' }}
              onClick={clickHandler}
            ></img>
            <img
              src="/upup.png"
              alt="..."
              className="img-thumbnail"
              style={{ width: '30%', cursor: 'pointer' }}
              onClick={clickHandler}
            ></img>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
