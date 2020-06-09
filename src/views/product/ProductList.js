import React, { useState, useEffect, useContext } from 'react';
import Header from 'components/Headers/Header.js';
import Board from '../../layouts/Board';
import ApiService from '../../apiService/ApiService';
import { dateConverter } from '../../components/utils/DateConverter';
import { BoardContext } from '../../components/contexts/BoardProvider';

const tableSubject = [
  '상품번호',
  '상품이미지',
  '상품이름',
  '수량',
  '공급상태',
  '현재판매가',
];
const styled = ['10.0%', '50.0%', '20.0%', '8.0%'];

export default function ProductList() {
  //상품데이터
  const [productData, setProduct] = useState([]);
  //카테고리 1 데이터
  const [cateData1, setCate1] = useState([]);
  //카테고리 2 데이터
  const [cateData2, setCate2] = useState([]);

  const { setTitle, setSubject, setFormContent } = useContext(BoardContext);

  useEffect(() => {
    lodingData();
    setTitle('새상품 등록');
    setSubject('상품 관리');
    setFormContent({
      first: '공지글 제목',
      second: '공지글 내용',
    });
  }, [setTitle, setSubject, setFormContent]);

  //데이터 로딩
  const lodingData = () => {
    ApiService.fetchProductList()
      .then((res) => {
        setProduct(res.data);
      })
      .then(
        ApiService.fetchProductCate1().then((res) => {
          setCate1(res.data);
        }),
      )
      .then(
        ApiService.fetchProductCate2().then((res) => {
          setCate2(res.data);
        }),
      )
      .catch((err) =>
        console.log('상품데이터를 갖고 오는 것에 실패했습니다!', err),
      );
  };

  const subject = tableSubject.map((subj, index) => (
    <th style={{ width: styled[index] }} scope="row" key={index}>
      {subj}
    </th>
  ));

  const contents = productData.map((cons) => {
    return (
      <>
        <td>{cons.pro_num}</td>
        <td>{cons.front_image1}</td>
        <td>{cons.product_name}</td>
        <td>{cons.amount}</td>
        <td>{cons.product_state}</td>
        <td>{cons.sales_price}</td>
      </>
    );
  });
  return (
    <div>
      <Header />
      <Board
        tableSubject={subject}
        context={BoardContext}
        contents={contents}
        cateData1={cateData1}
        cateData2={cateData2}
      />
    </div>
  );
}
