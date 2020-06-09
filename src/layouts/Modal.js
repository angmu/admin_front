import React, { useState, useContext } from 'react';
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
import Form1 from './Form1';
import Form2 from './Form2';

export function CustomModal(props) {
  const { isOpen, toggle } = props;
  const { className } = props;
  const value = useContext(props.context);

  const handleSubmit = (e, data) => {
    props.postData(data);
    props.controllModal();
    e.preventDefault();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>{value.title}</ModalHeader>
      <ModalBody>
        {props.flag === 1 ? (
          <Form1 {...props} handleSubmit={handleSubmit} />
        ) : (
          <Form2 {...props} />
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="success" type="submit" form="nm-board">
          등록
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          취소
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CustomModal;
