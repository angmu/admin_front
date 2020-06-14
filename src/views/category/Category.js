import React from 'react';

// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from 'reactstrap';
// core components
import UserHeader from 'components/Headers/UserHeader.js';
import ApiService from '../../apiService/ApiService';
import Category1Component from '../../components/Category/Category1Component';
import Category2Component from '../../components/Category/Category2Component';

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category1Data: null,
      category2Data: null,
      selectedRow: -1,
    };
  }

  componentDidMount() {
    this.loadingData();
  }

  loadingData = () => {
    ApiService.fetchProductCate1()
      .then((res) => {
        this.setState({
          category1Data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    ApiService.fetchProductCate2()
      .then((res) => {
        this.setState({
          category2Data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //1차카테고리 row 클릭
  rowClick = (code) => {
    this.setState({
      selectedRow: code,
    });
  };

  //add버튼 클릭이벤트
  addClick1 = () => {
    const newItem = {
      cate_code_d1: '',
      cate_name_d1: '',
    };
    this.setState({
      category1Data: [...this.state.category1Data, newItem],
    });
  };

  addClick2 = () => {
    const newItem = {
      cate_code_d1: this.state.selectedRow,
      cate_code_d2: '',
      cate_name_d2: '',
    };
    this.setState({
      category2Data: [...this.state.category2Data, newItem],
    });
  };

  //db에 카테고리1 저장하기
  insertCategory1 = (data) => {
    ApiService.addProductCate1(data)
      .then((res) => {
        this.loadingData();
      })
      .catch((err) => {
        alert('카테고리1 저장 실패!' + err.response.data);
        console.log(err);
      });
  };

  //db에 카테고리2 저장하기
  insertCategory2 = (data) => {
    ApiService.addProductCate2(data)
      .then((res) => {
        this.loadingData();
      })
      .catch((err) => {
        alert('카테고리2 저장 실패!' + err.response.data);
      });
  };

  //db에서 카테고리1 삭제하기
  deleteCategory1 = (data) => {
    ApiService.deleteProductCate1(data)
      .then(() => {
        this.loadingData();
      })
      .catch((err) => {
        alert('카테고리1 삭제 실패!' + err.response.data);
        console.log(err);
      });
  };

  //db에서 카테고리2 삭제하기
  deleteCategory2 = (data) => {
    ApiService.deleteProductCate2(data)
      .then(() => {
        this.loadingData();
      })
      .catch((err) => {
        alert('카테고리2 삭제 실패!' + err.response.data);
      });
  };

  filterCode = () => {
    //빈칸인거 걸러냄
    const filtered1 = this.state.category1Data.filter(
      (cons) => cons.cate_code_d1 !== '' && cons.cate_name_d1 !== '',
    );
    const filtered2 = this.state.category2Data.filter(
      (cons) => cons.cate_code_d2 !== '' && cons.cate_name_d2 !== '',
    );

    this.setState({
      category1Data: filtered1,
      category2Data: filtered2,
    });
  };

  render() {
    return (
      <>
        <UserHeader />
        <Container className="mt--7" fluid>
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-4 ml-1">카테고리 관리</h3>
            </Col>
          </Row>
          <Row>
            <Col className="order-xl-1 mb-5 mb-xl-0" xl="6">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3"></Col>
                </Row>
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">대카테고리</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Category1Component
                    data={this.state.category1Data}
                    addClick={this.addClick1}
                    rowClick={this.rowClick}
                    selectedRow={this.state.selectedRow}
                    filterCode={this.filterCode}
                    sendData={this.insertCategory1}
                    deleteData={this.deleteCategory1}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-2" xl="6">
              <Card className="card-profil shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">소카테고리</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {this.state.selectedRow === -1 ? (
                    <div className="text-center">
                      <div className="h3 font-weight-300">
                        대카테고리를 먼저 선택해야합니다
                      </div>
                    </div>
                  ) : (
                    <Category2Component
                      data={this.state.category2Data}
                      addClick={this.addClick2}
                      selectedRow={this.state.selectedRow}
                      filterCode={this.filterCode}
                      sendData={this.insertCategory2}
                      deleteData={this.deleteCategory2}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Category;
