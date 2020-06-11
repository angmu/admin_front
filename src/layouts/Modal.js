import React, { useContext, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form1 from './Form1';
import Form2 from './Form2';

export function CustomModal(props) {
  const { isOpen, toggle } = props;
  const { className } = props;
  const value = useContext(props.context);
  const { wideToggle } = useContext(props.context);

  const handleSubmit = (e, data) => {
    e.preventDefault();
    props.postData(data);
    //props.controllModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className={className}
      backdrop={'static'}
      keyboard={false}
    >
      <ModalHeader toggle={toggle}>{value.title}</ModalHeader>
      <ModalBody>
        {props.flag === 1 ? (
          <Form1 {...props} handleSubmit={handleSubmit} />
        ) : (
          <Form2 {...props} handleSubmit={handleSubmit} />
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
