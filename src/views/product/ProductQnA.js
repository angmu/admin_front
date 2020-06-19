import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  CardFooter,
  Collapse,
  Button,
  Badge,
  FormGroup,
  Label,
  Input,
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
      collapseOpen: [],
      answerText: [],
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

  //collapse Open
  toggle = (index) => {
    const managedToggle = [...this.state.collapseOpen];
    managedToggle[index] = !managedToggle[index];
    this.setState({
      collapseOpen: managedToggle,
    });
  };

  //answer OK
  answerBtnHandler = (index) => {
    console.log('answerOK', index);
  };

  //answer Input
  answerInputHandler = (e, index) => {
    const inputText = [...this.state.answerText];
    inputText[index] = e.target.value;

    this.setState({
      answerText: inputText,
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

    //console.log(filteredData);
    this.resultCnt = filteredData.length;

    filteredData = paginate(filteredData, this.currentPage, this.pageSize).map(
      (cons, index) => (
        <React.Fragment key={cons.q_num}>
          <tr
            style={{
              cursor: 'pointer',
              background: this.state.collapseOpen[index] ? '#FAFAD2' : 'white',
            }}
            onClick={() => this.toggle(index)}
          >
            <td>{cons.q_num}</td>
            <td>{cons.pro_num}</td>
            <td>{cons.product_name}</td>
            <td>{cons.id}</td>
            <td style={{ fontSize: '0.92em' }}>{cons.q_title}</td>
            <td style={{ fontSize: '0.75em' }}>{dateConverter(cons.q_date)}</td>
            <td>
              <Badge color="warning" pill>
                답변대기
              </Badge>
            </td>
          </tr>
          <tr>
            <td colSpan={7}>
              <Collapse isOpen={this.state.collapseOpen[index]}>
                <Card>
                  <CardBody>
                    <div style={{ textAlign: 'left' }}>
                      <h3>{cons.q_title}</h3>
                      <span>
                        {cons.pro_num} {cons.product_name}
                      </span>
                      <span className="mb-0 pt-1 pb-0">
                        <p className="mb-0 pb-0"> 작성자: {cons.id}</p>
                      </span>
                      <span className="mb-0 pb-0">
                        <p className="mb-0 pb-0">
                          {' '}
                          작성일: {dateConverter(cons.q_date)}
                        </p>
                      </span>
                      <hr className="pt-0 mt-3"></hr>
                      {cons.q_content}
                    </div>
                    <hr className="pt-0 mb-0"></hr>

                    <Row>
                      <Col xs={5} lg={12}>
                        <FormGroup>
                          <Label for="exampleText"></Label>
                          <Input
                            type="textarea"
                            name="text"
                            id="exampleText"
                            style={{ minHeight: '250px' }}
                            onChange={(e) => this.answerInputHandler(e, index)}
                          />
                        </FormGroup>
                        <Button
                          color="warning"
                          onClick={() => this.answerBtnHandler(index)}
                        >
                          답변등록
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Collapse>
            </td>
          </tr>
        </React.Fragment>
      ),
    );

    return filteredData;
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
