// 목록 체크
export const onChecked = (e, items, setter) => {
  const target = e.currentTarget;
  const checked = target.checked;
  const item = target.value;

  if (checked) {
    setter([...items, item]);
  } else if (!checked) {
    setter(items.filter(el => el !== item));
  }
};

export const roadMap = (address, campName) => {
  const mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

  // 지도를 생성합니다
  const map = new window.kakao.maps.Map(mapContainer, mapOption);

  // 주소-좌표 변환 객체를 생성합니다
  const geocoder = new window.kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(address, function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === window.kakao.maps.services.Status.OK) {
      const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

      // 결과값으로 받은 위치를 마커로 표시합니다
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: coords,
      });

      // 인포윈도우로 장소에 대한 설명을 표시합니다
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="width:150px;text-align:center;padding:6px 0;">${campName}</div>`,
      });
      infowindow.open(map, marker);

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);
    }
  });
};
