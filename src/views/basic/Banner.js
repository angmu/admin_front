import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Col,
  Row,
  Table,
} from 'reactstrap';
import React, { Fragment, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ApiService from '../../apiService/ApiService';
import '../../assets/css/banner.css';

export default function Banner() {
  const [bData, setBData] = useState([]);
  const [newData, setNData] = useState('');
  //toggle 배너추가
  const [toggleAdd, setToggle] = useState(false);
  // bannerSeq
  const [bannerSeq, setBannerSeq] = useState(0);
  //carousel name
  const [carouselName, setCarousel] = useState('');

  const toggle = () => setToggle(!toggleAdd);

  function pad(n, width) {
    n = n + '';
    return n.length >= width
      ? n
      : new Array(width - n.length + 1).join('0') + n;
  }

  const lodingSeq = () => {
    ApiService.fetchBannerSeq()
      .then((res) => {
        const numbering = Number(res.data.slice(-3)) + 1;
        setBannerSeq('banner' + pad(numbering, 3));
      })
      .catch((err) => console.log(err));
  };
  const lodingData = () => {
    ApiService.fetchBannerList()
      .then((res) => {
        setBData(res.data);
        setCarousel(res.data[0].banner_num);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    lodingData();
    lodingSeq();
  }, []);

  let clickHoldTimer = null;

  const handleMouseDown = (bannerNum) => {
    clickHoldTimer = setTimeout(() => {
      //Action to be performed after holding down mouse
      if (window.confirm(`${bannerNum} 배너 데이터를 삭제하시겠습니까?`)) {
        ApiService.deleteBanner(bannerNum)
          .then((res) => {
            lodingData();
            lodingSeq();
          })
          .catch((err) => console.log(err));
      }
    }, 500); //Change 1000 to number of milliseconds required for mouse hold
  };

  const handleMouseUp = () => {
    clearTimeout(clickHoldTimer);
  };

  const changeHandler = (e) => {
    if (e.target.name === 'fileImg') {
      setNData({
        ...newData,
        [e.target.name]: e.target.files[0],
      });
    } else
      setNData({
        ...newData,
        [e.target.name]: e.target.value,
      });
  };

  const tContent = bData.map((bd, index) => (
    <tr
      key={index}
      onMouseDown={() => handleMouseDown(bd.banner_num)}
      onMouseUp={handleMouseUp}
      style={{ cursor: 'pointer' }}
    >
      <td>{bd.banner_num}</td>
      <td>
        {bd.banner_title ? (
          bd.banner_title
        ) : (
          <input type="text" name="banner_title" onChange={changeHandler} />
        )}
      </td>
      <td>
        {bd.banner_link ? (
          bd.banner_link
        ) : (
          <input type="text" name="banner_link" onChange={changeHandler} />
        )}{' '}
      </td>
      <td onClick={() => exposureToggle(bd.banner_num)}>
        {bd.banner_exposure === '1' ? (
          <i style={{ color: 'blue' }} className="far fa-circle"></i>
        ) : (
          <i style={{ color: 'red' }} className="fas fa-times"></i>
        )}
      </td>
    </tr>
  ));

  //배너콘텐츠추가
  const addBannerRow = () => {
    const newB = [...bData];
    newB.push({ banner_num: bannerSeq, banner_exposure: '1' });
    setBData(newB);
    lodingSeq();
  };
  //배너로우 삭제
  const removeBannerRow = () => {
    const newB = [...bData];
    newB.pop();
    setBData(newB);
  };

  //saveRow
  const saveRow = () => {
    const obj = {
      ...bData[bData.length - 1],
      ...newData,
    };

    const formData = new FormData();

    if (
      !obj.fileImg ||
      !obj.banner_link ||
      !obj.banner_title ||
      !obj.banner_exposure
    ) {
      alert('모든항목을 입력하세요');
      setNData('');
      lodingData();
      lodingSeq();
      return;
    }

    formData.append('file', obj.fileImg);
    formData.append('banner_link', obj.banner_link);
    formData.append('banner_title', obj.banner_title);
    formData.append('banner_exposure', obj.banner_exposure);

    ApiService.addBanner(formData)
      .then(() => {
        setNData('');
        lodingData();
        lodingSeq();
      })
      .catch((err) => console.log(err));
  };

  //노출여부 변경
  const exposureToggle = (bannerNum) => {
    const newB = [...bData];
    const ft = newB.find((o) => o.banner_num === bannerNum);
    if (ft.banner_exposure === '0') {
      ft.banner_exposure = '1';
      ApiService.updateBanner(bannerNum, 1)
        .then()
        .catch((err) => console.log(err));
    } else {
      ft.banner_exposure = '0';
      ApiService.updateBanner(bannerNum, 0)
        .then()
        .catch((err) => console.log(err));
    }
    setBData(newB);
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Fragment>
      <Container className="themed-container pt-7" fluid={true}>
        <Card>
          <CardHeader>
            <strong>배너등록</strong>
          </CardHeader>
          <CardBody>
            <div>
              <Row>
                <Col>
                  <div>
                    <h2>{carouselName}</h2>
                    <Slider
                      {...settings}
                      afterChange={(index) =>
                        setCarousel(bData[index].banner_num)
                      }
                    >
                      {bData.map((bd) => (
                        <img
                          key={bd.banner_num}
                          src={bd.banner_image}
                          alt={bd.banner_title}
                        ></img>
                      ))}
                    </Slider>
                  </div>
                </Col>
              </Row>
              <hr></hr>
              <Row>
                <Col sm={12}>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th style={{ background: '#F4F4F4' }} colSpan={4}>
                          BANNER INFO
                        </th>
                      </tr>
                      <tr>
                        <th>배너번호</th>
                        <th>배너제목</th>
                        <th>배너링크</th>
                        <th>노출여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tContent}
                      <tr>
                        <th scope="row" colSpan={4}>
                          {!toggleAdd ? (
                            <div
                              style={{
                                textAlign: 'center',
                                background: 'green',
                                color: 'white',
                                fontSize: '1.2em',
                                cursor: 'pointer',
                                transition: 'all 1s',
                              }}
                              onClick={() => {
                                toggle();
                                addBannerRow();
                              }}
                            >
                              배너 추가
                            </div>
                          ) : (
                            <>
                              <div className="upload-btn-wrapper">
                                <button id="upBtn">배너 이미지 업로드</button>
                                <input
                                  type="file"
                                  name="fileImg"
                                  onChange={changeHandler}
                                ></input>
                                <span>
                                  {newData.fileImg
                                    ? newData.fileImg.name
                                    : null}
                                </span>
                              </div>
                              <div
                                style={{
                                  textAlign: 'center',
                                  background: '#1C14A7',
                                  color: 'white',
                                  fontSize: '1.2em',
                                  cursor: 'pointer',
                                  transition: 'all 0.8s',
                                  marginBottom: '3px',
                                }}
                                onClick={() => {
                                  toggle();
                                  saveRow();
                                }}
                              >
                                저장
                              </div>
                              <div
                                style={{
                                  textAlign: 'center',
                                  background: 'orange',
                                  color: 'white',
                                  fontSize: '1.2em',
                                  cursor: 'pointer',
                                  transition: 'all 0.8s',
                                }}
                                onClick={() => {
                                  toggle();
                                  removeBannerRow();
                                  setNData('');
                                }}
                              >
                                취소
                              </div>
                            </>
                          )}
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </CardBody>
          <CardFooter />
        </Card>
      </Container>
    </Fragment>
  );
}
