import React from 'react';
import { Badge } from 'reactstrap';
import { dateConverter } from '../utils/DateConverter';
import Pagination from '../../layouts/Pagination';
import { paginate } from '../utils/Paginate';

export default class OrderComponent extends React.Component {

  state = {
    currentPage: 1,
    pageSize: 10,
  };

  resultCnt = 0;

  //페이지 변경
  handleChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };


  //컨텐츠 내용
  getContent = () => {
    const fData = [...this.props.orderData];
    const { currentPage, pageSize } = this.state;

    this.resultCnt = fData.length;

    return paginate(fData, currentPage, pageSize).map(data =>
      <tr key={data.o_num}>
        <td><p style={{ textDecoration: 'underline', cursor: 'pointer' }}
               onClick={() => {
                 this.props.modalToggle();
                 this.props.selectNum(this.props.orderData.find(o => o.o_num === data.o_num));
               }}>{data.o_num}</p></td>
        <td>{data.id ? data.id : '비회원'}</td>
        <td>{data.o_name}</td>
        <td>{data.o_tel}</td>
        <td>{`${data.o_cost.toLocaleString()}원`}</td>
        <td><h2><Badge style={{ background: this.props.badgeColor(data.o_status), color:'black'}}>{data.o_status}</Badge></h2></td>
        <td>{`${data.o_point}p`}</td>
        <td>{dateConverter(data.o_date)}</td>
        <td>{data.o_update_date !== data.o_date ? dateConverter(data.o_update_date) : null}</td>
      </tr>,
    );
  };


  render() {
    return <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
        <tr>
          <th>주문번호</th>
          <th>주문자아이디</th>
          <th>주문자명</th>
          <th>전화번호</th>
          <th>주문금액</th>
          <th>주문상태</th>
          <th>사용포인트</th>
          <th>주문일</th>
          <th>확정일</th>
        </tr>
        </thead>
        <tbody>
        {this.getContent()}
        </tbody>
      </table>
      <div className="mt-2">
        <Pagination
          itemsCount={this.resultCnt}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handleChangePage}
        />
      </div>
    </div>;
  }
}