import React, { useState, useEffect } from 'react';
import ApiService from '../apiService/ApiService';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from 'reactstrap';
import CustomTable2 from './CustomTable2';

const tableSubject = ['상품번호', '상품이름', '상품이미지'];
let filteredData = {};

export default function ModalForR({
  isOpen,
  toggle,
  selectedProduct,
  refresh,
}) {
  const [otherProduct, setOther] = useState([]);

  const [nestedModal, setNestModal] = useState(false);

  //already exist
  const [exist, setExist] = useState(false);

  //토글모달
  const handleToggle = () => {
    setNestModal(!nestedModal);
  };

  //다른 상품 데이터 갖고오기
  useEffect(() => {
    loadingData();
  }, []);

  //데이터 로딩
  const loadingData = () => {
    ApiService.fetchProductList()
      .then((res) => {
        setOther(res.data);
      })
      .catch((err) => console.log(err));
  };

  const subject = tableSubject.map((subj, index) => (
    <th scope="row" key={index}>
      {subj}
    </th>
  ));
  // 아이템 클릭이벤트
  const rowClick = (key) => {
    const filtered = otherProduct.filter((pro) => pro.pro_num === key);
    filteredData = filtered;
    handleToggle();
  };

  //확정 버튼
  const okClick = () => {
    console.log('ok');
    const sendData = JSON.stringify({
      index: selectedProduct.index + 1,
      targetId: selectedProduct.pro_num,
      additionId: filteredData[0].pro_num,
    });
    ApiService.addRelatedProduct(sendData)
      .then((res) => {
        console.log(res);
        handleToggle();
        toggle();
        refresh();
      })
      .catch((err) => console.log(err));
  };

  //삭제버튼
  const deleteClick = () => {
    const sendData = JSON.stringify({
      index: selectedProduct.index + 1,
      targetId: selectedProduct.pro_num,
    });
    ApiService.SetNUllRelatedProduct(sendData)
      .then((res) => {
        console.log(res);
        toggle();
        refresh();
      })
      .catch((err) => console.log(err));
  };

  const contents = otherProduct.map((cons) => {
    //만약 호출한 상품의 연관상품이 등록되어있을 때
    const aex = selectedProduct[`rec_pro_num${selectedProduct.index + 1}`];
    if (aex) {
      if (!exist) {
        setExist(true);
      }
      if (aex === cons.pro_num) {
        return (
          <tr key={cons.pro_num}>
            <th style={{ textAlign: 'center', cursor: 'pointer' }}>
              {cons.pro_num}
            </th>
            <td style={{ textAlign: 'center', cursor: 'pointer' }}>
              {cons.product_name}
            </td>
            <td style={{ textAlign: 'center', cursor: 'pointer' }}>
              <img
                src={cons.front_image1}
                alt="상품이미지"
                style={{ width: '100px', height: '100px' }}
              ></img>
            </td>
          </tr>
        );
      } else {
        return null;
      }
    }

    if (selectedProduct) {
      if (exist) {
        setExist(false);
      }
      if (
        selectedProduct.pro_num === cons.pro_num ||
        selectedProduct.rec_pro_num1 === cons.pro_num ||
        selectedProduct.rec_pro_num2 === cons.pro_num ||
        selectedProduct.rec_pro_num3 === cons.pro_num ||
        selectedProduct.rec_pro_num4 === cons.pro_num ||
        selectedProduct.rec_pro_num5 === cons.pro_num
      ) {
        return null;
      }
    }
    return (
      <tr key={cons.pro_num} onClick={() => rowClick(cons.pro_num)}>
        <th style={{ textAlign: 'center', cursor: 'pointer' }}>
          {cons.pro_num}
        </th>
        <td style={{ textAlign: 'center', cursor: 'pointer' }}>
          {cons.product_name}
        </td>
        <td style={{ textAlign: 'center', cursor: 'pointer' }}>
          <img
            src={cons.front_image1}
            alt="상품이미지"
            style={{ width: '100px', height: '100px' }}
          ></img>
        </td>
      </tr>
    );
  });

  //모달을 호출한 상품의 데이터 보여주기
  const ownerObj = (pro_num) => {
    const info = otherProduct.filter((pro) => pro.pro_num === pro_num);
    if (info[0] !== undefined) {
      return (
        <Row>
          <Col md={6} style={{ fontSize: '1.2em', color: '#f7703c' }}>
            {info[0].pro_num} <br></br>
            {info[0].product_name}
          </Col>
          <Col md={6}>
            <img
              src={info[0].front_image1}
              alt={info[0].product_name}
              style={{ width: '200px' }}
            ></img>
          </Col>
        </Row>
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      backdrop={'static'}
      fade={false}
      className="modal-dialog modal-xl"
    >
      <ModalHeader toggle={toggle}>
        <strong>연관 상품 {selectedProduct.index + 1} 등록</strong>
        {ownerObj(selectedProduct.pro_num)}
      </ModalHeader>
      <ModalBody>
        <CustomTable2 tableSubject={subject} contents={contents} />
        {exist ? (
          <span>
            연관 상품이 등록되어있습니다. 해당 연관상품을 삭제하시겠습니까?{' '}
            <Button color="warning" onClick={deleteClick}>
              삭제
            </Button>
          </span>
        ) : (
          ''
        )}
      </ModalBody>
      <ModalFooter>
        <Modal isOpen={nestedModal} toggle={handleToggle} fade={false}>
          <ModalHeader>
            <strong>연관 상품</strong>
          </ModalHeader>
          <ModalBody>
            {filteredData[0] ? (
              <div>
                <ModalHeader>
                  {filteredData[0].pro_num} 를 연관상품으로 등록하시겠습니까?
                  <hr></hr>
                </ModalHeader>
                <Row>
                  <Col style={{ textAlign: 'center' }}>
                    <img
                      src={filteredData[0].front_image1}
                      alt="상품이미지"
                      style={{ width: '200px' }}
                    ></img>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: 'center' }}>
                    <strong>{filteredData[0].product_name}</strong>
                  </Col>
                </Row>
              </div>
            ) : (
              ''
            )}
            <ModalFooter>
              <Button color="warning" onClick={okClick}>
                예
              </Button>{' '}
              <Button color="warning" onClick={handleToggle}>
                아니오
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </ModalFooter>
    </Modal>
  );
}
