import React from 'react';
import { BoardProvider } from '../../components/contexts/BoardProvider';
import ProductList from './ProductList';

export default function ProductWrap() {
  return (
    <BoardProvider>
      <ProductList />
    </BoardProvider>
  );
}
