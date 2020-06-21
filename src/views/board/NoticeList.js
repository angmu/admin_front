import React, { useState, useEffect, useContext } from 'react';
import UserHeader from 'components/Headers/UserHeader.js';
import Board from '../../layouts/Board';
import ApiService from '../../apiService/ApiService';
import { dateConverter } from '../../components/utils/DateConverter';
import { BoardContext } from '../../components/contexts/BoardProvider';
import Pagination from '../../components/Notice/NoticePagination';
import { paginate } from '../../components/utils/Paginate';

const tableSubject = ['글번호', '제목', '등록일', '조회수'];
const styled = ['10.0%', '50.0%', '20.0%', '8.0%'];

export default function NoticeList() {
  const [noticeData, setNotice] = useState([]);

  const { setTitle, setSubject, setFormContent, tg } = useContext(BoardContext);

  //현재 페이지
  const [curPage, setCurPage] = useState(1);
  //한 페이지에 몇개 보여줄 건지..
  const pageSize = 8;
  // 데이터 카운트
  const [resultCnt, setReslutCnt] = useState(0);

  useEffect(() => {
    lodingData();
    setTitle('공지사항 등록');
    setSubject('공지사항 관리');
    setFormContent({
      first: '공지글 제목',
      second: '공지글 내용',
    });
  }, [setTitle, setSubject, setFormContent]);

  //callback
  const controllModal = (func) => {};

  //데이터 로딩
  const lodingData = () => {
    ApiService.fetchNotices()
      .then((res) => {
        setNotice(res.data);
        setReslutCnt(res.data.length);
      })
      .catch((err) =>
        console.log('공지데이터를 갖고 오는 것에 실패했습니다!', err),
      );
  };

  //데이터 저장
  const postData = (data) => {
    const filteredData = {
      n_title: data.formInput1,
      n_content: data.editorHtml,
    };
    ApiService.addNotice(JSON.stringify(filteredData))
      .then((res) => {
        lodingData();
        tg();
      })
      .catch((err) => alert('공지데이터 저장 실패!' + err));
  };

  const subject = tableSubject.map((subj, index) => (
    <th style={{ width: styled[index] }} scope="row" key={index}>
      {subj}
    </th>
  ));

  const contents = paginate(noticeData, curPage, pageSize).map((cons) => {
    return (
      <>
        <td>{cons.n_num}</td>
        <td>{cons.n_title}</td>
        <td>{dateConverter(cons.n_regist)}</td>
        <td>{cons.n_hit}</td>
      </>
    );
  });

  //page변경 핸들러
  const handleChangePage = (page) => {
    setCurPage(page);
  };

  return (
    <div>
      <UserHeader />
      <Board
        tableSubject={subject}
        contents={contents}
        context={BoardContext}
        postData={postData}
        controllModal={controllModal}
        flag={1}
        pagination={Pagination(pageSize, resultCnt, curPage, handleChangePage)}
      />
    </div>
  );
}
