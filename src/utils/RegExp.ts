export const emailValid = (email: string) => {
  let regExp =
    /^[a-z0-9]{4,16}@.[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

  return regExp.test(email);
};

export const nicknameValid = (nickname: string) => {
  let regExp = /^[a-z0-9-\s]{4,16}$/;

  return regExp.test(nickname);
};

export const pwValid = (pw: string) => {
  // 비밀번호 8~16자 영문 대 소문자, 숫자, 특수문자
  let regExp = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,16}$/;

  return regExp.test(pw);
};

export const phoneValid = (phone: string) => {
  let regExp = /^\d{3}\d{3,4}\d{4}$/;

  return regExp.test(phone);
};

export const telValid = (tel: string) => {
  let regExp = /^\d{2,3}\d{3,4}\d{4}$/;

  return regExp.test(tel);
};
