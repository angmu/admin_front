import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Button,
  CardFooter,
} from 'reactstrap';
import React from 'react';
import UserHeader from '../../components/Headers/UserHeader';
import FAQComponent from '../../components/FAQ/FAQComponent';
const tableSubjects = ['글번호', '분류', '글제목', '작성일', '수정일'];
const styled = ['15.0%', '15.0%', '40.0%', '15.0%', '15.0%'];
const rowId = [
  'faq_num',
  'faq_type',
  'faq_title',
  'faq_written_date',
  'faq_modified_date',
];

export default function FAQ() {
  return (
    <FAQComponent
      subject="FAQ"
      tableSubjects={tableSubjects}
      tdStyle={styled}
      rowId={rowId}
    />
  );
}
