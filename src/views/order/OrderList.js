import {
  Card,
  CardBody,
  ButtonGroup,
  Button,
  CardFooter,
  CardHeader,
  Container,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import React, { Fragment, useState, useEffect } from 'react';
import OrderSearchComponent from '../../components/Order/OrderSearchComponent';
import classnames from 'classnames';
import ApiService from '../../apiService/ApiService';
import { dateConverter } from '../../components/utils/DateConverter';
import OrderListComponent from '../../components/Order/OrderListComponent';
import OrderComponent from '../../components/Order/OrderComponent';
import PaymentComponent from '../../components/Order/PaymentComponent';
import PayeeComponent from '../../components/Order/PayeeComponent';

const modalStyle = {
  position: 'relative',
  display: 'table' /* This is important */,
  overflowY: 'auto',
  overflowX: 'auto',
  width: 'auto',
  minWidth: '300px',
};

export default function OrderList() {
  //주문데이터
  const [orderData, setOrderData] = useState([]);
  //주문내역데이터
  const [orderListData, setOrderListData] = useState([]);

  //주문상태변경
  const orderState = ['결제완료', '배송중', '배송완료', '취소대기', '취소승인'];
  const orderBtn = ['#99D4F1', '#58B570', '#C3FB8E', '#B39F9C', '#B39F9C'];

  //초기 데이타(주문데이터, 주문내역데이터 불러오기)
  useEffect(() => {
    orderLoading();
    orderListLoading();
  }, []);

  //orderData loading
  const orderLoading = () => {
    ApiService.fetchOrder()
      .then((res) => {
        setOrderData(res.data);
      })
      .catch((err) => console.log(err));
  };

  //orderListData loading
  const orderListLoading = () => {
    ApiService.fetchOrderList()
      .then((res) => {
        setOrderListData(res.data);
      })
      .catch((err) => console.log(err));
  };

  //주문->주문상세 모달
  const [modal, setModal] = useState(false);
  //modal Toggle
  const modalToggle = () => setModal(!modal);

  //주문상태변경 nestedModal
  const [nestedModal, setNestedModal] = useState(false);

  //선택한 데이터(모달 호출)
  const [selectedNum, setNum] = useState({});
  const selectNum = (obj) => setNum(obj);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };

  //선택한 데이터의 주문상태와 바꿀 주문상태
  const [selOrderState, setOrderState] = useState('');

  //테이블 탭
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  //join both data (특정주문에 대한 주문번호)
  const joinData = () => {
    const fData = orderListData.map((obj) =>
      Object.assign(
        obj,
        orderData.find((dd) => dd.o_num === obj.o_num),
      ),
    );

    if (selectedNum) {
      return fData.filter((data) => data.o_num === selectedNum.o_num);
    }
    return fData;
  };

  //button click
  const btnClick = (index) => {
    setOrderState(orderState[index]);
    toggleNested();
  };

  //order상태 변경
  const updateOrderState = () => {
    ApiService.updateOStatus(selectedNum.o_num, selOrderState)
      .then((res) => {
        ApiService.fetchOrder()
          .then((res) => {
            setOrderData(res.data);
            selectNum(res.data.find((o) => o.o_num === selectedNum.o_num));
          })
          .catch((err) => console.log(err));
        orderListLoading();
      })
      .catch((err) => console.log(err));
  };

  //뱃지색깔
  const badgeColor = (status) => {
    switch (status) {
      case '결제대기중':
        return 'rgba(129,224,224,0.88)';
      case '결제완료':
        return orderBtn[0];
      case '배송중':
        return orderBtn[1];
      case '배송완료':
        return orderBtn[2];
      case '구매확정':
        return '#cbffcd';
      default:
        return orderBtn[3];
    }
  };

  //검색조건
  const [sCondition, setCondition] = useState({});
  const handleSubmit = (e, condition) => {
    setCondition(condition);
    e.preventDefault();
  };

  return (
    <Fragment>
      <Container className="themed-container pt-7" fluid={true}>
        <Card>
          <CardHeader>
            <strong>전체주문목록</strong>
            <hr className="mt-4" />
            <OrderSearchComponent handleSubmit={handleSubmit} />
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
                      <OrderComponent
                        orderData={orderData}
                        modalToggle={modalToggle}
                        selectNum={selectNum}
                        badgeColor={badgeColor}
                        sCondition={sCondition}
                      />
                    </Col>
                  </Row>
                </TabPane>

                {/* 주문내역번호별 */}
                <TabPane tabId="2">
                  <Row>
                    <Col sm={12}>
                      <OrderListComponent
                        orderListData={orderListData}
                        badgeColor={badgeColor}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </CardBody>
          <CardFooter></CardFooter>
          <Modal
            style={modalStyle}
            isOpen={modal}
            fade={false}
            toggle={modalToggle}
          >
            <ModalHeader toggle={modalToggle}>주문상세내역</ModalHeader>
            <ModalBody>
              <p className="pb-0 mb-0 mt-0">주문번호: {selectedNum.o_num}</p>
              <p className="pt-0 mt-0">
                주문일자: {dateConverter(selectedNum.o_date)}{' '}
              </p>
              <div>
                <p style={{ display: 'inline-block' }} className="mr-2">
                  주문상태변경
                </p>
                <ButtonGroup size="sm">
                  {orderState.map((os, index) => (
                    <Button
                      style={{ backgroundColor: orderBtn[index] }}
                      onClick={() => btnClick(index)}
                      disabled={selectedNum.o_status === orderState[index]}
                      key={index}
                    >
                      {os}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <OrderListComponent
                orderListData={joinData()}
                badgeColor={badgeColor}
              />
              {/*주문 상태 변경 모달*/}
              <Modal isOpen={nestedModal} fade={false} toggle={toggleNested}>
                <ModalHeader>주문상태변경</ModalHeader>
                <ModalBody>
                  <strong>{selectedNum.o_status}</strong>{' '}
                  <i className="fas fa-arrow-right"></i>{' '}
                  <strong>{selOrderState}</strong>
                  (으)로 변경합니다.
                </ModalBody>
                <ModalFooter className="mt-0 pt-0">
                  <Button
                    color="warning"
                    onClick={() => {
                      toggleNested();
                      updateOrderState();
                    }}
                  >
                    OK
                  </Button>{' '}
                </ModalFooter>
              </Modal>
              <div>
                <p>결제정보</p>
                <PaymentComponent selectedNum={selectedNum} />
              </div>

              <div className="pt-3">
                <p>수취자정보</p>
                <PayeeComponent selectedNum={selectedNum} />
              </div>
            </ModalBody>
          </Modal>
        </Card>
      </Container>
    </Fragment>
  );
}
