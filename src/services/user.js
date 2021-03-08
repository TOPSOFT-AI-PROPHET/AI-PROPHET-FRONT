import request from '@/utils/request';

export async function queryCurrent() {
  return request('/users/getUserInfo', { method: 'POST' });
}
export async function queryNotices() {
  return request('/api/notices', { method: 'POST' });
}
