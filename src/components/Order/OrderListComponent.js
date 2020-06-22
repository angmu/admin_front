import React, { Component } from 'react';
import { dateConverter } from '../utils/DateConverter';
import ApiService from '../../apiService/ApiService';

export default class OrderListComponent extends Component {

  state = {
    pdata: null,
  };

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
          <th>결제일</th>
        </tr>
        </thead>
        <tbody>
        {this.props.orderListData.map(data => <tr key={data.key}>
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
          <td>{data.o_status}</td>
          <td>{data.o_quant}</td>
          <td>{data.price}</td>
          <td>{dateConverter(data.o_date)}</td>
          <td>{data.o_update_date !== data.o_date ? dateConverter(data.o_date) : null}</td>

        </tr>)}


        </tbody>
      </table>
    </div>;
  }

}