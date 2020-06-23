import React, { useState, useEffect } from 'react';
import ApiService from '../../apiService/ApiService';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from 'reactstrap';
import CustomTable2 from '../../layouts/CustomTable2';
//페이지네이션
import Pagination from '../../layouts/Pagination';
import { paginate } from '../utils/Paginate';
//검색박스
import SearchBoxBasic from '../../layouts/SearchBoxBasic';

const tableSubject = ['상품번호', '상품이름', '상품이미지'];

export default function ModalForR({ isOpen, toggle, proSearch }) {
  const [otherProduct, setOther] = useState([]);

  //페이지네이션
  //현재 페이지
  const [curPage, setCurPage] = useState(1);
  //한 페이지에 몇개 보여줄 건지..
  const pageSize = 5;
  // 검색결과 카운트
  let resultCnt = 0;

  //search options
  const [searchOpt, setSearchOpt] = useState({
    keyword: '',
  });
  //page변경 핸들러
  const handleChangePage = (page) => {
    setCurPage(page);
  };

  //search
  const searching = (opts) => {
    setSearchOpt(opts);
    setCurPage(1);
  };

  //다른 상품 데이터 갖고오기
  useEffect(() => {
    loadingData();
  }, []);

  //데이터 로딩
  const loadingData = () => {
    ApiService.fetchProductList()
      .then((res) => {
        setOther(res.data);
      })
      .catch((err) => console.log(err));
  };

  const subject = tableSubject.map((subj, index) => (
    <th scope="row" key={index}>
      {subj}
    </th>
  ));

  // 아이템 클릭이벤트
  const rowClick = (code, name) => {
    proSearch(code, name);
    toggle();
  };

  const contents = () => {
    //필터링할 데이터
    let filteredData = [...otherProduct];
    //검색 필터
    const { keyword } = searchOpt;

    //검색어가 있을 경우
    if (keyword !== '') {
      filteredData = filteredData.filter((data) => {
        return data.product_name.indexOf(keyword) > -1;
      });
    }
    resultCnt = filteredData.length;

    return paginate(filteredData, curPage, pageSize).map((cons) => {
      return (
        <tr
          key={cons.pro_num}
          onClick={() => rowClick(cons.pro_num, cons.product_name)}
        >
          <th style={{ textAlign: 'center', cursor: 'pointer' }}>
            {cons.pro_num}
          </th>
          <td style={{ textAlign: 'center', cursor: 'pointer' }}>
            {cons.product_name}
          </td>
          <td style={{ textAlign: 'center', cursor: 'pointer' }}>
            <img
              src={cons.front_image1}
              alt="상품이미지"
              style={{ width: '100px', height: '100px' }}
            ></img>
          </td>
        </tr>
      );
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        toggle();
        setCurPage(1);
        setSearchOpt({
          keyword: '',
        });
      }}
      fade={false}
      className="modal-dialog modal-xl"
    >
      <ModalHeader
        toggle={() => {
          toggle();
          setCurPage(1);
          setSearchOpt({
            keyword: '',
          });
        }}
      ></ModalHeader>
      <SearchBoxBasic searching={searching} />
      <ModalBody>
        <CustomTable2 tableSubject={subject} contents={contents()} />
      </ModalBody>
      <ModalFooter>
        <Pagination
          itemsCount={resultCnt}
          pageSize={pageSize}
          currentPage={curPage}
          onPageChange={handleChangePage}
        />
      </ModalFooter>
    </Modal>
  );
}
