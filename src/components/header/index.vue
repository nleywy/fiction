<template>
    <header class="header">
        <section class="container">
            <div class="left">
                <el-image
                    class="logo"
                    style="width: 66px; height: 52px"
                    :src="url"
                    >
                </el-image>
                <span class="title">作者中心</span>
            </div>

            <slot name="right">
                <div class="right">
                    <el-image
                        class="logo"
                        style="width: 32px; height: 20px;margin-right: 50px;"
                        :src="url"
                        >
                    </el-image>

                    <el-dropdown trigger="click">
                        <el-avatar
                            class="avatar"
                            style="width: 44px; height: 44px;"
                            :src="url"
                            >
                        </el-avatar>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人资料</el-dropdown-item>
                            <el-dropdown-item>工作台</el-dropdown-item>
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <span class="title"></span>
                </div>
            </slot>
        </section>
    </header>
</template>

<script>
export default {
    name: "publicHeader",
    data() {
        return {
            url: "",
        }
    }
}
</script>

<style lang="scss" scoped>
    .header {
        box-sizing: border-box;
        width: 100%;
        height: 100px;
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
                    height: 100px;
                    margin-left: 20px;
                    font-size: 24px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #030303;
                    line-height: 100px;
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
                height: 100px;
            }

            .right {
                height: 100px;
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