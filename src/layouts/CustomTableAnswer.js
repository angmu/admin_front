import React from 'react';

//질문/답변형 테이블
export default function CustomTableAnswer(props) {
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
