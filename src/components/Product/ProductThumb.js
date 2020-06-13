import React, { useState, useContext, useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
import { Card, CardBody, Row, Col } from 'reactstrap';
import '../../assets/css/product.css';
import Jimp from 'jimp';

//썸네일 3개
const thumbName = ['front_image1', 'front_image2', 'front_image3'];

export default function ProductThumb(props) {
  //저장한 이미지파일
  const [imgSrc, setSrc] = useState([]);

  //미리보기 경로
  const [prevUrl, setPrevUrl] = useState([]);

  //선택된 이미지 파일
  const [selectedImg, selectImg] = useState('');

  //useContenxt
  const { data, sendData } = useContext(props.context);

  //useEffect
  useEffect(() => {
    sendData({
      ...data,
      ...imgSrc,
    });
  }, [sendData, imgSrc]);

  //파일 업로드 시 미리보기
  const handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    let fileStore = '';

    if (!file) {
      return;
    }
    const naming = event.target.name;
    Resizer.imageFileResizer(
      file,
      348,
      348,
      'PNG',
      100,
      0,
      (blob) => {
        fileStore = blob;
        reader.onload = (function (theFile, naming) {
          return function (e) {
            setSrc({
              ...imgSrc,
              [naming]: [theFile],
            });
            setPrevUrl({
              ...prevUrl,
              [naming]: reader.result,
            });
            selectImg([naming]);
          };
        })(fileStore, naming);
        reader.readAsDataURL(fileStore);
      },
      'blob',
    );
  };

  const clickHandler = (e, name) => {
    selectImg(name);
  };

  return (
    <Card style={{}}>
      <CardBody style={{ width: 'fit-content' }}>
        <Row>
          <Col>
            {prevUrl[selectedImg] === undefined ? (
              <img
                src="/updefault.png"
                alt="..."
                className="img-thumbnail"
              ></img>
            ) : (
              <img
                src={prevUrl[selectedImg]}
                alt="..."
                className="img-thumbnail"
              ></img>
            )}
          </Col>
        </Row>
        <Row className="mt-2 ml-1 thumbBox">
          {thumbName.map((name) => {
            if (prevUrl[name] === undefined) {
              return (
                <label style={{ display: 'contents' }} key={name}>
                  <img
                    src="/upup.png"
                    alt="..."
                    className="img-thumbnail"
                    style={{
                      width: '30%',
                      cursor: 'pointer',
                      marginRight: '0.2em',
                    }}
                  ></img>
                  <input
                    type="file"
                    name={name}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileOnChange(e)}
                  ></input>
                </label>
              );
            } else {
              return (
                <img
                  key={name}
                  src={prevUrl[name]}
                  alt="..."
                  className="img-thumbnail"
                  style={{
                    width: '30%',
                    cursor: 'pointer',
                    marginRight: '0.2em',
                  }}
                  onClick={(e) => clickHandler(e, name)}
                ></img>
              );
            }
          })}
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
