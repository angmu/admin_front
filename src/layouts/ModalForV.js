import React, { useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form2 from './Form2';

export function ModalForV(props) {
  const { isOpen, toggle } = props;
  const { className } = props;
  const value = useContext(props.context);

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
      <ModalHeader toggle={toggle}>제품 상세정보</ModalHeader>
      <ModalBody>
        <Form2 {...props} handleSubmit={handleSubmit} />
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
