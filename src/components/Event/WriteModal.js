import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from 'reactstrap';
import RegisterForm from './RegisterForm';

const WriteModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };

  return (
    <div>
      <Button color="success" onClick={toggle} style={{ float: 'right' }}>
        {buttonLabel}
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        backdrop={{ backdrop: 'static' }}
        keyboard={false}
      >
        <ModalHeader toggle={toggle}>이벤트 등록</ModalHeader>
        <ModalBody>
          <RegisterForm />
        </ModalBody>{' '}
        <Button
          color="primary"
          onClick={toggleNested}
          style={{ margin: '0 auto', width: '90%' }}
        >
          첨부할 쿠폰 선택
        </Button>
        <Modal isOpen={nestedModal} toggle={toggleNested}>
          <ModalHeader>Nested Modal title</ModalHeader>
          <ModalBody>Stuff and things</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleNested}>
              Done
            </Button>{' '}
          </ModalFooter>
        </Modal>{' '}
        <ModalFooter>
          <Button color="success" onClick={toggle}>
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
