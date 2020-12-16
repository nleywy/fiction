import { Message } from "element-ui"

/**
 *
 *
 * @export
 * @param {*} size
 * @returns
 */
export function fileSize(size) {

  if(size > 500 * 1024 * 1024) {
    Message.warning('您上传的文件大小超过了500M！')
    return true
  }
  return false
}

/**
 *
 *
 * @export
 * @param {*} type
 */
export function fileType(type) {
  if(type.includes('.')) {
    const list = type.split('.')
    type = list[list.length - 1]
  }

  type = type.toLowerCase();

  const reg = /^(ppt|doc|docx|xls|xlsx|pdf|jpg|jpeg|png|gif|bmp|zip|rar)$/ig
  const bool = reg.test(type)

  if(!bool) {
    Message.warning('您上传的文件类型不正确！')
    return true
  }

  return false
}