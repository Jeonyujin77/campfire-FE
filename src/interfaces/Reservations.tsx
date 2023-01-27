export interface ReserveInfo {
  campId: number;
  siteId: number;
  checkInDate: Date | string | null;
  checkOutDate: Date | string | null;
  adults: number;
  children: number;
}

export interface dateType {
  startday?: any;
  endday?: any;
}

export interface countType {
  adult?: any;
  child?: any;
}
