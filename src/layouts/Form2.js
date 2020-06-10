import React, { useState, useContext } from 'react';
import { Form } from 'reactstrap';
import ProductComponent from '../components/Product/ProductComponent';

export default function Form2(props) {
  //useContenxt
  const { data, sendData } = useContext(props.context);

  const handleChange = (e) => {
    sendData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={(e) => props.handleSubmit(e, data)} id="nm-board">
      <div className="form-group">
        <ProductComponent {...props} handleChange={handleChange} />
      </div>
    </Form>
  );
}
