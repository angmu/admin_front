import { Card, CardHeader, Container, Row, Col } from 'reactstrap';
import React from 'react';
import Header from 'components/Headers/Header.js';
import UserList from '../../components/User/UserListComponent';

export default function MemberList() {
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardHeader className="bg-transparent border-0">
                <h3 className="mb-0">회원리스트</h3>
              </CardHeader>
              <UserList />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
