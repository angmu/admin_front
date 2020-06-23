import React, { Component, Fragment, useState } from 'react';
import { dateConverter } from '../utils/DateConverter';
import ApiService from '../../apiService/ApiService';
//페이지네이션
import Pagination from '../../layouts/Pagination';
import { paginate } from '../utils/Paginate';
import { Badge } from 'reactstrap';


export default class OrderListComponent extends Component {

  state = {
    pdata: null,
    currentPage: 1,
    pageSize: 10,
  };

  resultCnt= 0;

  componentDidMount() {
    this.loadingPData();
  }

  //상품정보 가져옴
  loadingPData = () => {
    ApiService.fetchOrderPList()
      .then(res => {
        this.setState({
          pdata: res.data,
        });
      })
      .catch(err => console.log(err));
  };

  //페이지 변경
  handleChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  //컨텐츠 내용
  getContent = () => {
    const fData = [...this.props.orderListData];
    const { currentPage, pageSize } = this.state;

    this.resultCnt = fData.length;

    return paginate(fData, currentPage, pageSize).map(data =>
      <tr key={data.key}>
        <td>{data.key}</td>
        <td>{data.pro_num}</td>
        <td>{this.state.pdata ?
          (
            <div>
              {this.state.pdata.find(o => o.pro_num === data.pro_num).product_name}
              <img src={this.state.pdata.find(o => o.pro_num === data.pro_num).front_image1}
                   style={{ width: '60px' }}/>
            </div>
          ) : null}
        </td>
        <td>{data.id ? data.id : '비회원'}</td>
        <td>{data.o_name}</td>
        <td><h2><Badge style={{ background: this.props.badgeColor(data.o_status), color:'black'}}>{data.o_status}</Badge></h2></td>
        <td>{data.o_quant}</td>
        <td>{`${parseInt(data.price).toLocaleString()}원`}</td>
        <td>{dateConverter(data.o_date)}</td>
        <td>{data.o_update_date !== data.o_date ? dateConverter(data.o_date) : null}</td>
      </tr>,
    );
  };

  render() {
    return <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
        <tr>
          <th>주문내역번호</th>
          <th>주문상품번호</th>
          <th>주문상품명</th>
          <th>주문자아이디</th>
          <th>주문자명</th>
          <th>주문상태</th>
          <th>구매수량</th>
          <th>구매금액</th>
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