import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap';
import React from 'react';
import Header from 'components/Headers/Header.js';
import EventListComponent from '../../components/Event/EventListComponent';
import WriteModal from '../../components/Event/WriteModalComponent';

export default function EventList() {
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="card-stats mb-4 mb-xl-0" style={{ width: '100%' }}>
              <CardHeader className="bg-transparent border-0">
                <Row>
                  <Col>
                    <h3 className="mb-0">이벤트글관리</h3>
                  </Col>
                  <Col>
                    <WriteModal
                      buttonLabel={'이벤트 등록'}
                      className={'modal-dialog modal-xl'}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <EventListComponent />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
