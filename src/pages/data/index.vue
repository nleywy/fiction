<template>
    <div class="data">
        <page-book-header>
            <div
                slot="left"
                :class="['tag',activity==tag.key?'activity':'']"
                v-for='tag in dataTitles'
                :key='tag.key'
                @click='changeRouter(tag)'
                >
                <span>{{tag.value}}</span>
            </div>
        </page-book-header>

        <transition name="fade-transform" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>
<script>
export default {
    name: "dataCenter",
    components: {
        "page-book-header": () => import('@/components/pageBookHeader/index.vue'),
    },
    data(){
        return {
            dataTitles: [
                {
                    value: '订阅统计',
                    key: '1',
                    path: "/data/subscribe",
                },
                {
                    value: '投票统计',
                    key: '2',
                    path: "/data/vote",
                },
                {
                    value: '更新统计',
                    key: '3',
                    path: "/data/update",
                },
            ],
            activity: '1',
        };
    },
    methods: {
        /**
         * 
         * 点击 tag 切换路由地址
         */
        changeRouter(tag){
            this.activity = tag.key;
            if(this.$route.path !== tag.path) {
                this.$router.push(tag.path);
            }
        },
    },
    created(){
        const find = this.dataTitles.find(item => item.path === this.$route.path);

        if(find) {
            this.activity = find.key;
        }
    }
}
</script>

<style lang="scss" scoped>
    .data{
        width: 100%;
        height: 100%;
        padding-bottom: 100px;
        background-color: #ffffff;

        .tag {
            display: inline-block;
            margin-right: 40px;
            font-size: 22px;
            font-weight: 500;
            color: #7B7B7B;
            line-height: 30px;
            cursor: pointer;
            user-select: none;

            &.activity,
            &:hover
            {
                color: #3399FE;
            }
        }
    }
</style>