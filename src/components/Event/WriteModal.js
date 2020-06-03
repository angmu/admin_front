import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const WriteModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle} style={{ float: 'right' }}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>이벤트 등록</ModalHeader>
        <ModalBody>ㅁㄴㅇㅁㄴㅇㅁ</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            등록
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default WriteModal;
