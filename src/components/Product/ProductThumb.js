import React, { useState } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Container,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
} from 'reactstrap';
import '../../assets/css/product.css';

export default function ProductThumb() {
  const [imgSrc, setSrc] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  const handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setSrc(file);
      setPrevUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const clickHandler = (e) => {
    console.log('파일 업로드');
  };

  return (
    <Card style={{}}>
      <CardBody style={{ width: 'fit-content' }}>
        <Row>
          <Col>
            {prevUrl === '' ? (
              <img
                src="/updefault.png"
                alt="..."
                className="img-thumbnail"
              ></img>
            ) : (
              <img src={prevUrl} alt="..." className="img-thumbnail"></img>
            )}
          </Col>
        </Row>
        <Row className="mt-2 ml-1 thumbBox">
          <Col>
            {prevUrl === '' ? (
              <label style={{ display: 'contents' }}>
                <img
                  src="/upup.png"
                  alt="..."
                  className="img-thumbnail"
                  style={{
                    width: '30%',
                    cursor: 'pointer',
                    marginRight: '0.2em',
                  }}
                  onClick={clickHandler}
                ></img>
                <input
                  type="file"
                  id="upload"
                  style={{ display: 'none' }}
                  onChange={handleFileOnChange}
                ></input>
              </label>
            ) : (
              <img
                src={prevUrl}
                alt="..."
                className="img-thumbnail"
                style={{
                  width: '30%',
                  cursor: 'pointer',
                  marginRight: '0.2em',
                }}
                onClick={clickHandler}
              ></img>
            )}
          </Col>
        </Row>
        <Row>
          <span
            className="ml-3 mt-3"
            style={{ color: 'gray', fontSize: '0.8em' }}
          >
            3개의 썸네일 이미지를 등록해야 합니다.
          </span>
        </Row>
      </CardBody>
    </Card>
  );
}
