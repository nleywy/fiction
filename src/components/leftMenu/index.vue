<template>
    <div class='tags' v-if="!hideLeftMenu">
        <template v-for='tag in leftTags'>
            <div
                :class="[ 'tag', leftTagsactivity == tag.id ? 'activity' : '' ]"
                :key='tag.id'
                @click='changeRouter(tag.id)'
                >
                <!-- <el-image class="icon" :src="leftTagsactivity == tag.id ? tag.icon_active : tag.icon"></el-image> -->
                <span :class="[ 'icon', leftTagsactivity == tag.id ? tag.icon + '_active' : tag.icon ]"></span>
                <span class="title">{{tag.name}}</span>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: "leftMenu",
    components: {
        "public-header": () => import("@/components/header"),
    },
    data() {
        return {
            leftTagsactivity:'works',
            leftTags: [
                {
                    name:'作品管理',
                    id: 'works',
                    icon: "icon_management",
                },
                {
                    name:'数据中心',
                    id: 'subscribe',
                    icon: "icon_group",
                },
                {
                    name:'书籍明细',
                    id: 'books',
                    icon: "icon_info",
                }
            ],
        };
    },
    computed:{
        hideLeftMenu() {
            return this.$route.meta.hideLeftMenu;
        }
    },
    watch: {
        $route() {
            const find = this.leftTags.find(item => this.$route.path.includes(item.id));

            if(find) {
                this.setLeftTagsactivity(find.id);
            }
        }
    },
    methods: {
        setLeftTagsactivity(id) {
            this.leftTagsactivity = id;
        },
        changeRouter(id){
            if(this.leftTagsactivity === id) {
                return ;
            }
            this.setLeftTagsactivity(id);
            this.$router.push({ name: id });
        },
    },
    mounted() {
        const find = this.leftTags.find(item => this.$route.path.includes(item.id));

        if(find) {
            this.setLeftTagsactivity(find.id);
        }
    }
}
</script>

<style lang="scss" scoped>
    $base_url: "~@/assets/";

    .tags{
        display: inline-block;
        width: 184px;
        margin-right: 20px;
        background-color: #ffffff;
        vertical-align: top;
        font-size: 14px;
        cursor: pointer;
        user-select: none;

        .tag {
            height: 60px;
            color:#7B7B7B;
            line-height: 60px;
            text-align: center;

            &:hover,
            &.activity {
                color: #3399FE;
                background: rgba(2, 103, 229, 0.05);

                .icon_management {
                    background-image: url($base_url + "management_active.png");
                }

                .icon_group {
                    background-image: url($base_url + "group_active.png");
                }

                .icon_info {
                    background-image: url($base_url + "info_active.png");
                }
            }

            .title {
                display: inline-block;
                height: 60px;
                vertical-align: middle;
            }

            .icon {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-right: 12px;
                vertical-align: middle;
            }

            .icon_management {
                background-image: url($base_url + "management.png");
            }

            .icon_management_active {
                background-image: url($base_url + "management_active.png");
            }

            .icon_group {
                background-image: url($base_url + "group.png");
            }

            .icon_group_active {
                background-image: url($base_url + "group_active.png");
            }

            .icon_info {
                background-image: url($base_url + "info.png");
            }

            .icon_info_active {
                background-image: url($base_url + "info_active.png");
            }
        }
    }

</style>