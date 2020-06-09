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

export default function RegisterForm2({ cateData1, cateData2 }) {
  const handleChange = (e) => {};

  return (
    <div>
      <hr></hr>
      <div>
        <FormGroup row>
          <Label for="productCost" sm={2}>
            상품가격
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
          <Label for="productCost" sm={2}>
            현재 판매가
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
          <Label for="amount" sm={2}>
            상품수량
          </Label>
          <Col sm={5}>
            <InputGroup>
              <Input
                defaultValue="0"
                min={0}
                max={999}
                type="number"
                step="1"
              />
              <InputGroupAddon addonType="append">개</InputGroupAddon>
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="productState" sm={2}>
            상품상태
          </Label>
          <Col sm={5}>
            <Input type="select" name="productState" id="productState">
              <option>판매중</option>
              <option>품절</option>
            </Input>
          </Col>
        </FormGroup>
      </div>
    </div>
  );
}
