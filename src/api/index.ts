import { get, post } from './config';

type ReviewOptions = {
  id?: string | number;
  category?: string;
  rank?: string;
  period?: string;
  check?: boolean;
};

export default class Api {
  /**
   * 每日放送
   */
  public static async getCalendars(): Promise<any> {
    return get('api/calendar');
  }

  /**
   * 搜索
   * 
   * @param {string} keywords
   *
   */
  public static async search(keywords: string): Promise<any> {
    keywords = encodeURIComponent(keywords);
    return get(`api/search/subject/${keywords}`, {
      type: 2,
      responseGroup: 'large'
    });
  }
  /**
   * 条目信息
   *
   * @param {(number | string)} id
   * @param {string} [responseGroup='small'] 
   */
  public static async getSubjectById(id: number | string, responseGroup: string = 'small'): Promise<any> {
    return get(`api/subject/${id}`, {
      responseGroup
    });
  }
  /**
   * 查看历史数据
   *
   * @param {ReviewOptions} options
   */
  public static async review(options: ReviewOptions): Promise<any> {
    return get(`bgmtools/review/api`, options);
  }
}
