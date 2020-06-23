import React, { Component, Fragment } from 'react';
import ApiService from '../../apiService/ApiService';

export default class PayeeComponent extends Component {

  state = {
    payeeData: null,
  };

  componentDidMount() {
    this.getPayeeData();
  }


  //loding payeeData
  getPayeeData = () => {
    ApiService.fetchPayeeInfo(this.props.selectedNum.o_num)
      .then((res) => {
        this.setState({
          payeeData: res.data,
        });
      }).catch(err => console.log(err));

  };


  render() {
    return <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
        <tr>
          <th>수취자이름</th>
          <th>배송지주소</th>
          <th>수취자핸드폰번호</th>
          <th>수취자전화번호</th>
          <th>배송시요구사항</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          {this.state.payeeData ? this.state.payeeData.map(data =>
            <Fragment key={data.o_num}>
              <td>{data.p_name}</td>
              <td>{data.p_address}</td>
              <td>{data.p_phone}</td>
              <td>{data.p_tel}</td>
              <td>{data.p_demand}</td>
            </Fragment>,
          ) : null}
        </tr>
        </tbody>
      </table>
    </div>;
  }
}