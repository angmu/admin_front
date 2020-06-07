import React from 'react';
import Loader from 'react-loader-spinner';
import { usePromiseTracker } from 'react-promise-tracker';

export default function Spinner() {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div
        style={{
          width: '100%',
          height: '100',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>이미지파일을 cloudinary에 업로드 중.. 잠시만 기다려주세요</span>
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    )
  );
}
