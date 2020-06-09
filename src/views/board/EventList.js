import { Card, CardHeader, Container, Row, Col, CardBody } from 'reactstrap';
import React, { useState } from 'react';
import Header from 'components/Headers/Header.js';
import EventListComponent from '../../components/Event/EventListComponent';
import WriteModal from '../../components/Event/WriteModalComponent';
import { RefreshProvider } from '../../components/contexts/EventContext';

export default function EventList() {
  const [counter, setCounter] = useState([0, 0, 0]);

  return (
    <RefreshProvider>
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
                <hr className="mt-3"></hr>
                <Row className="mt--3 mb--3">
                  <Col md="5">
                    <select
                      className="custom-select"
                      style={{
                        height: '30px',
                        width: '50%',
                        float: 'left',
                        fontSize: '0.8em',
                      }}
                    >
                      <option value="1" defaultValue="1">
                        전체보기
                      </option>
                      <option value="2">진행중</option>
                      <option value="3">진행예정</option>
                      <option value="4">종료</option>
                    </select>
                  </Col>
                  <Col md="auto" style={{ fontSize: '0.8em' }}>
                    등록된 이벤트:{' '}
                    <strong>{counter.reduce((a, b) => a + b)}</strong>개
                  </Col>
                  <Col md="auto" style={{ fontSize: '0.8em' }}>
                    진행 예정 이벤트: <strong>{counter[0]}</strong>개
                  </Col>
                  <Col md="auto" style={{ fontSize: '0.8em' }}>
                    진행중인 이벤트: <strong>{counter[1]}</strong>개
                  </Col>
                  <Col md="auto" style={{ fontSize: '0.8em' }}>
                    종료된 이벤트: <strong>{counter[2]}</strong>개
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <EventListComponent counter={setCounter} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </RefreshProvider>
  );
}
