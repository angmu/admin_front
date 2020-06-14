import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import React from 'react';

export default function CustomTable(props) {
  const tableContents = props.contents.map((con, index) => (
    <tr key={index}>
      {con}
      <td className="text-right" style={{ width: '4.0%' }}>
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            href="#pablo"
            role="button"
            size="sm"
            color=""
            onClick={(e) => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem href="#">상세정보</DropdownItem>
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              편집
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
    </div>
  );
}
