import React, { useState, useEffect, useContext } from 'react';
import Header from 'components/Headers/Header.js';
import Board from '../../layouts/Board';
import ApiService from '../../apiService/ApiService';
import { BoardContext } from '../../components/contexts/BoardProvider';
import { trackPromise } from 'react-promise-tracker';
import Search from '../../components/Product/ProductSearch';
import Pagination from '../../components/Product/ProductPagination';
import { paginate } from '../../components/utils/Paginate';

const tableSubject = [
  '상품번호',
  '상품이미지',
  '상품이름',
  '수량',
  '공급상태',
  '상품가',
  '현재판매가',
];
const styled = ['10.0%', '18.0%', '20.0%', '6.0%', '6.0%', '4.0%', '4.0%'];

export default function ProductList() {
  //상품데이터
  const [productData, setProduct] = useState([]);
  //카테고리 1 데이터
  const [cateData1, setCate1] = useState([]);
  //카테고리 2 데이터
  const [cateData2, setCate2] = useState([]);
  //serial Number 매칭테이블
  const [serialNumber, setSerial] = useState([]);
  //search options
  const [searchOpt, setSearchOpt] = useState({
    keyword: '',
    opt1: 0,
    opt2: 0,
  });
  //현재 페이지
  const [curPage, setCurPage] = useState(1);
  //한 페이지에 몇개 보여줄 건지..
  const pageSize = 8;
  // 검색결과 카운트
  let resultCnt = 0;

  const { setTitle, setSubject, setFormContent, data, tg, tg2 } = useContext(
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
      .then(
        ApiService.fetchSerialNumber().then((res) => {
          setSerial(res.data);
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
    formData.append('files', data.front_image1);
    formData.append('files', data.front_image2);
    formData.append('files', data.front_image3);

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

  //상품 데이터 삭제
  const deleteData = (data) => {
    ApiService.deleteProduct(data)
      .then((res) => {
        alert(`${data} 상품이 삭제되었습니다.`);
        lodingData();
        tg2();
      })
      .catch((err) => {
        alert('삭제 실패' + err.response.data);
      });
  };

  const subject = tableSubject.map((subj, index) => (
    <th style={{ width: styled[index] }} scope="row" key={index}>
      {subj}
    </th>
  ));

  const contents = () => {
    //검색 필터
    let filteredData = [...productData];
    const { keyword, opt1, opt2 } = searchOpt;

    //검색어가 있을 경우
    if (keyword !== '') {
      filteredData = filteredData.filter((data) => {
        return data.product_name.indexOf(keyword) > -1;
      });
    }

    //검색1 카테고리가 있을 경우
    if (opt1 && opt1 != 0) {
      const opt1Filter = serialNumber
        .filter((data) => data.cate_code_d1 === opt1)
        .map((data) => data.pro_num);

      filteredData = filteredData.filter(
        (data) => opt1Filter.indexOf(data.pro_num) >= 0,
      );
    }

    //검색2 카테고리가 있을 경우
    if (opt2 && opt2 != 0) {
      const opt2Filter = serialNumber
        .filter((data) => data.cate_code_d2 === opt2)
        .map((data) => data.pro_num);

      filteredData = filteredData.filter(
        (data) => opt2Filter.indexOf(data.pro_num) >= 0,
      );
    }
    resultCnt = filteredData.length;

    //페이지나누기
    filteredData = paginate(filteredData, curPage, pageSize);

    return filteredData.map((cons) => {
      return (
        <>
          <td>{cons.pro_num}</td>
          <td>
            <img
              src={cons.front_image1}
              style={{ width: '100px' }}
              alt="상품이미지"
            ></img>
          </td>
          <td>{cons.product_name}</td>
          <td>{cons.amount}</td>
          <td>{cons.product_state}</td>
          <td>{cons.product_price}</td>
          {cons.product_price > cons.sales_price ? (
            <td style={{ color: 'blue' }}> {cons.sales_price}</td>
          ) : (
            <td> {cons.sales_price}</td>
          )}
        </>
      );
    });
  };

  //search
  const searching = (opts) => {
    setSearchOpt(opts);
  };

  //page변경 핸들러
  const handleChangePage = (page) => {
    setCurPage(page);
  };

  //제품 하나에 대한 정보
  const oneInfo = (code) => {
    return [
      ...productData.filter((data) => data.pro_num === code),
      ...serialNumber.filter((data) => data.pro_num === code),
    ];
  };

  return (
    <div>
      <Header />
      <Board
        tableSubject={subject}
        context={BoardContext}
        contents={contents()}
        cateData1={cateData1}
        cateData2={cateData2}
        postData={postData}
        deleteData={deleteData}
        searchBox={Search(cateData1, cateData2, searching)}
        pagination={Pagination(pageSize, resultCnt, curPage, handleChangePage)}
        oneInfo={oneInfo}
      />
    </div>
  );
}
