/**
 * @author 王亚飞
 * @description 寻找一维数组对应名称
 * @param { array } list 需要寻找的数组
 * @param { string } name 返回的名称
 * @param { * } id 通过特定字段寻找
 * @param { * } idValue 匹配的id值
 */
export const findUnidimensionalListName = (list, name, id, idValue ) => {
    if(!Array.isArray(list)) {
        throw Error("Please pass in the corresponding array！");
    }

    // const find = list.find(item => item[id] === id);
    const find = list.find(item => item[id] == idValue);

    if(find) {
        return find[name];
    }else {
        return "";
    }
}