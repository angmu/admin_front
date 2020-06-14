import React, { useState } from 'react';
import { Col } from 'reactstrap';

export default function SearchBox({ options1, options2, defaultV, searching }) {
  const [opts, setOpts] = useState({
    keyword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOpts({
      ...opts,
      [name]: value,
    });
    if (name === 'opt1') {
      setOpts({
        ...opts,
        [name]: value,
        opt2: 0,
      });
    }
  };

  return (
    <div className="d-flex flex-row justify-content-end bd-highlight mx-5">
      <Col lg={3} md={3}>
        <div className="d-flex align-items-stretch">
          <select
            className="form-control form-control-sm"
            id="exampleFormControlSelect1"
            name="opt1"
            defaultValue={0}
            value={opts.opt1}
            onChange={handleChange}
          >
            <option value="0">{defaultV}</option>
            {options1.map((opt) => (
              <option key={opt.cate_code_d1} value={opt.cate_code_d1}>
                {opt.cate_code_d1} : {opt.cate_name_d1}
              </option>
            ))}
          </select>
        </div>
      </Col>
      <Col lg={4} md={3}>
        <select
          className="form-control form-control-sm"
          id="exampleFormControlSelect1"
          name="opt2"
          defaultValue={0}
          value={opts.opt2}
          onChange={handleChange}
        >
          <option value="0">{defaultV}</option>
          {options2
            .filter((opt) => opt.cate_code_d1 === opts.opt1)
            .map((opt) => (
              <option key={opt.cate_code_d2} value={opt.cate_code_d2}>
                {opt.cate_code_d2} : {opt.cate_name_d2}
              </option>
            ))}
        </select>
      </Col>
      <Col lg={4} md={4}>
        <div className="d-flex align-items-stretch">
          <input
            type="text"
            name="keyword"
            className="form-control form-control-sm "
            id="exampleFormControlInput1"
            placeholder="검색어 입력.."
            value={opts.keyword}
            onChange={handleChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                searching(opts);
              }
            }}
          ></input>
        </div>
      </Col>
      <Col lg={1} md={2}>
        <button
          type="button"
          className="btn btn-sm btn-info"
          onClick={() => searching(opts)}
        >
          SEARCH
        </button>
      </Col>
    </div>
  );
}
