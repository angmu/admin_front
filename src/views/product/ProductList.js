import React, { useState, useEffect, useContext } from 'react';
import Header from 'components/Headers/Header.js';
import Board from '../../layouts/Board';
import ApiService from '../../apiService/ApiService';
import { BoardContext } from '../../components/contexts/BoardProvider';
import { trackPromise } from 'react-promise-tracker';

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

  const { setTitle, setSubject, setFormContent, data, tg } = useContext(
    BoardContext,
  );

  useEffect(() => {
    lodingData();
    setTitle('새상품 등록');
    setSubject('상품 등록/수정');
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

  //데이터 저장
  const postData = () => {
    const valid = [
      'amount',
      'back_image',
      'capacity',
      'front_image1',
      'front_image2',
      'front_image3',
      'manufacturer',
      'nutrient',
      'packing',
      'product_kcal',
      'product_name',
      'product_price',
      'product_state',
      'shelf_life',
      'supply_price',
    ];
    const lackList = [];
    valid.forEach((tes) => {
      if (!data[tes]) {
        lackList.push(tes);
      }
    });

    if (lackList.length !== 0) {
      alert('입력되지 않은 항목: ' + lackList.join(' , '));
      return;
    }

    const excludeReg = /^((?!image).)*$/;
    const formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      if (excludeReg.test(key)) {
        formData.append(key, value);
      }
    }

    if (!data.sales_price) {
      formData.append('sales_price', data.product_price);
    }

    formData.append('files', data.back_image);
    formData.append('files', data.front_image1[0]);
    formData.append('files', data.front_image2[0]);
    formData.append('files', data.front_image3[0]);

    trackPromise(
      ApiService.addProduct(formData)
        .then((res) => {
          lodingData();
          tg();
        })
        .catch((err) => {
          console.log('상품등록 실패', err);
          alert('상품 등록 에러');
        }),
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
        <td>
          <img src={cons.front_image1} alt="상품이미지"></img>
        </td>
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
        postData={postData}
      />
    </div>
  );
}
