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
//searchbox
import SearchBoxBasic from '../../layouts/SearchBoxBasic';

export default class ProductQnA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      currentPage: 1,
      collapseOpen: [],
      answerData: [],
      answerText: [],
      inputText: [],
      keyword: '',
      checked: false,
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
    this.loadingData();
  }

  //데이터 로딩(질문데이터)
  loadingData = () => {
    ApiService.fetchProductQuestion()
      .then((res) => {
        this.setState(
          {
            data: res.data,
          },
          this.loadingData2(),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //데이터 로딩2(답변데이터)
  loadingData2 = () => {
    ApiService.fetchProductAnswer().then((res) => {
      const aData = res.data;
      this.state.data.forEach((data, index) => {
        let qna = aData.find((ad) => ad.q_num === data.q_num);
        if (qna) {
          const answerData = [...this.state.answerData];
          const answerText = [...this.state.answerText];
          answerData[index] = qna;
          answerText[index] = qna.a_content;
          this.setState({
            answerData: answerData,
            answerText: answerText,
          });
        }
      });
    });
  };

  //page변경 핸들러
  handleChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  //검색
  //search
  searching = (opts) => {
    this.setState({
      ...opts,
      currentPage: 1,
    });
  };

  //checkbox (답변대기중)
  checking = () => {
    this.setState({
      checked: !this.state.checked,
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
  answerBtnHandler = (key, index) => {
    //-----------------------------------
    //if answerData가 없으면 insert
    //있으면 update
    //-----------------------------------

    if (this.state.answerData[index]) {
      ApiService.updateProductAnswer(
        JSON.stringify({
          key: this.state.answerData[index].a_num,
          text: this.state.inputText[index],
        }),
      )
        .then((res) => {
          this.loadingData();
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      ApiService.addProductAnswer(
        JSON.stringify({
          key: key,
          text: this.state.inputText[index],
        }),
      )
        .then((res) => {
          this.loadingData();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  //answerDelete
  answerDelete = (index) => {
    const inputText = [...this.state.inputText];
    inputText[index] = '';
    const managedToggle = [...this.state.collapseOpen];
    managedToggle[index] = false;
    ApiService.deleteProductAnswer(this.state.answerData[index].a_num)
      .then(() => {
        this.setState(
          {
            answerData: [],
            answerText: [],
            inputText: inputText,
            collapseOpen: managedToggle,
          },
          this.loadingData2(),
        );
      })
      .catch((err) => alert(err));
  };

  //수정버튼
  putBtnHandler = (index) => {
    const editText = this.state.answerData[index].a_content;

    const answerText = [...this.state.answerText];

    //set answerText null
    answerText[index] = null;

    //set defualt text
    const inputText = [...this.state.inputText];
    inputText[index] = editText;

    this.setState({
      answerText: answerText,
      inputText: inputText,
    });
  };

  //answer Input
  answerInputHandler = (e, index) => {
    const inputText = [...this.state.inputText];
    inputText[index] = e.target.value;

    this.setState({
      inputText: inputText,
    });
  };

  //이전으로 버튼
  answerBack = (key, index) => {
    const answerText = [...this.state.answerText];

    //set answerText 다시 셋팅
    answerText[index] = this.state.answerData[index].a_content;
    this.setState({
      answerText: answerText,
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

    const ready = [];
    //답변대기만 보고싶을 경우
    if (this.state.checked) {
      filteredData.forEach((data, index) => {
        if (!this.state.answerData[index]) {
          ready.push(data.q_num);
        }
      });
    }

    //검색어가 있을 경우
    const ss = [];
    if (this.state.keyword !== '') {
      filteredData.forEach((data) => {
        if (
          data.product_name.indexOf(this.state.keyword) > -1 ||
          data.pro_num.indexOf(this.state.keyword) > -1 ||
          data.q_title.indexOf(this.state.keyword) > -1
        )
          ss.push(data.q_num);
      });
    }

    if (
      (this.state.keyword !== '' && ss.length === 0) ||
      (this.state.checked && ready.length === 0)
    ) {
      return (
        <tr>
          <td colSpan={7} style={{ textAlign: 'center' }}>
            검색결과가 없습니다
          </td>
        </tr>
      );
    }

    this.resultCnt = filteredData.length;

    if (this.state.checked || this.state.keyword) {
      this.state.currentPage = 1;
      this.resultCnt = 0;
    } else {
      filteredData = paginate(filteredData, this.state.currentPage, this.pageSize);
    }

    filteredData = filteredData.map(
      (cons, index) => (
        <React.Fragment key={cons.q_num}>
          {(ready.length > 0 && !ready.includes(cons.q_num)) ||
          (ss.length > 0 && !ss.includes(cons.q_num)) ? null : (
            <>
              <tr
                style={{
                  cursor: 'pointer',
                  background: this.state.collapseOpen[index + (this.pageSize * (this.state.currentPage - 1))]
                    ? '#FAFAD2'
                    : 'white',
                }}
                onClick={() => this.toggle(index + (this.pageSize * (this.state.currentPage - 1)))}
              >
                <td>{cons.q_num}</td>
                <td>{cons.pro_num}</td>
                <td>{cons.product_name}</td>
                <td>{cons.id}</td>
                <td style={{ fontSize: '0.92em' }}>{cons.q_title}</td>
                <td style={{ fontSize: '0.75em' }}>
                  {dateConverter(cons.q_date)}
                </td>
                <td>
                  {this.state.answerData[index + (this.pageSize * (this.state.currentPage - 1))] ? (
                    <Badge color="primary" pill>
                      답변완료
                    </Badge>
                  ) : (
                    <Badge color="warning" pill>
                      답변대기
                    </Badge>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={7}>
                  <Collapse isOpen={this.state.collapseOpen[index + (this.pageSize * (this.state.currentPage - 1))]}>
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

                        {/* //이미 답변된 데이터 */}
                        {this.state.answerText[index + (this.pageSize * (this.state.currentPage - 1))] ? (
                          <Row>
                            <Col>
                              <pre
                                style={{
                                  textAlign: 'left',
                                  fontWeight: 'bold',
                                }}
                                className="pt-3"
                              >
                                {`${this.state.answerText[index + (this.pageSize * (this.state.currentPage - 1))]}`}
                              </pre>
                              <span
                                className="mr-2"
                                style={{ fontSize: '0.8em' }}
                              >
                                {dateConverter(
                                  this.state.answerData[index + (this.pageSize * (this.state.currentPage - 1))].a_date,
                                )}
                              </span>
                              <Button
                                size="sm"
                                color="warning"
                                onClick={() => this.putBtnHandler(index + (this.pageSize * (this.state.currentPage - 1)))}
                              >
                                답변수정
                              </Button>
                            </Col>
                          </Row>
                        ) : (
                          <Row>
                            <Col xs={5} lg={11}>
                              <FormGroup>
                                <Label for="exampleText"></Label>
                                <Input
                                  type="textarea"
                                  name="text"
                                  id="exampleText"
                                  style={{ minHeight: '250px' }}
                                  value={this.state.inputText[index + (this.pageSize * (this.state.currentPage - 1))]}
                                  onChange={(e) =>
                                    this.answerInputHandler(e, index + (this.pageSize * (this.state.currentPage - 1)))
                                  }
                                />
                              </FormGroup>
                              <Button
                                color="warning"
                                onClick={() =>
                                  this.answerBtnHandler(cons.q_num, index + (this.pageSize * (this.state.currentPage - 1)))
                                }
                              >
                                답변등록
                              </Button>
                              {this.state.answerData[index] ? (
                                <React.Fragment>
                                  <Button
                                    color="danger"
                                    onClick={() => this.answerDelete(index + (this.pageSize * (this.state.currentPage - 1)))}
                                  >
                                    답변삭제{' '}
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      this.answerBack(cons.q_num, index + (this.pageSize * (this.state.currentPage - 1)))
                                    }
                                  >
                                    이전으로
                                  </Button>
                                </React.Fragment>
                              ) : null}
                            </Col>
                          </Row>
                        )}
                      </CardBody>
                    </Card>
                  </Collapse>
                </td>
              </tr>
            </>
          )}
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
                  <SearchBoxBasic
                    searching={this.searching}
                    ph={'상품번호 혹은 상품이름, 글제목을 입력'}
                  />
                  <div className="custom-control custom-checkbox float-right mr-3 mt-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                      onChange={this.checking}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      답변대기중만
                    </label>
                  </div>
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
