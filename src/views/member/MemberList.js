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
  CardTitle
} from "reactstrap";
import React from 'react'
import Header from "components/Headers/Header.js";
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
              <Table>
                  <thead>
                    <tr>
                      <th scope="col">글번호</th>
                      <th scope="col">글제목</th>
                      <th scope="col">작성자</th>
                      <th scope="col">작성일</th>
                      <th scope="col">조회수</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      
                    </tr>


                  </tbody>
              </Table>
            </Card>
          </Col>
      </Row>
    </Container>
    </>
  )
}
