import request from 'umi-request';

export async function fakeRegister(params) {
  return request('/users/register', {
    method: 'POST',
    data: params,
  });
}
