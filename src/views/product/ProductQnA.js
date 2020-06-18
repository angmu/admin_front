import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  CardFooter,
} from 'reactstrap';
import React, { Component } from 'react';
import ApiService from '../../apiService/ApiService';
import CustomTableAnswer from '../../layouts/CustomTableAnswer';
//페이지네이션
import Pagination from '../../layouts/Pagination';
import { paginate } from '../../components/utils/Paginate';
import { dateConverter } from '../../components/utils/DateConverter';

export default class ProductQnA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      currentPage: 1,
    };

    this.tableSubject = [
      '질문번호',
      '상품번호',
      '상품이름',
      '작성자',
      '제목',
      '질문작성일',
      '답변상태',
    ];

    this.styled = [
      '10.0%',
      '10.0%',
      '27.0%',
      '13.0%',
      '30.0%',
      '40.0%',
      '10.0%',
    ];

    this.pageSize = 8;
    this.resultCnt = 0;
  }

  componentDidMount() {
    ApiService.fetchProductQuestion()
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //page변경 핸들러
  handleChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  subject = () =>
    this.tableSubject.map((subj, index) => (
      <th style={{ width: this.styled[index] }} scope="row" key={index}>
        {subj}
      </th>
    ));

  contents = () => {
    if (!this.state.data) return;

    let filteredData = this.state.data;

    console.log(filteredData);
    this.resultCnt = filteredData.length;

    return paginate(filteredData, this.currentPage, this.pageSize).map(
      (cons, index) => (
        <tr key={cons.q_num}>
          <td>{cons.q_num}</td>
          <td>{cons.pro_num}</td>
          <td>{cons.product_name}</td>
          <td>{cons.id}</td>
          <td style={{ fontSize: '0.92em' }}>{cons.q_title}</td>
          <td style={{ fontSize: '0.75em' }}>{dateConverter(cons.q_date)}</td>
          <td>답변대기</td>
        </tr>
      ),
    );
  };

  render() {
    return (
      <div className="bodyWrap">
        <Container className="themed-container" fluid={true}>
          <Row md={12}>
            <Col>
              <Card>
                <CardHeader>
                  <strong>상품문의글 목록</strong>
                </CardHeader>
                <CardBody>
                  <CustomTableAnswer
                    tableSubject={this.subject()}
                    contents={this.contents()}
                  />
                </CardBody>
                <CardFooter>
                  <Pagination
                    itemsCount={this.resultCnt}
                    pageSize={this.pageSize}
                    currentPage={this.state.currentPage}
                    onPageChange={this.handleChangePage}
                  />
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
