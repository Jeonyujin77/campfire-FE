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

// 카테고리별 장소 검색하기
export const categoryFromBounds = (campLat, campLng, campName) => {
  const coords = new window.kakao.maps.LatLng(campLat, campLng);

  // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
  let placeOverlay = new window.kakao.maps.CustomOverlay({ zIndex: 1 }),
    contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
    markers = [], // 마커를 담을 배열입니다
    currCategory = ''; // 현재 선택된 카테고리를 가지고 있을 변수입니다

  let mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
      center: coords,
      level: 5, // 지도의 확대 레벨
    };

  // 지도를 생성합니다
  let map = new window.kakao.maps.Map(mapContainer, mapOption);

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
  // 장소 검색 객체를 생성합니다
  let ps = new window.kakao.maps.services.Places(map);

  // 지도에 idle 이벤트를 등록합니다
  new window.kakao.maps.event.addListener(map, 'idle', searchPlaces);

  // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
  contentNode.className = 'placeinfo_wrap';

  // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
  // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
  addEventHandle(contentNode, 'mousedown', window.kakao.maps.event.preventMap);
  addEventHandle(contentNode, 'touchstart', window.kakao.maps.event.preventMap);

  // 커스텀 오버레이 컨텐츠를 설정합니다
  placeOverlay.setContent(contentNode);

  // 각 카테고리에 클릭 이벤트를 등록합니다
  addCategoryClickEvent();

  // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
  function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      target.attachEvent('on' + type, callback);
    }
  }

  // 카테고리 검색을 요청하는 함수입니다
  function searchPlaces() {
    if (!currCategory) {
      return;
    }

    // 커스텀 오버레이를 숨깁니다
    placeOverlay.setMap(null);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === window.kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
    }
  }

  // 지도에 마커를 표출하는 함수입니다
  function displayPlaces(places) {
    // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
    // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
    let order = document
      .getElementById(currCategory)
      .getAttribute('data-order');

    for (let i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      let marker = addMarker(
        new window.kakao.maps.LatLng(places[i].y, places[i].x),
        order,
      );

      // 마커와 검색결과 항목을 클릭 했을 때
      // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
      (function (marker, place) {
        window.kakao.maps.event.addListener(marker, 'click', function () {
          displayPlaceInfo(place);
        });
      })(marker, places[i]);
    }
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position, order) {
    let imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new window.kakao.maps.Size(27, 28), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new window.kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
        spriteOrigin: new window.kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new window.kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions,
      ),
      marker = new window.kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  }

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
  function displayPlaceInfo(place) {
    let content =
      '<div class="placeinfo">' +
      '   <a class="title" href="' +
      place.place_url +
      '" target="_blank" title="' +
      place.place_name +
      '">' +
      place.place_name +
      '</a>';

    if (place.road_address_name) {
      content +=
        '    <span title="' +
        place.road_address_name +
        '">' +
        place.road_address_name +
        '</span>' +
        '  <span class="jibun" title="' +
        place.address_name +
        '">(지번 : ' +
        place.address_name +
        ')</span>';
    } else {
      content +=
        '    <span title="' +
        place.address_name +
        '">' +
        place.address_name +
        '</span>';
    }

    content +=
      '    <span class="tel">' +
      place.phone +
      '</span>' +
      '</div>' +
      '<div class="after"></div>';

    contentNode.innerHTML = content;
    placeOverlay.setPosition(new window.kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);
  }

  // 각 카테고리에 클릭 이벤트를 등록합니다
  function addCategoryClickEvent() {
    let category = document.getElementById('category'),
      children = category.children;

    for (let i = 0; i < children.length; i++) {
      children[i].onclick = onClickCategory;
    }
  }

  // 카테고리를 클릭했을 때 호출되는 함수입니다
  function onClickCategory() {
    let id = this.id,
      className = this.className;

    placeOverlay.setMap(null);

    if (className === 'on') {
      currCategory = '';
      changeCategoryClass();
      removeMarker();
    } else {
      currCategory = id;
      changeCategoryClass(this);
      searchPlaces();
    }
  }

  // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
  function changeCategoryClass(el) {
    let category = document.getElementById('category'),
      children = category.children,
      i;

    for (i = 0; i < children.length; i++) {
      children[i].className = '';
    }

    if (el) {
      el.className = 'on';
    }
  }
};

// 여러개 마커 표시하기
export const multipleMarkerImage = campList => {
  let positions = []; // 마커를 표시할 위치와 title 객체 배열입니다

  let mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
      center: new window.kakao.maps.LatLng(35.95, 128.25), // 지도의 중심좌표
      level: 13, // 지도의 확대 레벨
    };

  for (let i = 0; i < campList.length; i++) {
    const element = campList[i];

    if (element.mapX !== null && element.mapY !== null) {
      positions.push({
        title: element.campName,
        address: element.campAddress,
        latlng: new window.kakao.maps.LatLng(element.mapY, element.mapX),
      });
    }
  }

  // 마커 이미지의 이미지 주소입니다
  let imageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

  let map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  for (let j = 0; j < positions.length; j++) {
    // 마커 이미지의 이미지 크기 입니다
    let imageSize = new window.kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다
    let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    let marker = new window.kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions[j].latlng, // 마커를 표시할 위치
      title: positions[j].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage, // 마커 이미지
      clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });

    // 마커를 지도에 표시합니다.
    marker.setMap(map);

    // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
    let iwContent = `<div style="padding:5px;"><p>${positions[j].title}<p><p>${positions[j].address}<p></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성합니다
    let infowindow = new window.kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 마커에 클릭이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, 'click', function () {
      // 마커 위에 인포윈도우를 표시합니다
      infowindow.open(map, marker);
    });
  }
};
