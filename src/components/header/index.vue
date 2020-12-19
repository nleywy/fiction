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
                        class="logo"
                        style="width: 24px; height: 24px;margin-right: 50px;"
                        :src="require('@/assets/pc.png')"
                        >
                    </el-image>

                    <el-dropdown trigger="click" @command="handleCommand">
                        <el-avatar
                            class="avatar"
                            style="width: 36px; height: 36px;"
                            :src="url || require('@/assets/avatar.png')"
                            >
                        </el-avatar>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人资料</el-dropdown-item>
                            <el-dropdown-item>工作台</el-dropdown-item>
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
import { removeToken, removeUserInfo } from "@/utils/auth";

export default {
    name: "publicHeader",
    data() {
        return {
            url: "",
        }
    },
    methods: {
        /**
         * 
         * 点击菜单项触发的事件回调	
         */
        handleCommand(command) {
            switch (command) {
                case "exit":
                    this.handleExit();
                    break;
            
                default:
                    break;
            }
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
                removeToken();
                removeUserInfo();
                this.$message({
                    type: 'success',
                    message: '退出登录成功'
                });

                this.$router.push("/login");
            }).catch(() => {
                // no thing
            });
        }
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