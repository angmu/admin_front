import React from 'react';
import SearchBox from '../../layouts/SearchBox';

export default function ProductSearch(cateData1, cateData2, searching) {
  return (
    <SearchBox
      options1={cateData1}
      options2={cateData2}
      defaultV="카테고리 선택"
      searching={searching}
    />
  );
}
