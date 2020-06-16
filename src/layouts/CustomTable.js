import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
} from 'reactstrap';
import React, { useState, useContext, useEffect } from 'react';
import ModalForV from './ModalForV';

//상품테이블
export default function CustomTable(props) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  //delete modal
  const [dModal, setDModal] = useState(false);
  const toggleModal2 = () => setDModal(!dModal);
  const { wideToggle2 } = useContext(props.context);

  //selectedcode
  const [selectedCode, selectCode] = useState('');

  useEffect(() => {
    wideToggle2(setDModal);
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
                toggleModal();
              }}
            >
              편집
            </DropdownItem>
            <DropdownItem
              style={{ cursor: 'pointer' }}
              onClick={() => {
                selectCode(con.props.children[0].props.children);
                toggleModal();
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
      {/* 상세정보 모달 */}
      <ModalForV
        className={'modal-dialog modal-xl'}
        isOpen={modal}
        toggle={toggleModal}
        selectedCode={selectedCode}
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
