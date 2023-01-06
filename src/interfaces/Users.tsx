// 유저 회원가입 정보
export interface UserInfo {
  email: string;
  userName: string;
  password: string;
  phoneNumber: string;
  profileImg?: string;
}

// 유저 로그인 정보
export interface UserLogin {
  email: string;
  password: string;
}
