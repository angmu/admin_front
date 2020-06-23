import React, { Component } from 'react';
import { Button, Col, CustomInput, Form, FormGroup, Input, Label } from 'reactstrap';

export default class OrderSearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedBoxs: new Map(),
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //handleCheckbox
  handleCheckbox = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;


    if (item === 'checkboxAll' && isChecked) {
      for (let i = 0; i < 7; i++) {
        this.state.checkedBoxs.set(`checkbox${i + 2}`, true);
      }
    } else if (item === 'checkboxAll' && !isChecked) {
      for (let i = 0; i < 7; i++) {
        this.state.checkedBoxs.set(`checkbox${i + 2}`, false);
      }
    }

    this.setState(prevState => ({
      checkedBoxs: prevState.checkedBoxs.set(item, isChecked),
    }));
  };


  //click period
  clickPeriod = (period) => {
    this.setState({
      period,
    });
  };


  render() {
    return <Form>
      <FormGroup row>
        <Label htmlFor="keyword" sm={2}>검색어</Label>
        <Col sm={2}>
          <Input type="select" name="keywordSelect" defaultValue={0} onChange={this.handleChange}>
            <option value={0} disabled>--검색항목선택--</option>
            <option value={1}>주문번호</option>
            <option value={2}>주문자아이디</option>
            <option value={3}>주문자명</option>
            <option value={4}>주문내역번호</option>
          </Input>
        </Col>
        <Col sm={4}>
          <Input type="text" name="keyword" id="keyword" onChange={this.handleChange}/>
        </Col>

      </FormGroup>

      <FormGroup row>
        <Label htmlFor="keyword" sm={2}>기간</Label>
        <Col md={{ 'size': 'auto' }} sm={4}>
          <div className="btn-group flex-wrap" data-toggle="buttons">
            <Button onClick={() => this.clickPeriod(0)}>오늘</Button>
            <Button onClick={() => this.clickPeriod(-1)}>어제</Button>
            <Button onClick={() => this.clickPeriod(7)}>7일</Button>
            <Button onClick={() => this.clickPeriod(15)}>15일</Button>
            <Button onClick={() => this.clickPeriod(30)}>1개월</Button>
          </div>
        </Col>
        <Col sm={{ 'size': 'auto' }} md={{ 'size': 'auto' }}>
          <Input
            type="date"
            name="startDate"
            onChange={this.handleChange}
            defaultValue={new Date()}
          />
        </Col>
        <Col sm={{ 'size': 'auto' }} md={{ 'size': 'auto' }}>
          <Input
            type="date"
            name="endDate"
            onChange={this.handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="product" sm={2}>상품명</Label>
        <Col sm={2}>
          <Input type="select" name="productSelect" defaultValue={0} onChange={this.handleChange}>
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
          <FormGroup check inline onChange={this.handleCheckbox}>
            <CustomInput className="pr-3" type="checkbox" name="checkboxAll"
                         id="Checkbox" label="전체"/>
            <CustomInput className="pr-3" checked={!!this.state.checkedBoxs.get('checkbox2')} type="checkbox"
                         name="checkbox2"
                         id="Checkbox2" label="결제대기중"/>
            <CustomInput className="pr-3" checked={!!this.state.checkedBoxs.get('checkbox3')} type="checkbox"
                         name="checkbox3"
                         id="Checkbox3" label="결제완료"/>
            <CustomInput className="pr-3" checked={!!this.state.checkedBoxs.get('checkbox4')} type="checkbox"
                         name="checkbox4"
                         id="Checkbox4" label="배송중"/>
            <CustomInput className="pr-3" checked={!!this.state.checkedBoxs.get('checkbox5')} type="checkbox"
                         name="checkbox5"
                         id="Checkbox5" label="배송완료"/>
            <CustomInput className="pr-3" checked={!!this.state.checkedBoxs.get('checkbox6')} type="checkbox"
                         name="checkbox6"
                         id="Checkbox6" label="취소신청"/>
            <CustomInput className="pr-3" checked={!!this.state.checkedBoxs.get('checkbox7')} type="checkbox"
                         name="checkbox7"
                         id="Checkbox7" label="취소대기"/>
            <CustomInput className="pr-3" checked={!!this.state.checkedBoxs.get('checkbox8')} type="checkbox"
                         name="checkbox8"
                         id="Checkbox8" label="취소승인"/>
          </FormGroup>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="pState" sm={2}>회원구분</Label>
        <Col sm={8}>
          <FormGroup check inline onChange={this.handleChange}>
            <CustomInput className="pr-3" type="radio" name="MRadio" id="Radio1" value="all" label="전체"/>
            <CustomInput className="pr-3" type="radio" name="MRadio" id="Radio2" value="member" label="회원"/>
            <CustomInput className="pr-3" type="radio" name="MRadio" id="Radio3" value="nonMember" label="비회원"/>
          </FormGroup>
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col sm={{ size: 12, offset: 5 }}>
          <Button color="primary">검색</Button>
          <Button outline color="primary">초기화</Button>
        </Col>
      </FormGroup>
    </Form>;

  }
}