import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Badge,
  CardFooter,
  Button,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import CustomTable2 from '../../layouts/CustomTable2';
import ApiService from '../../apiService/ApiService';
import _ from 'lodash';

//페이지네이션
import Pagination from '../../layouts/Pagination';
import { paginate } from '../../components/utils/Paginate';
//검색박스
import SearchBoxBasic from '../../layouts/SearchBoxBasic';
import '../../assets/css/relatedPro.css';

const tableSubject = [
  '상품번호',
  '상품이미지',
  '상품이름',
  '추천',
  '인기',
  '신상품',
  '세일',
];
const eng = ['', '', '', 'HIT', 'HOT', 'NEW', 'SALE'];
const styled = ['20.0%', '10.0%', '', '10.0%', '10.0%', '10.0%', '10.0%'];
const highlight = [
  {},
  {},
  {},
  { color: 'blue', display: 'table' },
  { color: 'orange', display: 'table' },
  { color: 'green', display: 'table' },
  { color: 'red', display: 'table' },
];
export default function MainProduct() {
  //상품 데이터
  const [productData, setProduct] = useState([]);

  //메인상품데이터
  const [mProductData, setMProduct] = useState([]);

  //현재 페이지
  const [curPage, setCurPage] = useState(1);
  //한 페이지에 몇개 보여줄 건지..
  const pageSize = 8;
  // 검색결과 카운트
  let resultCnt = 0;

  //체크된 결과들
  const [checked, checking] = useState([]);

  //search options
  const [searchOpt, setSearchOpt] = useState({
    keyword: '',
  });

  //filter option
  const [filterOpt, setFilterOpt] = useState('');

  //page변경 핸들러
  const handleChangePage = (page) => {
    setCurPage(page);
  };

  //체크된 것 정렬
  const checkHandler = (condition) => {
    //만약 같은 필터를 두번 누르면 필터 해제
    if (condition === filterOpt) {
      setFilterOpt('');
    } else {
      setFilterOpt(condition);
    }
    setCurPage(1);
  };

  //search
  const searching = (opts) => {
    setSearchOpt(opts);
    setCurPage(1);
  };

  useEffect(() => {
    loadingData();
  }, []);

  //데이터 로딩
  const loadingData = () => {
    ApiService.fetchProductList()
      .then((res) => {
        setProduct(res.data);
      })
      .then(
        ApiService.fetchMainProduct().then((res) => {
          setMProduct(res.data);
          const counting = [0, 0, 0, 0];
          res.data.forEach((dd) => {
            if (dd.hit_p) counting[0]++;
            if (dd.hot_p) counting[1]++;
            if (dd.new_p) counting[2]++;
            if (dd.sale_p) counting[3]++;
          });
          console.log(counting);
          checking(counting);
        }),
      )
      .catch((err) => console.log(err));
  };

  //데이터 업데이트
  const updateData = (data) => {
    ApiService.updateMainProduct(data)
      .then((res) => {
        loadingData();
      })
      .catch((err) => console.log(err));
  };

  const subject = tableSubject.map((subj, index) => (
    <th style={{ width: styled[index] }} scope="row" key={index}>
      <Row>
        <h3>
          <Col>
            <Badge color="primary" style={highlight[index]}>
              {eng[index]}
            </Badge>
          </Col>

          {index > 2 ? (
            <i
              className="fas fa-filter fa-xs"
              style={{
                display: 'table',
                cursor: 'pointer',
                color: filterOpt === eng[index] ? 'red' : 'gray',
              }}
              onClick={() => checkHandler(eng[index])}
            ></i>
          ) : null}
        </h3>
        {subj}
      </Row>
    </th>
  ));

  //clickEvent
  const clickHandling = (num, idx, val) => {
    // console.log(num, idx, val);
    let mv;
    val ? (mv = 0) : (mv = 1);

    const data = {
      pro_num: num,
      idx: idx + 1,
      val: mv,
    };

    updateData(JSON.stringify(data));
  };

  const contents = () => {
    //필터링할 데이터
    let filteredData = [...productData];

    //검색 필터
    const { keyword } = searchOpt;

    //검색어가 있을 경우
    if (keyword !== '') {
      filteredData = productData.filter((data) => {
        return data.product_name.indexOf(keyword) > -1;
      });
    }
    // 메인 플래그 join
    filteredData = filteredData.map((obj) =>
      Object.assign(
        obj,
        mProductData.find((dd) => dd.pro_num === obj.pro_num),
      ),
    );
    //필터링값이 있으면
    if (filterOpt !== '') {
      //조건값으로 필터링
      const optData = filteredData.filter((data) => {
        return data[filterOpt.toLowerCase() + '_p'] === 1;
      });

      const proNums = new Set(optData.map((d) => d.pro_num));
      filteredData = [
        ...optData,
        ...filteredData.filter((d) => !proNums.has(d.pro_num)),
      ];
    }

    resultCnt = filteredData.length;

    return paginate(filteredData, curPage, pageSize).map((cons, idx) => {
      return (
        <tr key={cons.pro_num}>
          <th>{cons.pro_num}</th>
          <td>
            <img
              src={cons.front_image1}
              style={{ width: '70px' }}
              alt="${cons.pro_num"
            ></img>
          </td>
          <td>{cons.product_name}</td>
          <td
            style={{ textAlign: 'center', lineHeight: 5, cursor: 'pointer' }}
            onClick={() => clickHandling(cons.pro_num, 0, cons.hit_p)}
          >
            {cons.hit_p ? <i className="fas fa-check fa-2x"></i> : null}
          </td>
          <td
            style={{ textAlign: 'center', lineHeight: 5, cursor: 'pointer' }}
            onClick={() => clickHandling(cons.pro_num, 1, cons.hot_p)}
          >
            {cons.hot_p ? <i className="fas fa-check fa-2x"></i> : null}
          </td>
          <td
            style={{ textAlign: 'center', lineHeight: 5, cursor: 'pointer' }}
            onClick={() => clickHandling(cons.pro_num, 2, cons.new_p)}
          >
            {cons.new_p ? <i className="fas fa-check fa-2x"></i> : null}
          </td>
          <td
            style={{ textAlign: 'center', lineHeight: 5, cursor: 'pointer' }}
            onClick={() => clickHandling(cons.pro_num, 3, cons.sale_p)}
          >
            {cons.sale_p ? <i className="fas fa-check fa-2x"></i> : null}
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="bodyWrap">
      <Container className="themed-container" fluid={true}>
        <Row md={12}>
          <Col>
            <Card>
              <CardHeader>
                <strong>메인노출상품</strong>
                <h5>
                  추천상품: {checked[0]} 개 | 인기상품: {checked[1]} 개 |
                  신상품: {checked[2]} 개 | 세일상품: {checked[3]} 개
                </h5>
                <SearchBoxBasic searching={searching} />
              </CardHeader>
              <CardBody>
                <CustomTable2 tableSubject={subject} contents={contents()} />
              </CardBody>
              <CardFooter>
                <Pagination
                  itemsCount={resultCnt}
                  pageSize={pageSize}
                  currentPage={curPage}
                  onPageChange={handleChangePage}
                />
                <h5> * 연관상품은 최대 5개까지 등록가능</h5>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
