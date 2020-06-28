import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardText,
} from 'reactstrap';
import RegisterForm from './RegisterForm';
import CouponList from '../Coupon/CouponListComponent';
import ApiService from '../../apiService/ApiService';
import { RefreshConsumer } from '../contexts/EventContext';
import { trackPromise } from 'react-promise-tracker';
import Spinner from '../../components/utils/Spinner';

const WriteModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [couponVal, setCouponVal] = useState('');
  const [coupon, setCoupon] = useState(null); //쿠폰데이터

  const [formVal, sendForm] = useState({}); //폼데이터

  const toggle = () => {
    setModal(!modal);
    setCouponVal('');
    sendForm({
      thumbnailImg: '',
      thumbnailUrl: '',
      contextImg: '',
      contextImgUrl: '',
      startTime: '00:00',
      endTime: '23:59',
      startDate: '',
      endDate: '',
    });
  };
  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };

  const handleSubmit = (e, refe) => {
    e.preventDefault();
    const formData = new FormData();

    for (let [key, value] of Object.entries(formVal)) {
      if (key !== 'thumbnailUrl' && key !== 'contextImgUrl')
        formData.append(key, value);
    }

    if (coupon) formData.append('coupon', coupon.coupon_num);

    trackPromise(
      ApiService.addEvent(formData)
        .then((res) => {
          console.log('안녕');
          refe.state.value(1, 100);
          toggle();
        })
        .catch((err) => {
          console.log('에러', err);
        }),
    );
  };

  //쿠폰정보
  const collectInfo = (param) => {
    const noname = [
      { 쿠폰번호: param.coupon_num },
      { 쿠폰이름: param.coupon_name },
      { 할인금액: param.coupon_pay },
    ];

    setCouponVal(
      <Card
        body
        inverse
        style={{ backgroundColor: '#333', borderColor: '#333' }}
      >
        <CardBody>
          {noname.map((a, key) => {
            return (
              <div key={key}>
                <CardText style={{ color: 'white' }}>
                  {Object.keys(a)} : {a[Object.keys(a)]}
                </CardText>
              </div>
            );
          })}
        </CardBody>
      </Card>,
    );
    setCoupon(param);
  };

  return (
    <RefreshConsumer>
      {(func) => (
        <div>
          <Button color="success" onClick={toggle} style={{ float: 'right' }}>
            {buttonLabel}
          </Button>
          <Modal
            isOpen={modal}
            toggle={toggle}
            className={className}
            backdrop={'static'}
            keyboard={false}
          >
            <ModalHeader toggle={toggle}>이벤트 등록</ModalHeader>
            <ModalBody>
              <RegisterForm
                coupon={couponVal}
                sendForm={sendForm}
                formVal={formVal}
                handleSubmit={(e) => handleSubmit(e, func)}
              />
              <Spinner />
            </ModalBody>{' '}
            <Button
              color="primary"
              onClick={toggleNested}
              style={{ margin: '0 auto', width: '90%' }}
            >
              첨부할 쿠폰 선택
            </Button>
            <Modal
              isOpen={nestedModal}
              toggle={toggleNested}
              className={'modal-dialog modal-xl'}
            >
              <ModalHeader>쿠폰 선택</ModalHeader>
              <ModalBody>
                <CouponList collectInfo={collectInfo} toggle={toggleNested} />
              </ModalBody>
            </Modal>{' '}
            <ModalFooter>
              <Button color="success" type="submit" form="ev-form">
                등록
              </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                취소
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </RefreshConsumer>
  );
};

export default WriteModal;
