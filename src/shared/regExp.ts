export const userIdCheck = (id: string) => {
  // 최소조건
  // 이메일 @ 이전부분 4~16자
  // 입력값 [영어소문자,숫자]
  let regExp =
    /^[0-9a-z]([-_.]?[0-9a-z]){4,16}*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/;
  return regExp.test(id);
};

export const passwordCheck = (pw: string) => {
  // 최소조건
  // 8자 이상 20자 이하
  // 입력값 [!@#$%,영어소문자,숫자]
  let regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%])(?=.*[0-9]).{8,20}$/;
  return regExp.test(pw);
};

export const nickNameCheck = (nick: string) => {
  // 최소조건
  // 4자 이상 16자 이하
  // 입력값 [영어소문자,숫자]
  let regExp = /^[a-z0-9]{4,16}$/;

  return regExp.test(nick);
};

// export const nickNameCheck = (nick: string) => {
//     //   // 최소조건
//     //   // 2자 이상 8자 미만
//     //   // 입력값 [대소문자,숫자][특수문자,대소문자,숫자,한글][!@#$%^&*()_+=~₩]
//       let regExp = /[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣][!@#$%^&*()_+=~₩]{2,7}/;

//       return regExp.test(nick);
//     };

// export const emailValid = (email) => {
//   let regExp =
//     /^[a-z0-9]{4,16}@.[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
//   return regExp.test(email);
// };
// export const nicknameValid = (nickname) => {
//   let regExp = /^[a-z0-9-\s]{4,16}$/;
//   return regExp.test(nickname);
// };
// export const pwValid = (pw) => {
//   // 비밀번호 8~16자 영문 대 소문자, 숫자, 특수문자
//   let regExp = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,16}$/;
//   return regExp.test(pw);
// };
// export const phoneValid = (phone) => {
//   let regExp = /^\d{3}-\d{3,4}-\d{4}$/;
//   return regExp.test(phone);
// };
// export const telValid = (tel) => {
//   let regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
//   return regExp.test(tel);
// };
