import { Location } from 'react-router-dom';

const useReserveInfo = (state: Location['state']) => {
  // 상세페이지를 통해서 접근 안하고 바로 예약페이지로 접근한 경우 메인으로 리다이렉트시킴
  if (state === null) {
    window.location.href = '/';
    return [];
  }

  const adult = state.countState.adult; // 성인 수
  const child = state.countState.child; // 아동 수
  const startday = state.dateState.startday; // 체크인날짜
  const endday = state.dateState.endday; // 체크아웃날짜
  const dayArr = ['일', '월', '화', '수', '목', '금', '토'];
  const representStart =
    startday.getMonth() +
    1 +
    '.' +
    startday.getDate() +
    ' (' +
    dayArr[startday.getDay()] +
    ')';
  const representEnd =
    endday.getMonth() +
    1 +
    '.' +
    endday.getDate() +
    ' (' +
    dayArr[endday.getDay()] +
    ')';
  //디데이 표시 계산
  const userDate: any = new Date();
  const dDay = '' + Math.ceil((startday - userDate) / (1000 * 60 * 60 * 24));

  return [startday, endday, representStart, representEnd, dDay, adult, child];
};

export default useReserveInfo;
