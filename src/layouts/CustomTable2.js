import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import React from 'react';

export default function CustomTable2(props) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>{props.tableSubject}</tr>
        </thead>
        <tbody>{props.contents}</tbody>
      </table>
    </div>
  );
}
