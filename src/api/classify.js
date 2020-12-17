import request from '@/utils/request'

/**
 * 获取书籍分类列表
 *
 * @param type
 * @param classifyId
 * @param pageNo
 * @param pageSize
 * @return
 */
export const getBookClassifyListByParams = () => {
    return request({
        url: "/author/cms/classify/getBookClassifyListByParams",
        method: 'get',
    })
}
