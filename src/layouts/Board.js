import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Button,
} from 'reactstrap';
import React, { useState, useContext } from 'react';
import CustomTable from '../layouts/CustomTable';
import '../assets/css/board.css';
import CustomModal from '../layouts/Modal';

export default function Board(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const value = useContext(props.context);

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col>
          <Card className="card-stats mb-4 mb-xl-0">
            <CardHeader className="bg-transparent border-0">
              <Row>
                <Col>
                  <h3 className="mb-0">{value.subject}</h3>
                </Col>
                <Col>
                  <Button
                    className="regBtn"
                    color="success"
                    onClick={toggleModal}
                  >
                    {value.title}
                  </Button>
                  <CustomModal
                    className={'modal-dialog modal-xl'}
                    isOpen={modal}
                    toggle={toggleModal}
                    {...props}
                  />
                </Col>
              </Row>
              <hr className="mt-3"></hr>
            </CardHeader>
            <CardBody>
              <CustomTable {...props} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
