import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Button,
  CardFooter,
} from 'reactstrap';
import React, { useState, useContext, useEffect } from 'react';
import CustomTable from '../layouts/CustomTable';
import CustomTableBoard from './CustomTableBoard';
import '../assets/css/board.css';
import CustomModal from '../layouts/Modal';
import Checkbox from './Checkbox';

export default function Board(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const value = useContext(props.context);
  const { wideToggle } = useContext(props.context);

  useEffect(() => {
    wideToggle(setModal);
  }, []);

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
              <Row>
                <Col lg={10} sm={10}>
                  {props.searchBox ? props.searchBox : ''}
                </Col>
                <Col sm={2}>{props.flag === 1 ? null : <Checkbox />}</Col>
              </Row>
            </CardHeader>
            <CardBody>
              {props.flag === 1 ? (
                <CustomTableBoard {...props} />
              ) : (
                <CustomTable {...props} />
              )}
            </CardBody>{' '}
            {/* 페이지네이션 */}
            <CardFooter className="py-4">
              {props.pagination ? props.pagination : ''}
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
