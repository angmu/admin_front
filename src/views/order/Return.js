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
  //조인데이터
  const [jData, setJData] = useState([]);

  //주문상태변경
  const orderState = [
    ['반품', '교환'],
    ['대기', '승인'],
  ];
  const orderBtn = [
    ['#E95151', '#EECD40'],
    ['#D9D9D7', '#D9D9D7', '#ee87ec'],
  ];


  //초기 데이타(주문데이터, 주문내역데이터, 반품데이터 불러오기)
  useEffect(() => {
    initLoading();
  }, []);

  useEffect(() => {
    initJoinData.then((res) => {
      setJData(res);
      if (Object.keys(selectedNum).length !== 0) {
        selectNum(res.find((o) => o.key === selectedNum.key));
      }
    });
  }, [changeData]);

  //orderData loading
  const initLoading = () => {
    ApiService.fetchOrder()
      .then((res) => {
        setOrderData(res.data);
      })
      .then(() => ApiService.fetchOrderList())
      .then((res) => setOrderListData(res.data))
      .then(() =>
        ApiService.fetchChangeList().then((res) => {
          setChangeData(res.data);
        }),
      )
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

  const objectWithoutKey = (object, key) => {
    const { [key]: deletedKey, ...otherKeys } = object;
    return otherKeys;
  };

  // 조인조인
  const initJoinData = new Promise((resolve, reject) => {
    let cd = _.cloneDeep(changeData);

    cd = cd.map((obj) =>
      Object.assign(
        obj,
        objectWithoutKey(
          objectWithoutKey(
            orderListData.find((dd) => dd.key === obj.key),
            'c_type',
          ),
          'c_state',
        ),
      ),
    );

    cd = cd.map((obj) =>
      Object.assign(
        obj,
        orderData.find((od) => od.o_num === obj.o_num),
      ),
    );

    resolve(cd);
  });

  const filterData = () => {
    const fData = [...jData];
    if (Object.keys(selectedNum).length !== 0) {
      return fData.filter((data) => data.key === selectedNum.key);
    }
    return fData;
  };

  //button click
  const btnClick = (btnt) => {
    setOrderState(btnt);
    toggleNested();
  };

  //change상태 변경
  const updateChangeState = () => {
    ApiService.updateCStatus(selectedNum.key, selOrderState[0], selOrderState[1])
      .then((res) => {
        initLoading();
      })
      .catch((err) => console.log(err));
  };

  //뱃지색깔
  const badgeColor = (status) => {
    switch (status) {
      case '결제대기중':
        return 'rgba(129,224,224,0.88)';
      case '결제완료':
        return '#99D4F1';
      case '배송중':
        return '#58B570';
      case '배송완료':
        return '#C3FB8E';
      case '구매확정':
        return '#cbffcd';
      default:
        return '#B39F9C';
    }
  };
  //뱃지색깔2
  const badgeColor2 = (status) => {
    switch (status) {
      case '교환':
        return orderBtn[0][0];
      case '반품':
        return orderBtn[0][1];
      case '대기':
        return orderBtn[1][0];
      case '신청':
        return orderBtn[1][1];
      case '승인':
        return orderBtn[1][2];
      default:
        return '#B39F9C';
    }
  };

  //검색조건
  const [sCondition, setCondition] = useState({});
  const handleSubmit = (e, condition) => {
    setCondition(condition);

    e.preventDefault();
  };

  //반품교환 버튼
  const retBtn = () => {

    if (Object.keys(selectedNum).length === 0) {
      return;
    }
    const btns = [];

    let backColor = '';
    if (selectedNum.c_type === '반품') {
      backColor = orderBtn[0][1];
      for (let j = 0; j < orderState[1].length; j++) {
        btns.push([orderState[0][0], orderState[1][j]]);
      }
    } else if (selectedNum.c_type === '교환') {
      backColor = orderBtn[0][0];
      for (let j = 0; j < orderState[1].length; j++) {
        btns.push([orderState[0][1], orderState[1][j]]);
      }
    }

    return btns.map((btnt, index) => {
      return <Button
        style={{ backgroundColor: backColor }}
        onClick={() => btnClick(btnt)}
        disabled={Object.keys(selectedNum).length !== 0 && btnt[0] + btnt[1] === selectedNum.c_type.concat(selectedNum.c_state)}
        key={index}
      >
        {btnt}
      </Button>;
    });
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
                    jData={jData}
                    badgeColor={badgeColor2}
                    sCondition={sCondition}
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
                  {retBtn()}
                </ButtonGroup>
                <ReturnComponent
                  jData={filterData()}
                  badgeColor={badgeColor2}
                  isModal={true}
                />
              </div>

              <div>
                <p>주문상태</p>
                <OrderListComponent
                  orderListData={filterData()}
                  badgeColor={badgeColor}
                />
              </div>
              {/*반품 상태 변경 모달*/}
              <Modal isOpen={nestedModal} fade={false} toggle={toggleNested}>
                <ModalHeader>반품상태변경</ModalHeader>
                <ModalBody>
                  <strong>{Object.keys(selectedNum).length !== 0 ? selectedNum.c_type.concat(selectedNum.c_state) : null}</strong>{' '}
                  <i className="fas fa-arrow-right"></i>{' '}
                  <strong>{selOrderState}</strong>
                  (으)로 변경합니다.
                </ModalBody>
                <ModalFooter className="mt-0 pt-0">
                  <Button
                    color="warning"
                    onClick={() => {
                      toggleNested();
                      updateChangeState();
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
