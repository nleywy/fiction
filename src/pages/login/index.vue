<template>
    <div style="height: 100%;">
        <public-header class="header">
            <div slot="right"></div>
        </public-header>

        <section class="container">
            
            <section class="block">
                <div class="phone">手机号</div>

                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="ruleForm">
                    <el-form-item prop="phone">
                        <el-input
                            class="cell"
                            type="text"
                            v-model="ruleForm.phone"
                            autocomplete
                            placeholder="手机号"
                            >
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="phoneCode">
                        <el-input
                            class="cell code"
                            v-model="ruleForm.phoneCode"
                            placeholder="验证码"
                            autocomplete
                            >
                        </el-input>

                        <el-button plain class="plain" @click="getCode" v-if="numTime === 60">发送验证码</el-button>
                        <el-button plain class="plain" disabled v-else><span class="b">{{ numTime }}</span>s后重新获取</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" class="submit" :loading="loading">手机号一键登录</el-button>
                    </el-form-item>

                    <div class="link">登录即代表同意<a href="http://" target="_blank" rel="noopener noreferrer">《用户服务协议》《隐私政策》《作
品合作基础协议》</a></div>
                </el-form>
            </section>

            <footer class="footer">版权信息  @ 2020 火文科技 版权所有 </footer>
        </section>

    </div>
</template>

<script>
import { login } from "@/api/authorCms";
import { mobileValidator } from "@/utils/rules";
import { setToken, setUserInfo } from "@/utils/auth";

export default {
    name: "login",
    components: {
        "public-header": () => import("@/components/header"),
    },
    data() {
        return {
            tipsCode: "发送验证码",
            loading: false,
            numTime: 60,
            timer: null,
            ruleForm: {
                phone: "",
                phoneCode: "",
            },
            rules: {
                phone: [
                    { validator: mobileValidator, trigger: 'blur' },
                    { required: true, message: '手机号码不能为空', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        /**
         * 
         * 登录前置验证
         */
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        /**
         * 
         * 登录接口
         */
        async login() {
            if(this.loading) {
                return ;
            }

            this.loading = true;

            const res = await login(this.ruleForm);

            if(res.code === "200") {
                const token = res.data.userInfo.token;
                setToken(token);
                setUserInfo(res.data.userInfo);
                this.$router.push("/works");
            }else {
                this.$message.warning(res.msg);
            }

            this.loading = false;
        },

        /**
         * 
         * 获取验证码
         */
        getCode() {
            this.timeout();
            // 请求验证码接口
        },

        timeout() {
            if(this.numTime <= 0) {
                this.numTime = 60;
                return 
            }else {
                setTimeout(() => {
                    --this.numTime;
                    this.timeout();
                }, 1000);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .header {
        background-color: transparent !important;
    }

    .container {
        box-sizing: border-box;
        width: 1200px;
        height: calc(100% - 120px);
        min-height: 745px;
        margin: 0px auto;
        padding-top: 5%;
        // margin-top: 125px;
        // margin-top: 5%;
        // text-align: center;
        // @include mixin-verticalCenter;
        text-align: right;
        // position: absolute;
        // top: 0px;
        // left: 50%;
        // transform: translateX(-50%);
        position: relative;

        .block {
            display: inline-block;
            box-sizing: border-box;
            width: 570px;
            height: 552px;
            padding-top: 70px;
            background: #FFFFFF;
            border-radius: 10px;

            .phone {
                width: 470px;
                height: 53px;
                margin: 0px auto;
                padding-bottom: 20px;
                font-size: 24px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #030300;
                line-height: 33px;
                text-align: center;
                border-bottom: 1px solid #D8D8D8;
            }

            .ruleForm {
                padding: 50px;

                & /deep/ .el-form-item {
                    margin-bottom: 30px;
                }

                .cell {
                    width: 100%;
                    height: 54px;
                    background: #FFFFFF;
                    border-radius: 5px;

                    & /deep/ .el-input__inner {
                        height: 54px;
                        font-size: 20px;
                    }
                }

                .cell.code {
                    width: 290px;
                    vertical-align: middle;
                }

                .plain {
                    width: 160px;
                    height: 54px;
                    margin-left: 470px - 290px -160px;
                    padding: 12px 0px;
                    font-size: 20px;
                    background: #FFFFFF;
                    border-radius: 5px;
                    text-align: center;
                    vertical-align: middle;

                    .b {
                        color: #FF2B29;
                    }
                }

                .submit {
                    width: 100%;
                    height: 54px;
                    font-size: 20px;
                    background: #3399FE;
                    border-radius: 5px;
                }

                .link {
                    width: 100%;
                    height: 56px;
                    font-size: 20px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #7B7B7B;
                    line-height: 28px;
                    text-align: left;

                    & a {
                        color: #3399FE;
                    }
                }
            }
        }
    }

    .footer {
        width: 100%;
        height: 28px;
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #7B7B7B;
        line-height: 28px;
        text-align: center;
        // position: absolute;
        // left: 0px;
        // bottom: 40px;
        position: absolute;
        left: 0px;
        bottom: 40px;
    }
</style>