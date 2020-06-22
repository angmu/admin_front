import {
  Card, CardText, CardBody,
  CardTitle, Button, CardFooter, CardHeader, Container, Col,
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import React, { Fragment, useState, useEffect } from 'react';
import OrderSearchComponent from '../../components/Order/OrderSearchComponent';
import classnames from 'classnames';
import ApiService from '../../apiService/ApiService';
import { dateConverter } from '../../components/utils/DateConverter';
import OrderListComponent from '../../components/Order/OrderListComponent';
//페이지네이션
import Pagination from '../../layouts/Pagination';
import { paginate } from '../../components/utils/Paginate';

const modalStyle = {
  position: 'relative',
  display: 'table', /* This is important */
  overflowY: 'auto',
  overflowX: 'auto',
  width: 'auto',
  minWidth: '300px',
};

export default function OrderList() {

  //현재 페이지
  const [curPage, setCurPage] = useState(1);
  //한 페이지에 몇개 보여줄 건지..
  const pageSize = 8;
  // 검색결과 카운트
  let resultCnt = 0;



  //주문데이터
  const [orderData, setOrderData] = useState([]);
  //주문내역데이터
  const [orderListData, setOrderListData] = useState(
    [],
  );

  //초기 데이타(주문데이터, 주문내역데이터 불러오기)
  useEffect(() => {
    orderLoading();
    orderListLoading();
  }, []);


  //orderData loading
  const orderLoading = () => {
    ApiService.fetchOrder()
      .then(res => {
        setOrderData(res.data);
      })
      .catch(
        err => console.log(err),
      );
  };

  //orderListData loading
  const orderListLoading = () => {
    ApiService.fetchOrderList()
      .then(res => {
        setOrderListData(res.data);
      }).catch(err => console.log(err));
  };


  //주문->주문상세 모달
  const [modal, setModal] = useState(false);
  //modal Toggle
  const modalToggle = () => setModal(!modal);

  //선택한 데이터(모달 호출)
  const [selectedNum, setNum] = useState({});
  const selectNum = (obj) => setNum(obj);

  //테이블 탭
  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  //join both data
  const joinData = () => {

    const fData = orderListData.map((obj) =>
      Object.assign(
        obj,
        orderData.find((dd) => dd.o_num === obj.o_num),
      ),
    );

    if (selectedNum) {
      return fData.filter(data => data.o_num === selectedNum.o_num);
    }
    return fData;

  };


  return <Fragment>
    <Container className="themed-container pt-7" fluid={true}>
      <Card>
        <CardHeader>
          <strong>전체주문목록</strong>
          <hr className="mt-4"/>
          <OrderSearchComponent/>
        </CardHeader>
        <CardBody>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  주문번호별
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  주문내역번호별
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              {/* 주문번호별 */}
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-light">
                        <tr>
                          <th>주문번호</th>
                          <th>주문자아이디</th>
                          <th>주문자명</th>
                          <th>전화번호</th>
                          <th>주문금액</th>
                          <th>주문상태</th>
                          <th>적립포인트</th>
                          <th>주문일</th>
                          <th>결제일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderData.map(data => {
                            return (
                              <tr key={data.o_num}>
                                <td><p style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                       onClick={() => {
                                         modalToggle();
                                         selectNum(orderData.find(o => o.o_num === data.o_num));
                                       }}>{data.o_num}</p></td>
                                <td>{data.id ? data.id : '비회원'}</td>
                                <td>{data.o_name}</td>
                                <td>{data.o_tel}</td>
                                <td>{`${data.o_cost.toLocaleString()}원`}</td>
                                <td>{data.o_status}</td>
                                <td>{`${data.o_point}p`}</td>
                                <td>{dateConverter(data.o_date)}</td>
                                <td>{data.o_update_date !== data.o_date? dateConverter(data.o_date):null}</td>
                              </tr>
                            );
                          },
                        )}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
              </TabPane>

              {/* 주문내역번호별 */}
              <TabPane tabId="2">
                <Row>
                  <Col sm={12}>
                    <OrderListComponent orderListData={orderListData}/>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </CardBody>
        <CardFooter>

        </CardFooter>
        <Modal style={modalStyle} isOpen={modal} fade={false} toggle={modalToggle}>
          <ModalHeader toggle={modalToggle}>주문상세내역
          </ModalHeader>
          <ModalBody>
            <p className="pb-0 mb-0 mt-0">주문번호: {selectedNum.o_num}</p>
            <p className="pt-0 mt-0">주문일자: {dateConverter(selectedNum.o_date)} </p>
            <OrderListComponent orderListData={joinData()}/>
          </ModalBody>

        </Modal>
      </Card>
    </Container>
  </Fragment>;
}