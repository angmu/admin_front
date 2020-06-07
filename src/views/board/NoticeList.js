import React, { useState, useEffect, useContext } from 'react';
import Header from 'components/Headers/Header.js';
import Board from '../../layouts/Board';
import ApiService from '../../apiService/ApiService';
import { dateConverter } from '../../components/utils/DateConverter';
import { BoardContext } from '../../components/contexts/BoardProvider';

const tableSubject = ['글번호', '제목', '등록일', '조회수'];
const styled = ['10.0%', '50.0%', '20.0%', '8.0%'];

export default function NoticeList() {
  const [noticeData, setNotice] = useState([]);

  const { setTitle, setSubject, setFormContent } = useContext(BoardContext);

  useEffect(() => {
    lodingData();
    setTitle('공지사항 등록');
    setSubject('공지사항 관리');
    setFormContent({
      first: '공지글 제목',
      second: '공지글 내용',
    });
  }, [setTitle, setSubject, setFormContent]);

  //데이터 로딩
  const lodingData = () => {
    ApiService.fetchNotices()
      .then((res) => {
        setNotice(res.data);
      })
      .catch((err) =>
        console.log('공지데이터를 갖고 오는 것에 실패했습니다!', err),
      );
  };

  //데이터 저장
  const postData = (data) => {
    console.log(data);
    const filteredData = {
      n_title: data.formInput1,
      n_content: data.editorHtml,
    };
    ApiService.addNotice(filteredData)
      .then((res) => {
        lodingData();
      })
      .catch((err) => console.log('공지데이터 저장 실패!', err));
  };

  const subject = tableSubject.map((subj, index) => (
    <th style={{ width: styled[index] }} scope="row" key={index}>
      {subj}
    </th>
  ));

  const contents = noticeData.map((cons) => {
    return (
      <>
        <td>{cons.n_num}</td>
        <td>{cons.n_title}</td>
        <td>{dateConverter(cons.n_regist)}</td>
        <td>{cons.n_hit}</td>
      </>
    );
  });

  return (
    <div>
      <Header />
      <Board
        tableSubject={subject}
        contents={contents}
        context={BoardContext}
        postData={postData}
      />
    </div>
  );
}
