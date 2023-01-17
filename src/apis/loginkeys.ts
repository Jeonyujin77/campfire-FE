export const {
  REACT_APP_KAKAO_JS_SDK_KEY,
  REACT_APP_KAKAO_REST_API_KEY,
  REACT_APP_KAKAO_LOGIN_REDIRECT_URI,
} = process.env;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REACT_APP_KAKAO_LOGIN_REDIRECT_URI}&response_type=code`;
