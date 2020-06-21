import React, { Fragment, useEffect } from 'react';
import ReviewComponent from '../../components/Answer/ReviewComponent';
import ApiService from '../../apiService/ApiService';

export default function ReivewA() {
  const tableSubjects = [
    '리뷰번호',
    '주문내역번호',
    '작성자',
    '글제목',
    '작성일',
    '답변상태',
  ];

  const tableDataR = () => {
    return ApiService.fetchReivew()
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  //답변 작성
  const patchA = (data) => {
    return ApiService.addReviewAnswer(data)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };

  //답변 삭제
  const removeA = (key) => {
    return ApiService.removeReviewAnswer(key)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };

  //상품정보가져오기
  const fetchRP = (key) => {
    return ApiService.fetchReviewProduct(key)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  const styled = ['10.0%', '12.0%', '12.0%', '33.0%', '20.0%', '10.0%'];
  const rowId = ['review_num', 'key', 'id', 'title', 'regist_review'];

  return (
    <Fragment>
      <ReviewComponent
        subject="리뷰 답변"
        tableSubjects={tableSubjects}
        tableDataR={tableDataR}
        patchA={patchA}
        removeA={removeA}
        fetchRP={fetchRP}
        tdStyle={styled}
        rowId={rowId}
        searchHolder="검색할 주문내역번호/ 글 제목"
      />
    </Fragment>
  );
}
