import React from 'react';
import _ from 'lodash';

export default function Pagination({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}) {
  const pageCount = Math.ceil(itemsCount / pageSize); //몇 페이지가 필요한지 계산
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <div className="pagination justify-content-end mb-0 mr-3">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? 'page-item active' : 'page-item'
              }
              style={{ cursor: 'pointer' }}
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
