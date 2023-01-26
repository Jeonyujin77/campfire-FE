export interface ReserveInfo {
  campId: number;
  siteId: number;
  checkInDate: Date | string | null;
  checkOutDate: Date | string | null;
  adults: number;
  children: number;
}
