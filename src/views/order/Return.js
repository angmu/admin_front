import {
  Card,
  CardBody,
  ButtonGroup,
  Button,
  CardFooter,
  CardHeader,
  Container,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import React, { Fragment, useState, useEffect } from 'react';
import ReturnSearchComponent from '../../components/Order/ReturnSearchComponent';
import ApiService from '../../apiService/ApiService';
import { dateConverter } from '../../components/utils/DateConverter';
import OrderListComponent from '../../components/Order/OrderListComponent';
import ReturnComponent from '../../components/Order/ReturnComponent';
import PaymentComponent from '../../components/Order/PaymentComponent';
import _ from 'lodash';

//반품 & 교환
const modalStyle = {
  position: 'relative',
  display: 'table' /* This is important */,
  overflowY: 'auto',
  overflowX: 'auto',
  width: 'auto',
  minWidth: '300px',
};

export default function Return() {
  //주문데이터
  const [orderData, setOrderData] = useState([]);
  //주문내역데이터
  const [orderListData, setOrderListData] = useState([]);
  //반품데이터
  const [changeData, setChangeData] = useState([]);

  //주문상태변경
  const orderState = [['반품', '교환'], ['신청', '대기', '승인']];
  const orderBtn = [['#99D4F1', '#58B570'], ['#C3FB8E', '#B39F9C', '#B39F9C']];

  //가공된 change데이터
  const [afterChange, setAfterChange] = useState([]);
  //가공된 orderList 데이터
  const [afterOl, setAfterOl] = useState([]);


  //초기 데이타(주문데이터, 주문내역데이터, 반품데이터 불러오기)
  useEffect(() => {
    orderLoading();
    orderListLoading();
    changeLoading();
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

  //change/return data loading
  const changeLoading = () => {
    ApiService.fetchChangeList()
      .then(res => {
        setChangeData(res.data);
      })
      .catch(err => console.log(err));
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


  // 조인조인
  const initJoinData = (flag) => {
    return new Promise((resolve, reject) => {
      if (flag === 1) {
        const fData = orderListData.map((obj) =>
          Object.assign(
            obj,
            orderData.find((dd) => dd.o_num === obj.o_num),
          ),
        );

        if (Object.keys(selectedNum).length !== 0) {
          resolve(fData.filter((data) => data.key === selectedNum.key));
        } else {
          resolve(fData);
        }

      } else if (flag === 2) {

        const fData = changeData.map((obj) =>
          Object.assign(
            obj,
            orderListData.find((cd) => cd.key === obj.key),
          ),
        );

        if (Object.keys(selectedNum).length !== 0) {
          resolve(fData.filter((data) => data.key === selectedNum.key));
        } else {
          resolve(fData);
        }
      } else {
        reject('error');
      }

    });
  };


  //join both data (특정주문에 대한 주문번호)
  const joinData = () => {
    initJoinData(1).then((res) => setAfterOl(res));

  };

  //join both data (반품정보)
  const joinDataC = () => {
    initJoinData(2).then((res) => setAfterChange(res));
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
            <strong>반품/교환목록</strong>
            <hr className="mt-4"/>
            <ReturnSearchComponent handleSubmit={handleSubmit}/>
          </CardHeader>
          <CardBody>
            <div>
              <Row>
                <Col sm={12}>
                  <ReturnComponent
                    orderListData={afterOl}
                    badgeColor={badgeColor}
                    orderData={orderData}
                    sCondition={sCondition}
                    changeData={afterChange}
                    modalToggle={modalToggle}
                    selectNum={selectNum}
                  />
                </Col>
              </Row>

            </div>
          </CardBody>
          <CardFooter></CardFooter>
          <Modal
            style={modalStyle}
            isOpen={modal}
            fade={false}
            toggle={modalToggle}
          >
            <ModalHeader toggle={modalToggle}>반품/교환 신청내역</ModalHeader>
            <ModalBody>
              <p className="pb-0 mb-0 mt-0">주문번호: {selectedNum.o_num}</p>
              <p className="pt-0 mt-0">
                주문일자: {dateConverter(selectedNum.o_date)}{' '}
              </p>
              <div>
                <p style={{ display: 'inline-block' }} className="mr-2">
                  반품/교환 상태변경
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

                <ReturnComponent
                  changeData={afterChange}
                  orderListData={orderListData}
                  badgeColor={badgeColor}
                />
              </div>

              <div>
                <p>주문상태</p>
                <OrderListComponent
                  orderListData={afterOl}
                  badgeColor={badgeColor}
                />
              </div>
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

            </ModalBody>
          </Modal>
        </Card>
      </Container>
    </Fragment>
  );
}
