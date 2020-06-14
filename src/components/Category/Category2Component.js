import React from 'react';

import { Row, Col } from 'reactstrap';
import CustomTable2 from '../../layouts/CustomTable2';

//style
const tableStyle = {
  textAlign: 'center',
};

class Category2Component extends React.Component {
  state = {
    viewMode: 'view',
    rows: [{}],
  };

  makeTableSubject = () => {
    return (
      <>
        <th>카테고리코드</th>
        <th>카테고리명</th>
        {this.state.viewMode === 'edit' ? (
          <th style={{ width: '2.0%' }}></th>
        ) : null}
      </>
    );
  };

  //delete버튼 클릭이벤트
  deleteClick = (code2) => {
    this.props.deleteData(code2);
  };

  //입력값 저장
  insertClick = (code1, index) => {
    if (
      this.state.rows &&
      !(this.state.rows[index] && this.state.rows[index].cName)
    ) {
      alert('빈 입력값이 있습니다.');
      return;
    }
    const obj = {
      cate_code_d1: code1,
      cate_code_d2: this.state.rows[index].cCode,
      cate_name_d2: this.state.rows[index].cName,
    };
    this.props.sendData(JSON.stringify(obj));
    console.log('확정', code1);
  };

  //view 모드
  makeViewContents = () => {
    return this.props.data
      .filter((data) => data.cate_code_d1 === this.props.selectedRow)
      .map((data, index) => (
        <tr key={data.cate_code_d2}>
          <td style={tableStyle}>{data.cate_code_d2}</td>
          <td style={tableStyle}>{data.cate_name_d2}</td>
        </tr>
      ));
  };

  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      ...rows[idx],
      [name]: value,
    };
    this.setState({
      rows,
    });
  };

  //edit 모드
  makeEditContents = () => {
    const blocks = this.props.data
      .filter(
        (data) =>
          data.cate_code_d1 === this.props.selectedRow ||
          data.cate_code_d2 === '',
      )
      .map((data, index) => {
        if (!data.cate_code_d2) {
          return (
            <tr key={index}>
              <td style={tableStyle}>
                <input
                  type="text"
                  name="cCode"
                  onChange={this.handleChange(index)}
                ></input>
              </td>
              <td style={tableStyle}>
                <input
                  type="text"
                  name="cName"
                  onChange={this.handleChange(index)}
                ></input>
              </td>
              <td style={tableStyle}>
                <i
                  className="fas fa-check-circle"
                  style={{ color: 'green', cursor: 'pointer' }}
                  onClick={(e) => this.insertClick(data.cate_code_d1, index)}
                ></i>
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={data.cate_code_d2}>
              <td style={tableStyle}>{data.cate_code_d2}</td>
              <td style={tableStyle}>{data.cate_name_d2}</td>
              <td style={tableStyle}>
                <i
                  className="fas fa-minus-circle"
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={(e) => this.deleteClick(data.cate_code_d2)}
                ></i>
              </td>
            </tr>
          );
        }
      });

    blocks.push(
      <tr
        key={'plus'}
        style={{ cursor: 'pointer' }}
        onClick={this.props.addClick}
      >
        <td style={{ textAlign: 'center', background: '#a0d468' }} colSpan="2">
          <i className="fas fa-plus-square" style={{ color: 'green' }}></i>
        </td>
      </tr>,
    );

    return blocks;
  };

  //view 모드 바꿈
  viewToggle = () => {
    if (this.state.viewMode === 'view') {
      this.setState({ viewMode: 'edit' });
    } else {
      this.props.filterCode();
      this.setState({ viewMode: 'view' });
    }
  };

  render() {
    return (
      <>
        <Row>
          <div className="col">
            <div className="card-profile-stats d-flex justify-content-center mt-md-2">
              <CustomTable2
                tableSubject={this.makeTableSubject()}
                contents={
                  this.props.data ? (
                    this.state.viewMode === 'view' ? (
                      this.makeViewContents()
                    ) : (
                      this.makeEditContents()
                    )
                  ) : (
                    <tr></tr>
                  )
                }
              />
            </div>
          </div>
        </Row>
        <div className="text-center">
          <div className="h5 font-weight-300"></div>
          <div className="h5 mt-4"></div>
          <hr className="my-4" />
          <Row>
            <Col>
              <button
                type="button"
                className="btn btn-warning btn-sm btn-block"
                onClick={this.viewToggle}
              >
                {this.state.viewMode === 'view' ? '편집' : '뷰 모드로'}
              </button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Category2Component;
