export interface SubjectImages {
  common?: string;
  grid?: string;
  large?: string;
  medium?: string;
  small?: string;
}

export interface Subject {
  id: number;
  type: number | string;
  name: string;
  name_cn?: string;
  air_date: string;
  air_weekday?: string;
  rating?: any;
  rank?: number;
  images: SubjectImages;
  summary?: string;
  staff?: Array<any>;
  url: string;
}
