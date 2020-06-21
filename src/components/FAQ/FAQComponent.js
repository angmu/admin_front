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
import { paginate } from '../utils/Paginate';
import { dateConverter } from '../utils/DateConverter';
import ApiService from '../../apiService/ApiService';

export default class FAQComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      currentPage: 1,
      collapseOpen: [],
      inputText: [],
    };

    this.pageSize = 8;
    this.resultCnt = 0;
  }

  componentDidMount() {
    this.loadingData();
  }

  //FAQ 목록 불러오기
  loadingData = () => {
    ApiService.fetchFaq()
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => console.log(err));
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
    //if answerText가 없으면 insert
    //있으면 update
    //-----------------------------------

    if (this.state.answerText[index]) {
      console.log('update');
    } else {
      this.props
        .patchA(
          JSON.stringify({
            key: key,
            text: this.state.inputText[index],
          }),
        )
        .then(() => {
          this.loadingData();
        });
    }
  };

  //answerDelete
  answerDelete = (key, index) => {
    const inputText = [...this.state.inputText];
    inputText[index] = '';
    const managedToggle = [...this.state.collapseOpen];
    managedToggle[index] = false;
    this.props
      .removeA(key)
      .then(() => {
        this.setState(
          {
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
    const editText = this.state.answerText[index];
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

    this.resultCnt = filteredData.length;

    filteredData = paginate(filteredData, this.currentPage, this.pageSize).map(
      (cons, index) => (
        <React.Fragment key={cons.review_num}>
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
                    {' '}
                    {idx >= this.props.rowId.length - 2
                      ? dateConverter(cons[rr])
                      : cons[rr]}
                  </td>
                </Fragment>
              ))}
            </tr>
            <tr>
              <td colSpan={7}>
                <Collapse isOpen={this.state.collapseOpen[index]}>
                  <Card>
                    <CardBody>
                      <div style={{ textAlign: 'left' }}>
                        <h3>{cons.faq_title}</h3>
                        <span className="mb-0 pt-1 pb-0"></span>
                        <span className="mb-0 pb-0">
                          <p className="mb-0 pb-0">
                            {' '}
                            작성일: {dateConverter(cons.faq_written_date)}
                          </p>
                        </span>
                        <span className="mb-0 pb-0">
                          <p className="mb-0 pb-0">
                            {' '}
                            최종수정일: {dateConverter(cons.faq_modified_date)}
                          </p>
                        </span>
                        <hr className="pt-0 mt-3 mb-0"></hr>
                        <pre
                          style={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                          }}
                          className="pt-3"
                        >
                          {cons.faq_content}
                        </pre>
                      </div>
                    </CardBody>
                    <CardFooter>
                      {' '}
                      <Button size="sm" color="warning">
                        수정
                      </Button>
                      <Button size="sm" color="warning">
                        삭제
                      </Button>
                    </CardFooter>
                  </Card>
                </Collapse>
              </td>
            </tr>
          </>
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
                  <h3 style={{ display: 'inline-block' }}>
                    {this.props.subject}
                  </h3>
                  <div className="custom-control custom-checkbox float-right mr-3 mt-3">
                    <div
                      className="mr-5"
                      style={{ display: 'inline-block', minWidth: '150px' }}
                    ></div>
                    <button type="button" className="btn btn-success">
                      FAQ 등록
                    </button>
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
