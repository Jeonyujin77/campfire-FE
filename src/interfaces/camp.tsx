export interface CampType {
  campAddress: string;
  campAmenities: any;
  campDesc: string;
  campId: number;
  campMainImage: string;
  campName: string;
  campPrice: number;
  campSubImages: any;
  checkIn: any;
  checkOut: any;
  cretedAt: any;
  hostId: number;
  updatedAt: any;
  typeLists: [];
  likes: number;
  countReviews: number;
  likeStatus: boolean;
  premium: boolean;
  homepage: string | null;
}

export interface PagenoCamps {
  camps: [
    {
      campId: number;
      hostId: number;
      campName: string;
      campAddress: string;
      campPrice: number;
      campMainImage: string;
      campSubImages: [string];
      campDesc: string;
      campAmenities: [string];
      checkIn: string;
      checkOut: string;
      createdAt: Date;
      updatedAt: Date;
      envLists: [string];
      typeLists: [string];
      themeLists: [string];
      likeStatus: boolean;
      likes: number;
    },
  ];
}

export interface SiteList {
  getSiteLists: [
    {
      siteId: number;
      campId: number;
      siteName: string;
      sitePrice: number;
      siteMainImage: string;
      bookStatus: boolean;
      minPeople: number;
      maxPeople: number;
      createdAt: any;
      updatedAt: any;
    },
  ];
}

export interface SiteListsRes {
  siteId: number;
  campId: number;
  siteName: string;
  sitePrice: number;
  siteMainImage: string;
  bookStatus: boolean;
  minPeople: number;
  maxPeople: number;
  createdAt: any;
  updatedAt: any;
}

export interface SiteDesc {
  site: {
    siteId: number;
    campId: number;
    hostId: number;
    siteName: string;
    siteInfo: string;
    siteDesc: string;
    sitePrice: number;
    siteMainImage: string;
    siteSubImages: [string];
    minPeople: number;
    maxPeople: number;
    createdAt: any;
    updatedAt: any;
  };
}

export interface SearchCampsByKeyword {
  search: string;
  types: string[];
  themes: string[];
  amenities: string[];
  envs: string[];
  location: string;
}

export interface LikeRankTypes {
  campName: string;
  campId: number;
  likes: number;
}

export interface ReviewRankTypes {
  campName: string;
  campId: number;
  countReviews: number;
}

export interface PremiumCamps {
  premium: [
    {
      campId: number;
      hostId: number;
      campName: string;
      campAddress: string;
      campMainImage?: string;
      campSubImages?: [string];
      campDesc: string;
      typeLists: [string];
      checkIn: string;
      checkOut: string;
      likes: number;
      likeStatus: boolean;
      mapX: string;
      mapY: string;
      premium: boolean;
      countReviews: number;
      createdAt: string;
      updateAt: string;
    },
  ];
}
