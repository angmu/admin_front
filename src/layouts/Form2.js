import React, { useState, useContext } from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CardImg,
  Row,
} from 'reactstrap';
import ProductComponent from '../components/Product/ProductComponent';

export default function Form2(props) {
  //form 내용들
  const [data, storeData] = useState({});
  const { setupData } = useContext(props.context);

  const handleChange = (e) => {
    storeData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Form onSubmit={(e) => props.handleSubmit(e, data)} id="nm-board">
      <div className="form-group">
        <ProductComponent {...props} />
      </div>
    </Form>
  );
}
