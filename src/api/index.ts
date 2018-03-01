import { get, post } from './config';

export default class Api {
  /**
   * 每日放送
   */
  public static async getCalendars(): Promise<any> {
    return get('calendar');
  }

  /**
   * 搜索
   * 
   * @param {string} keywords
   *
   */
  public static async search(keywords: string): Promise<any> {
    keywords = encodeURIComponent(keywords);
    return get(`/search/subject/${keywords}`, {
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
  public static async getSubjectById(id: number | string, responseGroup: string = 'small'): Promise<any>  {
    return get(`/subject/${id}`, {
      responseGroup
    });
  }
}
