import { v4 as uuidV4 } from "uuid";

/**
 * 
 * 更新当前路由
 */
export default function() {
  this.$router.push({
    path: this.$route.path,
    query: {
      ...this.$route.query,
      time: uuidV4(),
    },
    params: {
      ...this.$route.params,
    }
  });
}