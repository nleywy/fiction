<template>
    <header class="header">
        <section class="container">
            <div class="left">
                <router-link to="/">
                    <el-image
                        class="logo"
                        style="width: 40px; height: 40px"
                        :src="require('@/assets/logo.png')"
                        >
                    </el-image>
                </router-link>
                <span class="title">作者中心</span>
            </div>

            <slot name="right">
                <div class="right">
                    <el-image
                        @click="management"
                        class="logo"
                        style="width: 24px; height: 24px;margin-right: 50px;"
                        :src="require('@/assets/pc.png')"
                        >
                    </el-image>

                    <el-dropdown trigger="click" @command="handleCommand">
                        <el-avatar
                            class="avatar"
                            style="width: 36px; height: 36px;"
                            :src="imgUrl || require('@/assets/avatar.png')"
                            >
                        </el-avatar>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="personalData">个人资料</el-dropdown-item>
                            <el-dropdown-item command="management">工作台</el-dropdown-item>
                            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <span class="title"></span>
                </div>
            </slot>
        </section>
    </header>
</template>

<script>
import { removeAll, getUserInfo } from "@/utils/auth";
import { logout } from "@/api/login";

export default {
    name: "publicHeader",
    data() {
        return {
            imgUrl: "",
        }
    },
    watch: {
        $route() {
            this.imgUrl = getUserInfo().imgUrl;
        },
    },
    methods: {
        /**
         * 
         * 点击菜单项触发的事件回调	
         */
        handleCommand(command) {
            switch (command) {
                case "personalData":
                    this.personalData();
                    break;
                case "management":
                    this.management();
                    break;
                case "exit":
                    this.handleExit();
                    break;
                default:
                    break;
            }
        },

        /**
         * 
         * 点击个人资料
         */
        personalData() {
            this.$router.push({
                name: "personalData"
            });
        },

        /**
         * 
         * 点击工作台
         */
        management() {
            this.$router.push({
                name: "management"
            });
        },

        /**
         * 
         * 点击退出登录
         */
        handleExit() {
            this.$confirm('此操作将退出登录状态, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(!getToken()) {
                    removeAll();
                    this.$message.success('退出登录成功');
                    this.$router.push({ name: "login" });
                    return ;
                }

                logout().then(res => {
                    if(res.code === "200") {
                        removeAll();
                        this.$message.success('退出登录成功');
                        this.$router.push({ name: "login" });
                        return ;
                    }

                    // this.$message.warning(res.msg);
                });
            }).catch(() => {
                // no thing
            });
        }
    },
    created() {
        this.imgUrl = getUserInfo().imgUrl;
    }
}
</script>

<style lang="scss" scoped>
    .header {
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        margin-bottom: 20px;
        background: #FFFFFF;

        .container {
            width: 1200px;
            height: 100%;
            margin: 0px auto;
            position: relative;

            .left,
            .right {
                .title {
                    display: inline-block;
                    height: 70px;
                    margin-left: 10px;
                    font-size: 20px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #030303;
                    line-height: 70px;
                    vertical-align: middle;
                }

                .avatar,
                .logo {
                    vertical-align: middle;
                    cursor: pointer;
                }
            }

            .left {
                display: inline-block;
                height: 70px;
            }

            .right {
                height: 70px;
                position: absolute;
                top: 50%;
                right: 0px;
                transform: translateY(-50%);

                .avatar {
                    border-radius: 50%;
                }

                .title {
                    margin-left: 0px;
                }
            }
        }
    }
</style>