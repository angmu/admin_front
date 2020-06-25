import {
  Card,
  CardBody,
  ButtonGroup,
  Button,
  CardFooter,
  CardHeader,
  Container,
  Col,
  Row,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Table,
} from 'reactstrap';
import React, { Fragment, useState, useEffect } from 'react';
import ApiService from '../../apiService/ApiService';


//배너 아이템들
const banners = [{
  src: 'https://res.cloudinary.com/dbtw8youc/image/upload/v1593066262/main_visible01_aourpk.jpg',
  altText: 'Slide 1',
  caption: 'Banner1',
},
  {
    src: 'https://res.cloudinary.com/dbtw8youc/image/upload/v1593069922/main_visible02_sdald5.jpg',
    altText: 'Slide 2',
    caption: 'Banner2',
  },
  {
    src: 'https://res.cloudinary.com/dbtw8youc/image/upload/v1593069925/main_visible03_pfgcze.jpg',
    altText: 'Slide 3',
    caption: 'Banner3',
  },
];

export default function Banner() {

  const [bData, setBData] = useState('');

  useEffect(()=>{
    ApiService.fetchBannerList()
      .then((res)=> setBData(res.data)
      )
      .catch(err=>console.log(err));
  },[]);

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {

    const nextIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {

    const nextIndex = activeIndex === 0 ? banners.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    setActiveIndex(newIndex);
  };


  const slides = banners.map((item) => {
    return (
      <CarouselItem
        className="custom-tag"
        key={item.src}
        slide={false}
      >
        <img src={item.src} alt={item.altText}/>
        <CarouselCaption captionText={item.caption}/>
      </CarouselItem>
    );
  });


  return (
    <Fragment>
      <style>
        {
          `.custom-tag {
              max-width: 100%;
              height: 500px;
              background: white;
            }`
        }
      </style>
      <Container className="themed-container pt-7" fluid={true}>
        <Card>
          <CardHeader>
            <strong>배너등록</strong>
          </CardHeader>
          <CardBody>
            <div>
              <Row>
                <Col sm={12}>
                  <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                    slide={false}
                  >
                    {/*<CarouselIndicators items={banners} activeIndex={activeIndex} onClickHandler={goToIndex}/>*/}
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous}/>
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next}/>
                  </Carousel>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Table bordered>
                    <thead>
                    <tr>
                      <th style={{ background: '#F4F4F4' }} colSpan={4}>BANNER INFO</th>
                    </tr>
                    <tr>
                      <th>배너번호</th>
                      <th>배너제목</th>
                      <th>배너링크</th>
                      <th>노출순서</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>

                    </tr>
                    <tr>
                      <th scope="row" colSpan={4}>
                        <div style={{
                          textAlign: 'center',
                          background: 'green',
                          color: 'white',
                          fontSize: '1.2em',
                          cursor: 'pointer',
                        }}>배너 추가
                        </div>
                      </th>
                    </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </CardBody>
          <CardFooter/>
        </Card>
      </Container>
    </Fragment>
  );
}
