import React, { useState, useEffect, useContext } from 'react';
import { FormGroup, Col } from 'reactstrap';
import Cb from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import { BoardContext } from '../components/contexts/BoardProvider';

export default function Checkbox() {
  const [filterOpt, setFilter] = useState({
    opt1: true,
    opt2: true,
  });

  const onChange = (opt) => {
    setFilter({
      ...filterOpt,
      [opt]: !filterOpt[opt],
    });
  };

  const { checkOpt, checkToggle } = useContext(BoardContext);
  useEffect(() => {
    checkToggle({
      ...checkOpt,
      ...filterOpt,
    });
  }, [filterOpt]);

  return (
    <>
      <FormGroup row>
        <Col lg={6} sm={6}>
          <label>
            <Cb checked={filterOpt.opt1} onChange={() => onChange('opt1')} />
            <div className="ml-1" style={{ display: 'inline-block' }}>
              판매중
            </div>
          </label>
        </Col>
        <Col lg={6}>
          <label>
            <Cb checked={filterOpt.opt2} onChange={() => onChange('opt2')} />
            <div className="ml-1" style={{ display: 'inline-block' }}>
              품절
            </div>
          </label>
        </Col>
        <Col></Col>
      </FormGroup>
    </>
  );
}
