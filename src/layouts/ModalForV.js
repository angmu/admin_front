import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form2 from './Form2';

export function ModalForV(props) {
  const { isOpen, toggle, oneInfo, selectedCode } = props;
  const { className } = props;

  const [filteredData, filterData] = useState('');

  useEffect(() => {
    filterData(oneInfo(selectedCode));
  }, [oneInfo, selectedCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //수정모드
    props.postData(filteredData, 'r');
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className={className}
      backdrop={'static'}
      keyboard={false}
    >
      <ModalHeader toggle={toggle}>제품 상세정보</ModalHeader>
      <ModalBody>
        <Form2 {...props} handleSubmit={handleSubmit} fD={filteredData} />
      </ModalBody>
      <ModalFooter>
        <Button color="warning" type="submit" form="nm-board">
          저장
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          취소
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalForV;
