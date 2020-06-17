import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
} from 'reactstrap';
import React, { useState, useContext, useEffect } from 'react';
import ModalForVC from './ModalForVC';

//상품테이블
export default function CustomTable(props) {
  //update & copy modal
  const [modal, setModal] = useState(false);
  //update or copy?
  const [mode, setMode] = useState('');

  const toggleModal = (mode) => {
    setModal(!modal);
    sendData(null);
    if (mode === 'r') {
      setMode('r');
    } else if (mode === 'c') {
      setMode('c');
    }
  };

  //delete odal
  const [dModal, setDModal] = useState(false);
  const toggleModal2 = () => setDModal(!dModal);

  const { wideToggle2, wideToggle3, sendData } = useContext(props.context);

  //selectedcode
  const [selectedCode, selectCode] = useState('');

  useEffect(() => {
    wideToggle2(setDModal);
    wideToggle3(setModal);
  }, []);

  const tableContents = props.contents.map((con, index) => (
    <tr key={index}>
      {con}
      <td className="text-right" style={{ width: '4.0%' }}>
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            href="#"
            role="button"
            size="sm"
            color=""
            onClick={(e) => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>

          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem
              style={{ cursor: 'pointer' }}
              onClick={() => {
                selectCode(con.props.children[0].props.children);
                toggleModal('r');
              }}
            >
              편집
            </DropdownItem>
            <DropdownItem
              style={{ cursor: 'pointer' }}
              onClick={() => {
                selectCode(con.props.children[0].props.children);
                toggleModal('c');
              }}
            >
              상품복사
            </DropdownItem>
            <DropdownItem
              style={{ cursor: 'pointer' }}
              onClick={() => {
                selectCode(con.props.children[0].props.children);
                toggleModal2();
              }}
            >
              삭제
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  ));

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-sm">
        <thead className="thead-light">
          <tr>
            {props.tableSubject}
            <th></th>
          </tr>
        </thead>
        <tbody>{tableContents}</tbody>
      </table>
      {/* 상세정보, 편집 모달 */}
      <ModalForVC
        className={'modal-dialog modal-xl'}
        isOpen={modal}
        toggle={toggleModal}
        selectedCode={selectedCode}
        title={mode === 'r' ? '제품 상세정보' : '상품복사'}
        btnText={mode === 'r' ? '저장' : 'COPY'}
        mode={mode}
        {...props}
      />

      {/* 삭제 모달 */}
      <Modal isOpen={dModal} toggle={toggleModal2} fade={false}>
        <div className="modal-header">
          <h5 className="modal-title">상품 삭제</h5>
        </div>
        <div className="modal-body">
          <p>{selectedCode}를 삭제하시겠습니까?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={toggleModal2}
          >
            닫기
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => props.deleteData(selectedCode)}
          >
            삭제
          </button>
        </div>
      </Modal>
    </div>
  );
}
