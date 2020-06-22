import { Button, Col, CustomInput, Form, FormGroup, Input, Label } from 'reactstrap';
import React, {Component} from 'react';

export default class OrderSearchComponent extends Component {
  render(){
    return <Form>
      <FormGroup row>
        <Label htmlFor="keyword" sm={2}>검색어</Label>
        <Col sm={2}>
          <Input type="select" name="keywordSelect" defaultValue={0}>
            <option value={0} disabled>--검색항목선택--</option>
            <option value={1}>주문번호</option>
            <option value={2}>주문자아이디</option>
            <option value={3}>주문자명</option>
            <option value={4}>주문내역번호</option>
          </Input>
        </Col>
        <Col sm={4}>
          <Input type="text" name="keyword" id="keyword"/>
        </Col>

      </FormGroup>

      <FormGroup row>
        <Label htmlFor="keyword" sm={2}>기간</Label>
        <Col sm={3} md={6} lg={3}>
          <div className="btn-group flex-wrap" data-toggle="buttons">
            <Button>오늘</Button>
            <Button>어제</Button>
            <Button>7일</Button>
            <Button>15일</Button>
            <Button>1개월</Button>
          </div>
        </Col>
        <Col sm={3} md={2}>
          <Input
            type="date"
            name="date"
          />
        </Col>
        {` _`}
        <Col sm={3} md={2}>
          <Input
            type="date"
            name="date"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="product" sm={2}>상품명</Label>
        <Col sm={2}>
          <Input type="select" name="productSelect" defaultValue={0}>
            <option value={0}>상품명</option>
            <option value={1}>상품코드</option>
          </Input>
        </Col>
        <Col sm={4}>
          <Input type="text" name="product" id="product"/>
        </Col>
        <Col sm={2}>
          <Button>상품찾기 ▶</Button>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="pState" sm={2}>주문상태</Label>
        <Col sm={10}>
          <FormGroup check inline>
            <CustomInput className="pr-3" type="checkbox" id="Checkbox" label="전체"/>
            <CustomInput className="pr-3" type="checkbox" id="Checkbox2" label="결제대기중"/>
            <CustomInput className="pr-3" type="checkbox" id="Checkbox3" label="결제완료"/>
            <CustomInput className="pr-3" type="checkbox" id="Checkbox4" label="배송중"/>
            <CustomInput className="pr-3" type="checkbox" id="Checkbox5" label="배송완료"/>
            <CustomInput className="pr-3" type="checkbox" id="Checkbox6" label="취소신청"/>
            <CustomInput className="pr-3" type="checkbox" id="Checkbox7" label="취소대기"/>
            <CustomInput className="pr-3" type="checkbox" id="Checkbox8" label="취소승인"/>
          </FormGroup>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="pState" sm={2}>회원구분</Label>
        <Col sm={8}>
          <FormGroup check inline>
            <CustomInput className="pr-3" type="radio" name="MRadio" id="Radio1" label="전체"/>
            <CustomInput className="pr-3" type="radio" name="MRadio" id="Radio2" label="회원"/>
            <CustomInput className="pr-3" type="radio" name="MRadio" id="Radio3" label="비회원"/>

          </FormGroup>
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col sm={{ size: 12, offset: 5 }}>
          <Button color="primary">검색</Button>
          <Button outline color="primary">초기화</Button>
        </Col>
      </FormGroup>
    </Form>

  }
}