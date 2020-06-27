import React, { useState } from 'react';
import {
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  FormGroup,
  Label,
} from 'reactstrap';

export default function RegisterForm2({ handleChange, fD }) {
  //판매가 상품가 동일하게
  const [productP, setPrice] = useState('');

  const handleCopy = (e) => {
    setPrice(e.target.value);
  };

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
              <Input
                placeholder="0"
                name="product_price"
                onChange={handleChange}
                onKeyUp={handleCopy}
                defaultValue={fD ? fD[0].product_price : ''}
              />
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
              <Input
                placeholder="0"
                name="sales_price"
                onChange={handleChange}
                defaultValue={fD ? fD[0].sales_price : productP}
              />
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
                placeholder="0"
                min={0}
                max={999}
                type="number"
                step="1"
                name="amount"
                onChange={handleChange}
                defaultValue={fD ? fD[0].amount : 999}
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
            <Input
              type="select"
              name="product_state"
              id="productState"
              onChange={handleChange}
              defaultValue={fD ? fD[0].product_state : 0}
            >
              <option disabled value="0">
                선택
              </option>
              <option value="판매중">판매중</option>
              <option value="품절">품절</option>
            </Input>
          </Col>
        </FormGroup>
      </div>
    </div>
  );
}
