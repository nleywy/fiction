/**
 * 布局组件下要展示的路由
 */

import booksRouter from "./books";
import dataCenterRouter from "./dataCenter";
import worksRouter from "./works";

const layoutRouters = [
    ...dataCenterRouter,
    ...booksRouter,
    ...worksRouter,
];

export default layoutRouters;