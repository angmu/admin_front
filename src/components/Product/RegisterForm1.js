import React, { useState, useEffect, useContext } from 'react';
import {
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  FormGroup,
  Label,
} from 'reactstrap';
import { SideBySideMagnifier } from 'react-image-magnifiers';
export default function RegisterForm1({
  cateData1,
  cateData2,
  context,
  handleChange,
  fD,
  mode,
}) {
  const [selectedOpt, cateSelect] = useState({
    cate_code_d1: '03',
    cate_code_d2: 'CF002',
  });
  //backImg manage
  const [bImg, sBImg] = useState();

  //flag
  const [uflag, sflag] = useState(0);
  //useContenxt
  const { data, sendData } = useContext(context);

  useEffect(() => {
    if (fD) {
      cateSelect({
        cate_code_d1: fD[1].cate_code_d1,
        cate_code_d2: fD[1].cate_code_d2,
      });
      sBImg(fD[0].back_image);
    } else {
      sendData({
        cate_code_d1: selectedOpt.cate_code_d1,
        cate_code_d2: selectedOpt.cate_code_d2,
        amount: '999',
      });
    }
    sflag(1);
  }, []);

  useEffect(() => {
    if (uflag === 1)
      sendData({
        ...data,
        ...selectedOpt,
      });
  }, [selectedOpt]);

  //category1에 해당하는 category2
  const cate2 = (c1Id) => {
    return cateData2.filter((c2) => c2.cate_code_d1 === c1Id);
  };

  //카테고리 선택이벤트
  const handleCate = (e) => {
    if (e.target.name === 'cate_code_d1') {
      const fdata = cateData2.filter(
        (c2) => c2.cate_code_d1 === e.target.value,
      );
      cateSelect({
        ...selectedOpt,
        [e.target.name]: e.target.value,
        cate_code_d2: fdata[0].cate_code_d2,
      });
    } else if (e.target.name === 'cate_code_d2') {
      cateSelect({
        ...selectedOpt,
        [e.target.name]: e.target.value,
      });
    }
  };

  //이미지 미리보기
  const previewImg = (file) => {
    if (!file) {
      sBImg(null);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      sBImg(reader.result);
    };
    // 실패할 경우 에러 출력하기
    reader.onerror = function (error) {
      console.log('Error');
    };
  };

  //상세 설명 파일(backfile) 선택이벤트
  const handleInfoImg = (e) => {
    if (fD && mode === 'r') {
      sBImg(null);
      sendData({
        ...data,
        newBackImg: e.target.files[0],
      });
      previewImg(e.target.files[0]);
    } else {
      sendData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
      previewImg(e.target.files[0]);
    }
  };

  return (
    <div>
      <hr></hr>
      <div>
        <FormGroup row>
          <Label for="categorySelect" sm={2}>
            카테고리
          </Label>
          <Col sm={5}>
            <Input
              type="select"
              name="cate_code_d1"
              id="categorySelect"
              value={selectedOpt.cate_code_d1}
              onChange={handleCate}
              style={{ color: 'blue' }}
            >
              {cateData1.map((c1) => {
                return (
                  <option
                    value={c1.cate_code_d1}
                    style={{ color: 'blue' }}
                    key={c1.cate_code_d1}
                  >
                    {c1.cate_code_d1}: {c1.cate_name_d1}
                  </option>
                );
              })}
            </Input>
          </Col>
          <Col sm={5}>
            <Input
              type="select"
              name="cate_code_d2"
              id="category2Select"
              style={{ color: 'black' }}
              value={selectedOpt.cate_code_d2}
              onChange={handleCate}
            >
              {cate2(selectedOpt.cate_code_d1).map((c2) => {
                return (
                  <option value={c2.cate_code_d2} key={c2.cate_code_d2}>
                    {c2.cate_code_d2} : {c2.cate_name_d2}
                  </option>
                );
              })}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="productName" sm={2}>
            상품이름
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="product_name"
              id="product_name"
              onChange={handleChange}
              defaultValue={fD ? fD[0].product_name : ''}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="supply_price" sm={2}>
            원가
          </Label>
          <Col sm={5}>
            <InputGroup>
              <Input
                placeholder="0"
                onChange={handleChange}
                name="supply_price"
                defaultValue={fD ? fD[0].supply_price : ''}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>원</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="manufacture" sm={2}>
            제조사명
          </Label>
          <Col sm={5}>
            <Input
              type="text"
              name="manufacturer"
              id="manufacture"
              onChange={handleChange}
              defaultValue={fD ? fD[0].manufacturer : ''}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="nutrient" sm={2}>
            영양성분
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="nutrient"
              id="nutrient"
              onChange={handleChange}
              defaultValue={fD ? fD[0].nutrient : ''}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="calorie" sm={2}>
            칼로리
          </Label>
          <Col sm={5}>
            <InputGroup>
              <Input
                type="text"
                name="product_kcal"
                id="calorie"
                placeholder="0"
                onChange={handleChange}
                defaultValue={fD ? fD[0].product_kcal : ''}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>kcal</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="shelfLife" sm={2}>
            유통기한
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="shelf_life"
              id="shelfLife"
              placeholder="예) 제조일로부터 12개월"
              onChange={handleChange}
              defaultValue={fD ? fD[0].shelf_life : ''}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="packaging" sm={2}>
            포장재질
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="packing"
              id="packaging"
              onChange={handleChange}
              defaultValue={fD ? fD[0].packing : ''}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="capacity" sm={2}>
            내용량
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="capacity"
              id="capacity"
              onChange={handleChange}
              defaultValue={fD ? fD[0].capacity : ''}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="explainImg" sm={2}>
            상세이미지
          </Label>
          <Col sm={10}>
            {bImg ? (
              <div>
                <div>업로드된 파일:</div>
                <div style={{ width: '10%' }}>
                  <SideBySideMagnifier
                    imageSrc={bImg}
                    imageAlt="Example"
                    switchSides={true}
                    fillAvailableSpace={true}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
            <Input
              type="file"
              name="back_image"
              id="explainImg"
              onChange={handleInfoImg}
            />
          </Col>
        </FormGroup>
      </div>
    </div>
  );
}
