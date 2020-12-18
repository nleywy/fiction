<template>
    <div>
        <public-header />
        
        <section class="app">
            <div class='tags' v-if="!hideLeftMenu">
                <template v-for='tag in leftTags'>
                    <div :class="[ 'tag', leftTagsactivity == tag.id ? 'activity' : '' ]" :key='tag.id' @click='changeRouter(tag.id)'>
                        <span>{{tag.name}}</span>
                    </div>
                </template>
            </div>
            <div class="container" :style="{ width: !hideLeftMenu ? '996px' : '1200px' }">
                <transition name="fade-transform" mode="out-in">
                    <router-view @hook:mounted="handleHookMounted"></router-view>
                </transition>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "layout",
    components: {
        "public-header": () => import("@/components/header"),
    },
    data() {
        return {

        };
    },
    props: {

    },
    computed:{
        leftTagsactivity() {
            return this.$store.state.leftTagsactivity;
        },
        leftTags() {
            return this.$store.state.leftTags;
        },
        hideLeftMenu() {
            return this.$route.meta.hideLeftMenu;
        }
    },
    methods: {
        changeRouter(id){
            if(this.leftTagsactivity === id) {
                return ;
            }

            this.$store.commit("SET_LEFT_TAGSACTIVITY", id);
            this.$router.push({ name: id });
        },
        handleHookMounted() {
            const find = this.leftTags.find(item => this.$route.path.includes(item.id));

            if(find) {
                this.$store.commit("SET_LEFT_TAGSACTIVITY", find.id);
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .app {
        // padding: 30px;
        // width: 996px;
        // margin: 20px auto 0;
        // border: 1px solid #ccc;
        width: 1200px;
        margin: 0px auto;
        font-size: 0px;
        position: relative;


        .tags{
            display: inline-block;
            width: 184px;
            margin-right: 20px;
            background-color: #ffffff;
            vertical-align: top;
            font-size: 20px;
            cursor: pointer;
            user-select: none;

            .tag {
                height: 68px;
                color:#7B7B7B;
                line-height: 68px;
                text-align: center;

                &:hover,
                &.activity {
                    color: #3399FE;
                    background: rgba(2, 103, 229, 0.05);
                }
            }
        }

        .container {
            display: inline-block;
            width: 996px;
            vertical-align: top;
            font-size: 20px;
        }
    }
</style>