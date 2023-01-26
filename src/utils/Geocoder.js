export const campGeocoder = (address, setterlat, setterlng) => {
  // 주소-좌표 변환 객체를 생성합니다
  const geocoder = new window.kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(address, function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === window.kakao.maps.services.Status.OK) {
      console.log(result[0].x, result[0].y);
      const coordinate = { lat: result[0].x, lng: result[0].y };
      setterlat(result[0].y);
      setterlng(result[0].x);
    }
  });
};
