# ⛺캠프파이어 클라이언트 웹페이지

```
캠핑파이어는 쉽고 편리한 캠핑장 예약 시스템 입니다.
캠핑, 글램핑, 카라반 등등 고객이 원하는 캠핑장만 골라서 보여주며 지역검색으로 원하는 지역의 캠핑장을 찾을 수 있습니다.
메인에서 테마검색으로 원하는 유형의 캠핑장을 찾을 수 있습니다.
캠핑장, 날짜, 인원수, 상세조건에 따라 원하는 캠핑장을 예약하세요!
```

## 기술스택
- React
- TypeScript
- library
    - @emotion/react
    - @emotion/styled
    - @mui/icons-material
    - @mui/material
    - @reduxjs/toolkit
    - axios
    - react-daum-postcode: 주소찾기
    - react-redux
    - react-dom
    - react-router-dom

## 화면기능
- 메인: /
- 검색: /search
- 캠핑장상세: /camp/:campId
- 캠핑장예약: /camp/:campId/sitedesc/:siteId
- 마이페이지: /mypage
- 프로필편집: /mypage/edit
- 회원가입: /signup
- 로그인: /login
- 카카오로그인: /api/auths/kakao


## 노션주소
<https://www.notion.so/deepsea-human/SA-4-b0e895564177427194ad966ac588dee7>

## 트러블슈팅
- 문제1
```
text-overflow속성에서 eclipse 적용안되는 문제, display: flex일때 적용이 안됨.
=> display: block으로하고, 분리되는 부분에 margin을 주는 형태로 바꿈
```
- 문제2
```
이미지 수정 때 aws 주소를 다시 파일형태로 바꾸는데 CORS에러가 뜸.
=> 무조건 이미지를 새로 입력 받도록 백엔드와 협의, 문제 해결 중
```
- 문제3
```
메인페이지에서 찜하기를 누르면 숫자가 바로 오르거나 내리지않는다.
=> 해당 데이터를 slice를 이용하여 데이터를 받으면 저장하고 찜하기를 누르면 해당 데이터가 바로 반영되도록함
```
- 문제4
```
accesstoken이 만료되고 refresh토큰은 유효할 때 토큰을 저장못함, accesstoken, refreshtoken 둘 다 만료(419)됐을 때 로그인페이지로 리다이렉트 처리 누락되어있음
=> Axios Intercepter로 API응답 에러 핸들링 추가(access토큰 만료시 재발급받은 토큰을 다시 넣어주는 로직과 419에러 핸들링 추가)
```
- 문제5
```
마이페이지 비정상 접근시 서버가 다운되는 현상
=> accessToken, refreshToken,userId가 있는 경우에만 사용자정보 조회하도록 변경함. 하나라도 없을 시 login창으로 리다이렉트
```
