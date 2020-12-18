<template>
    <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
            <transition-group name="breadcrumb">
                <template  v-for="(item,index) in levelList">
                    <el-breadcrumb-item v-if="item.meta.title" :key="item.name">
                        <span
                            v-if="item.redirect==='noredirect'||index==levelList.length-1"
                            class="no-redirect"
                            >{{ item.meta.title }}
                        </span>
                        <router-link v-else :to="item.redirect||item.path" class="ok-redirect">{{ item.meta.title }}</router-link>
                    </el-breadcrumb-item>
                </template>
            </transition-group>
    </el-breadcrumb>
</template>

<script>
    export default {
        data() {
            return {
                levelList: null
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb();
            }
        },
        created() {
            this.getBreadcrumb();
        },
        methods: {
            getBreadcrumb() {
                const { params } = this.$route;
                let matched = this.$route.matched.filter(item => {
                    if (item.name) {
                        item.path = params;
                        return true;
                    }
                })
                this.levelList = matched;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 1;
        margin-top: 20px;
        margin-left: 10px;
        margin-bottom: 10px;
        .no-redirect {
            color: #7B7B7B;
            cursor: text;
        }

        .ok-redirect {
            color: #7B7B7B;
            font-weight: 400;

            &:hover {
                color: #3399FE;
            }
        }
    }
</style>