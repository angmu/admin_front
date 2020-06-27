import React, { Component, Fragment } from 'react';
import { dateConverter } from '../utils/DateConverter';
import ApiService from '../../apiService/ApiService';

export default class PaymentComponent extends Component {
  state = {
    payData: null,
  };

  componentDidMount() {
    this.getPaymentData();
  }

  //loding paymentData
  getPaymentData = () => {
    ApiService.fetchPaymentInfo(this.props.selectedNum.o_num)
      .then((res) => {
        this.setState({
          payData: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-primary">
          <thead className="thead-light">
            <tr>
              <th>주문번호</th>
              <th>결제수단</th>
              <th>결제일시</th>
              <th>결제금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {this.state.payData
                ? this.state.payData.map((data) => (
                    <Fragment key={data.o_num}>
                      <td>{data.o_num}</td>
                      <td>{data.o_way}</td>
                      <td>{dateConverter(data.o_date)}</td>
                      <td>
                        <strong>{`${data.o_sum.toLocaleString()}원`}</strong>
                      </td>
                    </Fragment>
                  ))
                : null}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
