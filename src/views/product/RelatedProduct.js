import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Button,
  CardFooter,
  CardTitle,
  CardText,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import CustomTable2 from '../../layouts/CustomTable2';
import '../../assets/css/relatedPro.css';
import ApiService from '../../apiService/ApiService';
import ModalForR from '../../layouts/ModalForR';

const tableSubject = [
  '상품번호',
  '상품이름',
  '연관상품1',
  '연관상품2',
  '연관상품3',
  '연관상품4',
  '연관상품5',
];
const styled = ['15.0%', '25.0%', '12.0%', '12.0%', '12.0%', '12.0%', '12.0%'];

export default function RelatedProduct() {
  //상품 데이터
  const [productData, setProduct] = useState([]);
  //모달
  const [openModal, setModal] = useState(false);

  //토글모달
  const handleToggle = () => setModal(!openModal);

  useEffect(() => {
    loadingData();
  }, []);

  //데이터 로딩
  const loadingData = () => {
    ApiService.fetchRelatedProduct()
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  const subject = tableSubject.map((subj, index) => (
    <th style={{ width: styled[index] }} scope="row" key={index}>
      {subj}
    </th>
  ));

  const contents = productData.map((cons) => {
    const elements = [
      cons.rec_pro_num1,
      cons.rec_pro_num2,
      cons.rec_pro_num3,
      cons.rec_pro_num4,
      cons.rec_pro_num4,
    ];
    return (
      <tr key={cons.pro_num}>
        <th>{cons.pro_num}</th>
        <th>{cons.product_name}</th>
        {elements.map((elel, index) => (
          <td key={index}>
            {elel}
            <Button outline color="warning" size="sm" onClick={handleToggle}>
              <i className="far fa-edit"></i>
            </Button>
          </td>
        ))}
      </tr>
    );
  });
  return (
    <div className="bodyWrap">
      <Container className="themed-container" fluid={true}>
        <Row md={12}>
          <Col>
            <Card>
              <CardHeader>
                <strong>연관 상품 등록</strong>
              </CardHeader>
              <CardBody>
                <CustomTable2 tableSubject={subject} contents={contents} />
              </CardBody>
              <ModalForR isOpen={openModal} toggle={handleToggle} />
              <CardFooter>Footer</CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
