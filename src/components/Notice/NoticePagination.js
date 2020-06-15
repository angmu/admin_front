import React from 'react';
import Pagination from '../../layouts/Pagination';

export default function NoticePagination(
  pageSize,
  resultCnt,
  currentPage,
  onPageChange,
) {
  return (
    <Pagination
      itemsCount={resultCnt}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  );
}
