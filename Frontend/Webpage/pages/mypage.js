// /pages/mypage.js

import React from "react";
import DiaryList from './DiaryList';

const MyPage = () => {
  <div>abcd</div>
  // DiaryList 컴포넌트에 전달할 diaries 데이터
  const diaries = [
    { id: 1, title: '첫 번째 일기', content: '첫 번째 일기 내용', result: '분석 결과 1' },
    { id: 2, title: '두 번째 일기', content: '두 번째 일기 내용', result: '분석 결과 2' },
    // 필요한 만큼 데이터를 추가할 수 있습니다.
  ];

  return (
    <DiaryList diaries={diaries} />
  );
};

export default MyPage;
