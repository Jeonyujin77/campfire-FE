import { AnyListenerPredicate } from '@reduxjs/toolkit';

// 유저 회원가입 정보
export interface UserInfo {
  email: string;
  userName: string;
  password: string;
  phoneNumber: string;
  profileImg?: string;
}

// 유저 소셜회원가입 추가정보
export interface SocialUserInfo {
  provider: string;
  email: string;
  userName: string;
  password: null;
  phoneNumber: string;
  profileImg?: string;
  snsId: any;
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
// export interface DeleteUser {
//   userId: number | undefined;
//   password: string;
// }

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
      confirmBook: boolean;
    },
  ];
}
// 유저 이용완료 내역
export interface CompletedReservationList {
  expiredBooks: [
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
      expiredBooks: boolean;
    },
  ];
}
// 유저 예약취소내역
export interface CanceledReservationList {
  cancelBooks: [
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
      cancleBooks: boolean;
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
  confirmBook?: boolean;
}

export interface compreser {
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
  expiredBooks: boolean;
}

export interface cancreser {
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
  cancleBooks: boolean;
}

// 유저 찜내역 정보
export interface LikesCamp {
  Likes: [
    {
      likeId: number;
      userId: number;
      campId: number;
      campName: string;
      createdAt: any;
      updatedAt: any;
      campMainImage: string;
      campAddress: string;
      typeLists: [string];
    },
  ];
}

export interface Like {
  likeId: number;
  userId: number;
  campId: number;
  campName: string;
  createdAt: any;
  updatedAt: any;
  campMainImage: string;
  campAddress: string;
  typeLists: [string];
}

export interface CertifiPayload {
  type: string;
  countryCode: string;
  from: any;
  content: string;
  messages: any;
}
