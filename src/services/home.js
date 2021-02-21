import request from '@/utils/request';

export async function queryCarousel() {
  return request('/get_carousel');
}
