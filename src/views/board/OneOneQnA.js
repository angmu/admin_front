import React, { Fragment, useEffect, useState } from 'react';
import AnswerComponent from '../../components/Answer/AnswerComponent';
import ApiService from '../../apiService/ApiService';

export default function OneOneQnA() {
  const tableSubjects = [
    '질문번호',
    '질문분류',
    '작성자',
    '글제목',
    '작성일',
    '답변상태',
  ];

  const [types, setTypes] = useState([{ label: 'all', value: 'all' }]);

  //질문분류 가져오기
  useEffect(() => {
    fetchType().then((data) =>
      setTypes(
        data.map((type) => {
          return { value: type, label: type };
        }),
      ),
    );
  }, []);

  const tableDataQ = () => {
    return ApiService.fetchQuestion()
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  const tableDataA = () => {
    return ApiService.fetchAnswer()
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  //답변 작성
  const insertA = (data) => {
    return ApiService.addAnswer(data)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };

  //답변 업데이트
  const updateA = (data) => {
    return ApiService.updateAnwser(data)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };

  //답변 삭제
  const deleteA = (code) => {
    return ApiService.deleteAnswer(code)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };

  //분류 목록 가져오기
  const fetchType = () => {
    return ApiService.fetchQType()
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  const styled = ['10.0%', '12.0%', '15.0%', '33.0%', '20.0%', '10.0%'];
  const rowId = ['q_num', 'q_type', 'id', 'q_title', 'q_date'];

  return (
    <Fragment>
      <AnswerComponent
        subject="1:1문의 답변"
        tableSubjects={tableSubjects}
        tableDataQ={tableDataQ}
        tableDataA={tableDataA}
        insertA={insertA}
        updateA={updateA}
        deleteA={deleteA}
        tdStyle={styled}
        rowId={rowId}
        options={types}
        searchHolder="검색할 글 제목.."
      />
    </Fragment>
  );
}
