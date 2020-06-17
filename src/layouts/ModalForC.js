import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form2 from './Form2';

//카피모드
export function ModalForC(props) {
  const { isOpen, toggle, oneInfo, selectedCode } = props;
  const { className } = props;

  const [filteredData, filterData] = useState('');

  useEffect(() => {
    filterData(oneInfo(selectedCode));
  }, [selectedCode]);

  const handleSubmit = (e, data) => {
    e.preventDefault();
    props.postData(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className={className}
      backdrop={'static'}
      keyboard={false}
    >
      <ModalHeader toggle={toggle}>상품복사</ModalHeader>
      <ModalBody>
        <Form2 {...props} handleSubmit={handleSubmit} fD={filteredData} />
      </ModalBody>
      <ModalFooter>
        <Button color="warning" type="submit" form="nm-board">
          COPY
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          취소
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalForC;
