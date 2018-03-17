export interface ISubjectImages {
  common?: string;
  grid?: string;
  large?: string;
  medium?: string;
  small?: string;
}

export interface ISubjectCollection {
  collect?: number;
  doing?: number;
  dropped?: number;
  on_hold?: number;
  wish?: number;
}

export interface ISubjectCharactor {
  id: number;
  name: string;
  url: string;
  images: ISubjectImages;
  role_name: string;
  name_cn?: string;
  info?: any;
  actors?: any;
}

export interface ISubjectBlog {
  id: number;
  title: string;
  url: string;
  dateline: string;
  timestamp: number;
  summary: string;
  replies: number;
  user: Types.IUser;
}

export interface ISubject {
  id: number;
  type: number | string;
  name: string;
  url: string;
  air_date: string;
  images: ISubjectImages;
  name_cn?: string;
  air_weekday?: string;
  rating?: any;
  rank?: number;
  collection?: ISubjectCollection;
  summary?: string;
  staff?: Array<any>;
}

export interface ICalendar {
  items: Array<any>;
  weekday: any;
}
