import React, { useState, useContext } from 'react';
import { Form } from 'reactstrap';
import Editor from '../components/utils/ReactPill';

export default function Form1({ context, handleSubmit }) {
  //form 내용들
  const [data, storeData] = useState({});
  const { setupData } = useContext(context);
  const handleChange = (e) => {
    storeData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e, data)} id="nm-board">
      <div className="form-group">
        <label htmlFor="formInput1">{setupData.first}</label>
        <input
          type="text"
          className="form-control"
          id="formInput1"
          name="formInput1"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="formInput2">{setupData.second}</label>
        <Editor formVal={data} sendForm={storeData} />
      </div>
    </Form>
  );
}
