import React, { useState } from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import Editor from '../utils/ReactPill';

export default function RegisterForm() {
  const [startTimeVal, setStart] = useState('00:00');
  const [endTimeVal, setEnd] = useState('23:59');
  return (
    <Form>
      <FormGroup row>
        <Label for="startDate" sm={2}>
          이벤트 시작일
        </Label>
        <Col sm={5}>
          <Input
            type="date"
            name="date"
            id="startDate"
            placeholder="date placeholder"
          />
        </Col>
        <Col sm={5}>
          <Input
            type="time"
            name="time"
            id="startTime"
            placeholder="date placeholder"
            value={startTimeVal}
            onChange={({ target: { value } }) => setStart(value)}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="endDate" sm={2}>
          이벤트 종료일
        </Label>
        <Col sm={5}>
          <Input
            type="date"
            name="date"
            id="endDate"
            placeholder="date placeholder"
          />
        </Col>
        <Col sm={5}>
          <Input
            type="time"
            name="time"
            id="endTime"
            placeholder="date placeholder"
            value={endTimeVal}
            onChange={({ target: { value } }) => setEnd(value)}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="eventTitle" sm={2}>
          글 제목
        </Label>
        <Col sm={10}>
          <Input
            type="text"
            name="text"
            id="eventTitle"
            style={{ fontWeight: 'bold', color: 'black' }}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="eventContent" sm={2}>
          글 내용
        </Label>
        <Col sm={10}>
          {/* <Input type="textarea" name="text" id="eventContent" /> */}
          <Editor />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="image1" sm={2}>
          이미지1(썸네일)
        </Label>
        <Col sm={10}>
          <FormText color="muted">
            리스트에 보여지는 이미지입니다. 권장사이즈 588x174
          </FormText>
          <Input type="file" name="file" id="image2" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="image2" sm={2}>
          이미지2(본문)
        </Label>
        <Col sm={4}>
          <FormText color="muted">본문에 삽입할 이미지입니다.</FormText>
          <Input type="file" name="file" id="image2" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleFile" sm={2}>
          첨부 쿠폰
        </Label>
        <Col sm={4}>
          <FormText color="muted">이벤트에서 배포할 쿠폰입니다.</FormText>
          <span>첨부쿠폰 없음</span>
        </Col>
      </FormGroup>
    </Form>
  );
}
