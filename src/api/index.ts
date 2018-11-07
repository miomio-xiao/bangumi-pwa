import { get, post } from './config';

export default class Api {
  /**
   * 每日放送
   */
  public static async getCalendars(): Promise<any> {
    return get('bgm/calendar');
  }

  /**
   * 搜索
   *
   * @static
   * @param {Types.ISearchOptions} options
   * @returns {Promise<any>}
   * @memberof Api
   */
  public static async search(options: Types.ISearchOptions): Promise<any> {
    const keywords = encodeURIComponent(options.keywords);
    return get(`bgm/search/subject/${keywords}`, options);
  }

  /**
   * 条目信息
   *
   * @param {(number | string)} id
   * @param {string} [responseGroup='small']
   */
  public static async getSubjectById(
    id: number | string,
    responseGroup: string = 'small'
  ): Promise<any> {
    return get(`bgm/subject/${id}`, {
      responseGroup
    });
  }

  /**
   * 条目吐槽
   *
   * @param {(number | string)} id
   * @param {number} page
   *
   */
  public static async getSubjectCommentsById(
    id: number | string,
    page: number = 1
  ): Promise<any> {
    return get(`subject/${id}/comments`, {
      page
    });
  }

  /**
   * 章节信息
   *
   * @param {(number | string)} id
   *
   */
  public static async getEpInfo(id: number | string): Promise<any> {
    return get(`ep/${id}`);
  }

  /**
   * 资源站点信息
   *
   * @param {(number | string)} id
   *
   */
  public static async getSiteList(id: number | string): Promise<any> {
    return get(`subject/${id}/resource`);
  }

  /**
   * 查看历史数据
   *
   * @param {Types.IReviewOptions} options
   */
  public static async review(options: Types.IReviewOptions): Promise<any> {
    return get(`/review`, options);
  }
}
