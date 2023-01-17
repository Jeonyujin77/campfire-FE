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
  sites: [
    {
      siteId: number;
      campId: number;
      // hostId: number;
      siteName: string;
      sitePrice: number;
      siteMainImage: string;
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
  // hostId: number;
  siteName: string;
  sitePrice: number;
  siteMainImage: string;
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
