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

export interface ISubjectComment {
  user: {
    href: string;
    name: string;
    avatar: string;
  };
  ago: string;
  content: string;
  startNum: number;
}

export interface ISubjectEpInfo {
  airdate: string;
  comment: number;
  desc: string;
  duration: string;
  id: number;
  name: string;
  name_cn: string;
  sort: number;
  status: string;
  type: number;
  url: string;
}

type SiteType = 'info' | 'onair' | 'resource';
type SiteName =
  | 'acfun'
  | 'bangumi'
  | 'bilibili'
  | 'dmhy'
  | 'iqiyi'
  | 'kankan'
  | 'letv'
  | 'mgtv'
  | 'nyaa'
  | 'pptv'
  | 'qq'
  | 'saraba1st'
  | 'sohu'
  | 'tucao'
  | 'tudou'
  | 'youku';

export interface ISubjectResourceInfo {
  key: SiteName;
  title: string;
  type: SiteType;
  url: string;
  // 站点信息
  siteInfo: ISiteInfo;
}

export interface ISiteInfo {
  // 站点名称 id
  site: SiteName;
  // 番剧页面 id
  id: String;
  // 播放开始
  begin: Date;
  // 是否官方版权所有
  official: Boolean | null;
  // 是否需要会员
  premuiumOnly: Boolean | null;
  // 是否有审查、删减
  censored: Boolean | null;
  // 是否有实际视频
  exist: Boolean | null;
  // 备注
  comment: String;
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
  eps?: ISubjectEpInfo[];
  staff?: any[];
}

export interface ICalendar {
  items: any[];
  weekday: any;
}

export interface IComment {
  id: string;
  floor: string;
  time: string;
  user: {
    avatar: string;
    href: string;
    name: string;
  };
  content: string;
  sub?: IComment;
}

export interface IBlogInfoTag {
  href: string;
  text: string;
}

export interface IBlogInfo {
  user: {
    name: string;
    href: string;
    avatar: string;
  };
  title: string;
  time: string;
  content: string;
  tag?: IBlogInfoTag[];
}

export interface IBlog {
  blog: IBlogInfo;
  comments: IComment[];
}
