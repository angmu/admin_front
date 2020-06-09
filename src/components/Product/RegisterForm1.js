import React, { useState, useEffect } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Container,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';

export default function RegisterForm1({ cateData1, cateData2 }) {
  const [selectedOpt, cateSelect] = useState('03');

  useEffect(() => {}, []);

  //category1에 해당하는 category2
  const cate2 = (c1Id) => {
    return cateData2.filter((c2) => c2.cate_code_d1 === c1Id);
  };

  const handleChange = (e) => {
    cateSelect(e.target.value);
  };

  return (
    <div>
      <hr></hr>
      <div>
        <FormGroup row>
          <Label for="categorySelect" sm={2}>
            카테고리
          </Label>
          <Col sm={5}>
            <Input
              type="select"
              name="select"
              id="categorySelect"
              value={selectedOpt}
              onChange={handleChange}
              style={{ color: 'blue' }}
            >
              {cateData1.map((c1) => {
                return (
                  <option
                    value={c1.cate_code_d1}
                    style={{ color: 'blue' }}
                    key={c1.cate_code_d1}
                  >
                    {c1.cate_code_d1}: {c1.cate_name_d1}
                  </option>
                );
              })}
            </Input>
          </Col>
          <Col sm={5}>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              style={{ color: 'black' }}
            >
              {cate2(selectedOpt).map((c2) => {
                return (
                  <option value={c2.cate_code_d2} key={c2.cate_code_d2}>
                    {c2.cate_code_d2} : {c2.cate_name_d2}
                  </option>
                );
              })}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="productName" sm={2}>
            상품이름
          </Label>
          <Col sm={10}>
            <Input type="text" name="name" id="productName" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="productCost" sm={2}>
            원가
          </Label>
          <Col sm={5}>
            <InputGroup>
              <Input placeholder="0" />
              <InputGroupAddon addonType="append">
                <InputGroupText>원</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="manufacture" sm={2}>
            제조사명
          </Label>
          <Col sm={5}>
            <Input
              type="text"
              name="manufacture"
              id="manufacture"
              defaultValue="쟈뎅"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="nutrient" sm={2}>
            영양성분
          </Label>
          <Col sm={10}>
            <Input type="text" name="nutrient" id="nutrient" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="calorie" sm={2}>
            칼로리
          </Label>
          <Col sm={5}>
            <InputGroup>
              <Input type="text" name="calorie" id="calorie" placeholder="0" />
              <InputGroupAddon addonType="append">
                <InputGroupText>kcal</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="shelfLife" sm={2}>
            유통기한
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="shelfLife"
              id="shelfLife"
              placeholder="예) 제조일로부터 12개월"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="packaging" sm={2}>
            포장재질
          </Label>
          <Col sm={10}>
            <Input type="text" name="packaging" id="packaging" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="capacity" sm={2}>
            내용량
          </Label>
          <Col sm={10}>
            <Input type="text" name="capacity" id="capacity" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="explainImg" sm={2}>
            상세이미지
          </Label>
          <Col sm={10}>
            <Input type="file" name="explainImg" id="explainImg" />
          </Col>
        </FormGroup>
      </div>
    </div>
  );
}
