import request from '@/utils/request';

export async function AccountLogin(params) {
  return request('/users/login', {
    method: 'POST',
    data: params,
  });
}
