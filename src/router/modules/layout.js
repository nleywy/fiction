/**
 * 布局组件下要展示的路由
 */

import booksRouter from "./books";
import dataCenterRouter from "./dataCenter";
import worksRouter from "./works";
import personalDataRouter from "./personalData";
import applyRouter from "./apply";

const layoutRouters = [
    ...applyRouter,
    ...personalDataRouter,
    ...dataCenterRouter,
    ...booksRouter,
    ...worksRouter,
];

export default layoutRouters;