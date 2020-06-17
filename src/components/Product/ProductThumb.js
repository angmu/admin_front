import React, { useState, useContext, useEffect } from 'react';
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
  const [selectedImg, selectImg] = useState('front_image1');

  //edit mode
  const [editData, onEditData] = useState([]);

  //useContenxt
  const { data, sendData } = useContext(props.context);

  //useEffect
  useEffect(() => {
    if (props.fD && props.mode === 'c') {
      sendData({
        ...data,
        newImgSrc: imgSrc,
      });
    } else {
      sendData({
        ...data,
        ...imgSrc,
      });
    }
  }, [sendData, imgSrc, editData]);

  useEffect(() => {
    if (props.fD) {
      onEditData(Object.assign({}, props.fD[0], props.fD[1]));
    }
  }, []);

  //파일 업로드 시 미리보기
  const handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    if (!file) {
      return;
    }
    reader.readAsDataURL(file);

    const naming = event.target.name;

    reader.onload = (function (naming) {
      return function (e) {
        Jimp.read(reader.result, (err, image) => {
          if (err) throw err;
          else {
            image
              .resize(348, 348)
              .quality(100)
              .getBase64(Jimp.MIME_PNG, function (err, src) {
                setPrevUrl({
                  ...prevUrl,
                  [naming]: src,
                });
                selectImg([naming]);
              });
            image.getBufferAsync(Jimp.AUTO).then((newFile) => {
              setSrc({
                ...imgSrc,
                [naming]: new Blob([newFile]),
              });
            });
          }
        });
      };
    })(naming);
  };

  //add
  const clickHandler = (e, name) => {
    selectImg(name);
  };

  //delete
  const deleteHandler = (name) => {
    console.log(name + '삭제를 원함');
    setPrevUrl({
      ...prevUrl,
      [name]: null,
    });
    sendData({
      ...data,
      [name]: null,
    });
    if (editData) {
      onEditData({
        ...editData,
        [name]: null,
      });
      setSrc({
        ...imgSrc,
        [name]: null,
      });
    }
  };

  return (
    <Card style={{}}>
      <CardBody style={{ width: 'fit-content' }}>
        <Row>
          <Col>
            {!prevUrl[selectedImg] ? (
              <img
                src={
                  editData[selectedImg]
                    ? editData[selectedImg]
                    : '/updefault.png'
                }
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
        <Row className="mt-2 thumbBox">
          {thumbName.map((name, index) => {
            if (!prevUrl[name] && !editData[`front_image${[index + 1]}`]) {
              return (
                <Col stlye={{ padding: '0' }} key={name}>
                  <label style={{ display: 'contents' }}>
                    <img
                      src={'/upup.png'}
                      alt="..."
                      className="img-thumbnail"
                      style={{
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
                </Col>
              );
            } else {
              return (
                <Col stlye={{ padding: '0' }} key={name}>
                  <div style={{ position: 'relative' }}>
                    <i
                      style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        color: 'red',
                      }}
                      className="fas fa-times fa-lg"
                      onClick={() => deleteHandler(name)}
                    ></i>
                    <img
                      src={
                        editData[`front_image${[index + 1]}`]
                          ? editData[`front_image${[index + 1]}`]
                          : prevUrl[name]
                      }
                      alt="..."
                      className="img-thumbnail"
                      style={{
                        cursor: 'grab',
                        marginRight: '0.2em',
                      }}
                      onClick={(e) => clickHandler(e, name)}
                    ></img>
                  </div>
                </Col>
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
