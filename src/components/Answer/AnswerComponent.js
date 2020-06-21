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
import React, { Component, Fragment } from 'react';
import CustomTableAnswer from '../../layouts/CustomTableAnswer';
//페이지네이션
import Pagination from '../../layouts/Pagination';
import { paginate } from '../../components/utils/Paginate';
import { dateConverter } from '../utils/DateConverter';
//searchbox
import SearchBoxBasic from '../../layouts/SearchBoxBasic';
import Dropbox from '../../layouts/Dropbox';

export default class AnswerComponent extends Component {
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
      selectedOption: null,
    };

    this.pageSize = 8;
    this.resultCnt = 0;
  }

  componentDidMount() {
    this.loadingData();
  }

  loadingData = () => {
    this.props.tableDataQ().then((data) =>
      this.setState(
        {
          data: data,
        },
        () => {
          this.props.tableDataA().then((data) => {
            const aData = data;
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
        },
      ),
    );
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
      this.props
        .updateA(
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
      this.props
        .insertA(
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
    this.props
      .deleteA(this.state.answerData[index].a_num)
      .then(() => {
        this.setState(
          {
            answerData: [],
            answerText: [],
            inputText: inputText,
            collapseOpen: managedToggle,
          },
          this.loadingData(),
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

  //selectBox 핸들러
  handleSelectBox = (selectedOption) => {
    this.setState({ selectedOption });
  };

  //row 제목들
  subject = () =>
    this.props.tableSubjects.map((subj, index) => (
      <th style={{ width: this.props.tdStyle[index] }} scope="row" key={index}>
        {subj}
      </th>
    ));

  //들어갈 내용들
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

    const ss = [];
    //검색어가 있을 경우
    if (this.state.keyword !== '') {
      filteredData.forEach((data) => {
        if (data.q_title.indexOf(this.state.keyword) > -1) ss.push(data.q_num);
      });
    }

    const sopt = [];
    //select option이 있을 경우
    if (this.state.selectedOption) {
      this.state.selectedOption.forEach((opt) => sopt.push(opt.value));
    }

    if (
      (this.state.keyword !== '' && ss.length === 0) ||
      (this.state.checked && ready.length === 0)
    ) {
      return (
        <tr>
          <td colSpan={6} style={{ textAlign: 'center' }}>
            검색결과가 없습니다
          </td>
        </tr>
      );
    }
    this.resultCnt = filteredData.length;

    filteredData = paginate(filteredData, this.currentPage, this.pageSize).map(
      (cons, index) => (
        <React.Fragment key={cons.q_num}>
          {(ready.length > 0 && !ready.includes(cons.q_num)) ||
          (sopt.length > 0 && !sopt.includes(cons.q_type)) ||
          (ss.length > 0 && !ss.includes(cons.q_num)) ? null : (
            <>
              <tr
                style={{
                  cursor: 'pointer',
                  background: this.state.collapseOpen[index]
                    ? '#FAFAD2'
                    : 'white',
                }}
                onClick={() => this.toggle(index)}
              >
                {this.props.rowId.map((rr, idx) => (
                  <Fragment key={idx}>
                    <td>
                      {idx === this.props.rowId.length - 1
                        ? dateConverter(cons[rr])
                        : cons[rr]}
                    </td>
                  </Fragment>
                ))}
                <td>
                  {this.state.answerData[index] ? (
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
                  <Collapse isOpen={this.state.collapseOpen[index]}>
                    <Card>
                      <CardBody>
                        <div style={{ textAlign: 'left' }}>
                          <h3>{cons.q_title}</h3>
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
                          {cons.q_file ? (
                            <p>
                              <img
                                src={cons.q_file}
                                style={{ width: '348px' }}
                                alt="이미지"
                              />
                            </p>
                          ) : null}
                          {cons.q_content}
                        </div>
                        <hr className="pt-0 mb-0"></hr>

                        {/* //이미 답변된 데이터 */}
                        {this.state.answerText[index] ? (
                          <Row>
                            <Col>
                              <pre
                                style={{
                                  textAlign: 'left',
                                  fontWeight: 'bold',
                                }}
                                className="pt-3"
                              >
                                {`${this.state.answerText[index]}`}
                              </pre>
                              <span
                                className="mr-2"
                                style={{ fontSize: '0.8em' }}
                              >
                                {dateConverter(
                                  this.state.answerData[index].a_date,
                                )}
                              </span>
                              <Button
                                size="sm"
                                color="warning"
                                onClick={() => this.putBtnHandler(index)}
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
                                  value={this.state.inputText[index]}
                                  onChange={(e) =>
                                    this.answerInputHandler(e, index)
                                  }
                                />
                              </FormGroup>
                              <Button
                                color="warning"
                                onClick={() =>
                                  this.answerBtnHandler(cons.q_num, index)
                                }
                              >
                                답변등록
                              </Button>
                              {this.state.answerData[index] ? (
                                <React.Fragment>
                                  <Button
                                    color="danger"
                                    onClick={() => this.answerDelete(index)}
                                  >
                                    답변삭제{' '}
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      this.answerBack(cons.q_num, index)
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
          <Row>
            <Col md={12}>
              <Card>
                <CardHeader>
                  <strong>{this.props.subject}</strong>
                  <SearchBoxBasic
                    searching={this.searching}
                    ph={this.props.searchHolder}
                  />
                  <div className="custom-control custom-checkbox float-right mr-3 mt-3">
                    <div
                      className="mr-5"
                      style={{ display: 'inline-block', minWidth: '150px' }}
                    >
                      <Dropbox
                        text={'질문분류'}
                        options={this.props.options}
                        value={this.state.selectedOption}
                        onChange={this.handleSelectBox}
                      />
                    </div>
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
