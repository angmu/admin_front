import React from 'react';
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Button,
  Input,
} from 'reactstrap';

export default function SearchBox() {
  return (
    <Container>
      <Row>
        <Col>
          <Input></Input>
        </Col>
        <Col>
          <Input></Input>
        </Col>
        <Col>
          <Input></Input>
        </Col>
        <Col>
          <Button>SEARCH</Button>
        </Col>
      </Row>
    </Container>
  );
}
