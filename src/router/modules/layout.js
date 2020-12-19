/**
 * 布局组件下要展示的路由
 */

import booksRouter from "./books";
import dataCenterRouter from "./dataCenter";
import worksRouter from "./works";
import personalData from "./personalData";

const layoutRouters = [
    ...personalData,
    ...dataCenterRouter,
    ...booksRouter,
    ...worksRouter,
];

export default layoutRouters;