import axios from 'axios';
import qs from 'qs';

// axios 配置
const instance = axios.create({
  baseURL: 'api',
  timeout: 20000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

export function post(
  url: string,
  params: Object = {},
  queryParams: Object = {}
) {
  return new Promise<any>((resolve, reject) => {
    instance({
      method: 'post',
      url,
      params: queryParams,
      data: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function get(url: string, params: Object = {}) {
  return new Promise<any>((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params: params,
      paramsSerializer: function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
