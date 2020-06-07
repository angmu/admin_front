import React from 'react';
import { BoardProvider } from '../../components/contexts/BoardProvider';
import NoticeList from '../../views/board/NoticeList';

export default function NoticeWrap() {
  return (
    <BoardProvider>
      <NoticeList />
    </BoardProvider>
  );
}
