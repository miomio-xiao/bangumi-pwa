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
  public static search(keywords: string): Promise<any>  {
    return get(`/search/subject/${keywords}`);
  }
  /**
   * 条目信息
   *
   * @param {(number | string)} id
   * @param {string} [responseGroup='small'] 
   */
  public static getSubjectById(id: number | string, responseGroup: string = 'small'): Promise<any>  {
    return get(`/subject/${id}`, {
      responseGroup
    });
  }
}
