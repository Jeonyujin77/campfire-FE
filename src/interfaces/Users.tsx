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

// 유저 정보수정 관련정보
export interface PutUserInfo {
  userId: number;
  formData: FormData;
}

// 유저 회원탈퇴 관련정보
export interface DeleteUser {
  userId: number | undefined;
  password: string;
}

// 유저 예약내역 관련정보
export interface ReservationList {
  books: [
    {
      Camp_checkIn: string;
      Camp_checkOut: string;
      bookId: number;
      userId: number;
      hostId: number;
      campId: number;
      siteId: number;
      checkInDate: any;
      checkOutDate: any;
      adults: number;
      children: number;
      totalPeople: number;
      createdAt: any;
      updatedAt: any;
      siteName: string;
      siteDesc: string;
      siteInfo: string;
      sitePrice: number;
      siteMainImage: string;
    },
  ];
}

// export interface Reservationapi {
//   bookparams: number;
// }

// 유저 특정 예약 상세 정보
export interface Reservation {
  Camp_checkIn: string;
  Camp_checkOut: string;
  bookId: number;
  userId: number;
  hostId: number;
  campId: number;
  siteId: number;
  checkInDate: any;
  checkOutDate: any;
  adults: number;
  children: number;
  totalPeople: number;
  createdAt: any;
  updatedAt: any;
  siteName: string;
  siteDesc: string;
  siteInfo: string;
  sitePrice: number;
  siteMainImage: string;
}
