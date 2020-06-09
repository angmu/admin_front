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

  useEffect(() => {
    cate1();
  }, []);

  //category1 데이터
  const cate1 = () => {
    console.log(cateData1);
  };

  //category1에 해당하는 category2
  const cate2 = (c1Id) => {
    console.log(c1Id);
  };

  const handleChange = (e) => {
    cateSelect(e.target.value);
  };

  return (
    <div>
      <hr></hr>
      <Form>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>
            카테고리
          </Label>
          <Col sm={5}>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              value={selectedOpt}
              onChange={handleChange}
            >
              {cateData1.map((c1) => {
                return (
                  <option value={c1.cate_code_d1}>
                    {c1.cate_code_d1}: {c1.cate_name_d1}
                  </option>
                );
              })}
            </Input>
          </Col>
          <Col sm={5}>
            <Input type="select" name="select" id="exampleSelect">
              {cate2(selectedOpt)}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            상품이름
          </Label>
          <Col sm={10}>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>
            원가
          </Label>
          <Col sm={10}>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>
            제조사명
          </Label>
          <Col sm={10}>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>
            영양성분
          </Label>
          <Col sm={10}>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>
            칼로리
          </Label>
          <Col sm={10}>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>
            유통기한
          </Label>
          <Col sm={10}>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>
            포장재질
          </Label>
          <Col sm={10}>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>
            내용량
          </Label>
          <Col sm={10}>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>
            상세이미지
          </Label>
          <Col sm={10}>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
            />
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}
