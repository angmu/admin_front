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

export default function ModalForR({ isOpen, toggle }) {
  const [otherProduct, setOther] = useState([]);

  const [selectedProduct, setProduct] = useState({});
  const [nestedModal, setNestModal] = useState(false);
  //토글모달
  const handleToggle = () => setNestModal(!nestedModal);

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
  };

  const contents = otherProduct.map((cons) => {
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

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      backdrop={'static'}
      fade={false}
      className="modal-dialog modal-xl"
    >
      <ModalHeader toggle={toggle}>
        <strong>연관 상품 등록</strong>
      </ModalHeader>
      <ModalBody>
        <CustomTable2 tableSubject={subject} contents={contents} />
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
                      style={{ width: '200px', height: '200px' }}
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
