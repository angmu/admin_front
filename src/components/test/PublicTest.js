import React, { useState } from 'react';

export default function PublicTest() {
  const [publicData, setData] = useState();
  const getData = () => {
    /* Javascript 샘플 코드 */
    var xhr = new XMLHttpRequest();
    var url =
      'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnWthrIdx'; /*URL*/
    var queryParams =
      '?' +
      encodeURIComponent('ServiceKey') +
      '=' +
      'taR5FW6YeJIzwf%2FazRQTo5aCW1q9XxBDI5Ba9AWfOR%2F7fM%2Fd%2B2BOkyoAlWSIayKAXIYbLYRkjafjuwP16DBGsg%3D%3D'; /*Service Key*/
    queryParams +=
      '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams +=
      '&' +
      encodeURIComponent('numOfRows') +
      '=' +
      encodeURIComponent('10'); /**/
    queryParams +=
      '&' +
      encodeURIComponent('dataType') +
      '=' +
      encodeURIComponent('XML'); /**/
    queryParams +=
      '&' +
      encodeURIComponent('CURRENT_DATE') +
      '=' +
      encodeURIComponent('2019122010'); /**/
    queryParams +=
      '&' + encodeURIComponent('HOUR') + '=' + encodeURIComponent('24'); /**/
    queryParams +=
      '&' +
      encodeURIComponent('COURSE_ID') +
      '=' +
      encodeURIComponent('1'); /**/

    xhr.open(
      'GET',
      'http://apis.data.go.kr/1360000/TourStnInfoService/getCityTourClmIdx?serviceKey=taR5FW6YeJIzwf%2FazRQTo5aCW1q9XxBDI5Ba9AWfOR%2F7fM%2Fd%2B2BOkyoAlWSIayKAXIYbLYRkjafjuwP16DBGsg%3D%3D&pageNo=1&numOfRows=10&dataType=XML&CURRENT_DATE=2019122010&DAY=3&CITY_AREA_ID=5013000000&',
    );
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        setData(
          'Status: ' +
            this.status +
            'nHeaders: ' +
            JSON.stringify(this.getAllResponseHeaders()) +
            'nBody: ' +
            this.responseText,
        );
      }
    };

    xhr.send('');
  };
  return <div>{publicData ? publicData : getData()}</div>;
}
