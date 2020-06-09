// import React, { useState, createContext, Children } from 'react';
// const ProductContext = new createContext();

// const ProductProvider = ({ chlidren }) => {
//   const setTitle = (title) => {
//     //prevState를 받아서 return을 통해 state를 업데이트 합니다.
//     setProduct((prevState) => {
//       return {
//         ...prevState,
//         title,
//       };
//     });
//   };
//   const setSubject = (subject) => {
//     setProduct((prevState) => {
//       return {
//         ...prevState,
//         subject,
//       };
//     });
//   };
//   //state초기화 객체 입니다.
//   const initialState = {
//     title: '',
//     subject: '',
//     setTitle,
//     setSubject,
//   };

//   const [product, setProduct] = useState(initialState);

//   return (
//     <ProductContext.Provider value={product}>
//       {Children}
//     </ProductContext.Provider>
//   );
// };

// export { ProductProvider, ProductContext };
