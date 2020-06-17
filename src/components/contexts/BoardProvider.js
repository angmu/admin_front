import React, { useState, createContext } from 'react';

const BoardContext = new createContext();
//사용하고자 하는 컴포넌트 최상위에 지정할 Provider컴포넌트 입니다.
const BoardProvider = ({ children }) => {
  const setTitle = (title) => {
    //prevState를 받아서 return을 통해 state를 업데이트 합니다.
    setBoard((prevState) => {
      return {
        ...prevState,
        title,
      };
    });
  };

  const setSubject = (subject) => {
    setBoard((prevState) => {
      return {
        ...prevState,
        subject,
      };
    });
  };

  const sendData = (data) => {
    setBoard((prevState) => {
      return {
        ...prevState,
        data,
      };
    });
  };

  const setFormContent = (setupData) => {
    setBoard((prevState) => {
      return {
        ...prevState,
        setupData,
      };
    });
  };

  //modal toggle(상품등록)
  const wideToggle = (func) => {
    setBoard((prevState) => {
      return {
        ...prevState,
        tg: func,
      };
    });
  };

  //modal toggle2(상품삭제)
  const wideToggle2 = (func) => {
    setBoard((prevState) => {
      return {
        ...prevState,
        tg2: func,
      };
    });
  };

  //modal toggle2(상품수정)
  const wideToggle3 = (func) => {
    setBoard((prevState) => {
      return {
        ...prevState,
        tg3: func,
      };
    });
  };

  //checkbox filter
  const checkToggle = (opt) => {
    setBoard((prevState) => {
      return {
        ...prevState,
        checkOpt: opt,
      };
    });
  };

  //state초기화 객체 입니다.
  const initialState = {
    title: '',
    subject: '',
    tg: null,
    tg2: null,
    tg3: null,
    oneInfo: '',
    checkOpt: '',
    setTitle,
    setSubject,
    sendData,
    setFormContent,
    wideToggle,
    wideToggle2,
    wideToggle3,
    checkToggle,
  };
  //Hook을 통한 state, setState를 정의합니다.
  const [board, setBoard] = useState(initialState);

  return (
    //ColorProvider에 state를 사용할 컴포넌트들을 호출하려면
    //{children}이 있어야 합니다
    //그래서 마지막 return에서 {children}을 리턴해줍니다.
    <BoardContext.Provider value={board}>{children}</BoardContext.Provider>
  );
};

export { BoardProvider, BoardContext };
