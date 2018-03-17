export interface IReviewOptions {
  id?: string | number;
  category?: string;
  rank?: string;
  period?: string;
  check?: boolean;
}

export interface IUser {
  id: number;
  nickname: string;
  url: string;
  username: string;
  avatar: any;
  sign?: any;
}

export type kvObject = { name: string; value: any };
