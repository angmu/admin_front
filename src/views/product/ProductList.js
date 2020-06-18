import React, { useState, useEffect, useContext } from 'react';
import Header from 'components/Headers/Header.js';
import Board from '../../layouts/Board';
import ApiService from '../../apiService/ApiService';
import { BoardContext } from '../../components/contexts/BoardProvider';
import { trackPromise } from 'react-promise-tracker';
import Search from '../../components/Product/ProductSearch';
import Pagination from '../../components/Product/ProductPagination';
import { paginate } from '../../components/utils/Paginate';
import { dateConverter } from '../../components/utils/DateConverter';

const tableSubject = [
  '상품번호',
  '상품이미지',
  '상품이름',
  '수량',
  '공급상태',
  '상품가',
  '현재판매가',
  '등록일/최종수정일',
];
const styled = ['', '', '', '', '', '', ''];

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

  const {
    setTitle,
    setSubject,
    setFormContent,
    data,
    sendData,
    tg,
    tg2,
    tg3,
    checkOpt,
  } = useContext(BoardContext);

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
  const postData = (fD, mode) => {
    let pData = Object.assign({}, data);
    const isNotAdd = Array.isArray(fD);
    //에딧 모드일경우
    if (isNotAdd && mode === 'r') {
      //만약 front이미지를 새로 등록했을 경우
      if (pData.newImgSrc) {
        for (let [key, value] of Object.entries(pData.newImgSrc)) {
          pData[`new${key}`] = value;
        }
      }
    }

    //copy or update
    if (isNotAdd) {
      //입력 안된부분은 기존 정보로 덮어쓰기
      let editData = Object.assign({}, Object.assign({}, fD[0], fD[1]));
      editData = Object.assign({}, editData, pData);
      delete editData.registration_date;
      delete editData.update_date;

      pData = editData;
      console.log(pData);
    }

    //유효성 검사
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
      if (pData[tes] === undefined || pData[tes] === null) {
        lackList.push(tes);
      }
    });

    //수정모드일 경우 예외항목
    if (mode === 'r' && lackList.length > 0) {
      for (let i = 1; i <= 3; i++) {
        const index = lackList.indexOf(`front_image${i}`);
        if (index > -1) {
          if (pData.newImgSrc && pData.newImgSrc[`front_image${i}`]) {
            lackList.splice(index, 1);
          }
        }
      }
      const index = lackList.indexOf('back_image');
      if (index > -1) {
        if (pData.newBackImg) {
          lackList.splice(index, 1);
        }
      }
    }

    if (lackList.length !== 0) {
      alert('입력되지 않은 항목: ' + lackList.join(' , '));
      return;
    }

    const formData = new FormData();
    //수정모드가 아닐 경우(삽입모드, 복사모드)
    if (mode !== 'r') {
      const excludeReg = /^((?!image).)*$/;
      for (let [key, value] of Object.entries(pData)) {
        if (excludeReg.test(key)) {
          formData.append(key, value);
        } else {
          if (typeof value === 'string') {
            formData.append(key, value);
          }
          //만약 이미지가 경로라면 다시 폼에 집어넣는다(이미지 수정no)
        }
      }
      if (!pData.sales_price) {
        formData.append('sales_price', pData.product_price);
      }

      formData.append('file1', pData.back_image);
      formData.append('file2', pData.front_image1);
      formData.append('file3', pData.front_image2);
      formData.append('file4', pData.front_image3);
    } else {
      //수정 모드일때
      for (let [key, value] of Object.entries(pData)) {
        formData.append(key, value);
      }
    }

    console.log(pData);

    //수정모드일때
    if (mode === 'r') {
      trackPromise(
        ApiService.updateProduct(formData)
          .then((res) => {
            lodingData();
            tg3();
            sendData(null);
          })
          .catch((err) => {
            console.log('상품수정 실패', err);
            alert('상품 수정 에러' + err.response.data);
          }),
      );
    } else {
      trackPromise(
        ApiService.addProduct(formData)
          .then((res) => {
            lodingData();
            if (mode === 'c') tg3();
            else tg();
            sendData(null);
          })
          .catch((err) => {
            console.log('상품등록 실패', err);
            alert('상품 등록 에러' + err.response.data);
          }),
      );
    }
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
    //원본 데이터
    let filteredData = [...productData];
    //체크 필터1
    if (checkOpt.opt1 === false) {
      filteredData = filteredData.filter((data) => {
        return data.product_state !== '판매중';
      });
    }
    //체크필터2
    if (checkOpt.opt2 === false) {
      filteredData = filteredData.filter((data) => {
        return data.product_state !== '품절';
      });
    }

    //검색 필터
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
          {cons.product_state === '품절' ? (
            <td style={{ color: 'red' }}>{cons.product_state}</td>
          ) : (
            <td>{cons.product_state}</td>
          )}
          <td>{cons.product_price}</td>
          {cons.product_price > cons.sales_price ? (
            <td style={{ color: 'blue' }}> {cons.sales_price}</td>
          ) : (
            <td style={{ fontSize: '0.7em' }}> {cons.sales_price}</td>
          )}
          <td style={{ fontSize: '0.7em' }}>
            {dateConverter(cons.registration_date)}
            <br></br>
            {dateConverter(cons.update_date)}
          </td>
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
