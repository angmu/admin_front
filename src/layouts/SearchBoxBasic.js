import React, { useState } from 'react';
import { Col } from 'reactstrap';

export default function SearchBoxBasic({ searching, ph }) {
  const [opts, setOpts] = useState({
    keyword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOpts({
      ...opts,
      [name]: value,
    });
  };

  return (
    <div className="d-flex flex-row justify-content-end bd-highlight mx-5">
      <Col lg={3} md={3}>
        <div className="d-flex align-items-stretch"></div>
      </Col>
      <Col lg={4} md={3}></Col>
      <Col lg={4} md={4}>
        <div className="d-flex align-items-stretch">
          <input
            type="text"
            name="keyword"
            className="form-control form-control-sm "
            id="exampleFormControlInput1"
            placeholder={ph ? ph : '검색어 입력..'}
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
