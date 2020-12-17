import request from '@/utils/request'

/**
 * 编辑书籍
 *
 * @param appBookInfo
 * @return
 */
export function upload(data) {
  return request({
    url: '/author/cms/file/upload',
    method: 'post',
    data,
    headers:{'Content-Type':'multipart/form-data'}
  });
};
