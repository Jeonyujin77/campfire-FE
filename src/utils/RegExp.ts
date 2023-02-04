export const emailValid = (email: string) => {
  let regExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  return regExp.test(email);
};

export const nicknameValid = (nickname: string) => {
  let regExp = /^[a-zㄱ-ㅎ가-힣0-9-\s]{4,16}$/;

  return regExp.test(nickname);
};

export const pwValid = (pw: string) => {
  // 비밀번호 8~16자 영문 대 소문자, 숫자, 특수문자
  let regExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  return regExp.test(pw);
};

export const telValid = (tel: string) => {
  let regExp = /^\d{2,3}\d{3,4}\d{4}$/;

  return regExp.test(tel);
};
