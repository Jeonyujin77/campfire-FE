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
