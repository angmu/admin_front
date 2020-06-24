import React, { Component, Fragment, useState } from 'react';
import { dateConverter } from '../utils/DateConverter';
import ApiService from '../../apiService/ApiService';
//페이지네이션
import Pagination from '../../layouts/Pagination';
import { paginate } from '../utils/Paginate';
import { Badge } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';

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
    let fData = [...this.props.orderListData];
    const { currentPage, pageSize } = this.state;

    //컨텐츠 필터링(검색)
    const { sCondition, orderData, orderListData } = this.props;

    if (sCondition) {
      //1. 키워드가 있으면
      if (sCondition.keyword) {
        const ske = sCondition.keyword.trim();
        //1 -> 주문번호 2->주문자아이디 3->주문자명 4->주문내역번호
        switch (sCondition.keywordSelect) {
          case '1':
            fData = fData.filter(
              (d) => d.o_num.indexOf(ske) > -1,
            );
            break;
          case '2':
            fData = fData
              .map((d) =>
                !d.id
                  ? Object.assign(
                  {},
                  {
                    ...d,
                    id: '비회원',
                  },
                  )
                  : d,
              )
              .filter((d) => d.id.indexOf(ske) > -1);
            break;
          case '3':
            fData = fData.filter(
              (d) => d.o_name.indexOf(ske) > -1,
            );
            break;
          //주문내역번호
          case '4':
            //데이터 쪼인
            const joinData = orderListData.map(d => Object.assign(d, orderData.find(od => od.o_num === d.o_num)));
            const jData2 = joinData.filter(d => d.key.indexOf(ske) > -1);
            fData = _.filter(fData, function(od) {
              return jData2.some(jd => jd.o_num === od.o_num);
            });
            break;

          default:
            break;
        }
      }

      //2.기간이 있으면
      if (sCondition.startDate && sCondition.endDate) {
        fData = fData.filter(d => {
          const o_date = moment(d.o_date);
          return o_date.diff(sCondition.startDate, 'days') >= 0 && o_date.diff(sCondition.endDate, 'days') <= 0;
        });
      }

      //3.상품키워드가 있으면 (0 -> 상품명,  1->상품코드)
      if (sCondition.product) {
        const pke = sCondition.product.trim();
        const joinData = orderListData.map(d => Object.assign(d, orderData.find(od => od.o_num === d.o_num)));
        if (sCondition.productSelect == 0) {
          //데이터 쪼인
          const jData2 = joinData.filter(d => d.product_name.indexOf(pke) > -1);
          fData = _.filter(fData, function(od) {
            return jData2.some(jd => jd.o_num === od.o_num);
          });

        } else {
          const jData2 = joinData.filter(d => d.pro_num.indexOf(pke) > -1);
          fData = _.filter(fData, function(od) {
            return jData2.some(jd => jd.o_num === od.o_num);
          });
        }
      }


      //4.주문상태 checkBoxs Map에서 false인게 있으면 filter
      if (sCondition.checkedBoxs) {
        const checkDic = {
          'checkbox2': '결제대기중', 'checkbox3': '결제완료', 'checkbox4': '배송중',
          'checkbox5': '배송완료', 'checkbox6': '취소신청', 'checkbox7': '취소대기', 'checkbox8': '취소승인',
          'checkbox9': '구매확정',
        };
        const checkBoxs = [];
        const checkVals = [];

        sCondition.checkedBoxs.forEach((value, key) => {
          if (!value) checkBoxs.push(key);
        });

        checkBoxs.some(cb => {
          if (cb in checkDic) {
            checkVals.push(checkDic[cb]);
          }
        });
        fData = fData.filter(d => !_.includes(checkVals, d.o_status));

      }


      //5.회원구분 all / member /nonmember
      if (sCondition.mRadio === 'member') {
        fData = fData.filter((d) => d.id);
      } else if (sCondition.mRadio === 'nonMember') {
        fData = fData.filter((d) => !d.id);
      }
    }

    if (fData) this.resultCnt = fData.length;

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