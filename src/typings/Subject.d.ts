export interface ISubjectImages {
  common?: string;
  grid?: string;
  large?: string;
  medium?: string;
  small?: string;
}

export interface ISubject {
  id: number;
  type: number | string;
  name: string;
  name_cn?: string;
  air_date: string;
  air_weekday?: string;
  rating?: any;
  rank?: number;
  images: ISubjectImages;
  summary?: string;
  staff?: Array<any>;
  url: string;
}

export interface ICalendar {
  items: Array<any>;
  weekday: any;
}
