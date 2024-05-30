// /pages/mypage.js

import React from "react";
import DiaryList from './DiaryList';
import ProtectedRoute from './ProtectedRoute';

const MyPage = () => {
  // DiaryList 컴포넌트에 전달할 diaries 데이터

  return (
    <ProtectedRoute>
      <DiaryList/>
    </ProtectedRoute>
  );
};

export default MyPage;
