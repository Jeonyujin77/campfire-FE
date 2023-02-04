export interface Comment {
  campId: number;
  content: string;
}

export interface GetComments {
  campId: number;
  pageno: number;
}

export interface ModifyOrDeleteComment {
  campId: number;
  reviewId: number;
  content?: string;
}

export interface CommentInfo {
  campId: number;
  content: string;
  reviewId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  userName: string;
  profileImg: string;
}
