export enum SubjectType {
  Book,
  Anime,
  Music,
  Game,
  Real
}

export type ResponseGroup = 'small' | 'medium' | 'large';

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

export interface ISearchOptions {
  keywords: string;
  type?: SubjectType;
  responseGroup?: ResponseGroup;
  start?: number;
  max_results?: number;
}

export type kvObject = { name: string; value: any };
