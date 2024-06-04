// /pages/mypage.js

import React from "react";
import DiaryList from './DiaryList';
import ProtectedRoute from './ProtectedRoute';

const MyPage = () => {

  return (
    <ProtectedRoute>
      <DiaryList/>
    </ProtectedRoute>
  );
};

export default MyPage;
