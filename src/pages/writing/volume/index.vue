<template>
    <div class="volume">
        <div class="volume-left">
            <div :class="['volume-left__item',volumeId == volume.volumeId?'activity':'']" @click='changeVolume(volume.volumeId)' v-for='volume in appVolumeList'>
                <div class="name">{{volume.title}}</div>
                <div class="des">
                    共{{volume.sortNum}}章
                </div>
            </div>
        </div>
        <div class="volume-con"></div>
    </div>
</template>
<script>
export default {
    name: "volume",
    data(){
        return {
            volumeId:'',
            bookId:'',
            appVolumeList:[]
        };
    },
    props: {
        
    },
    components: {
        
    },
    watch: {
        
    },
    methods: {
        changeVolume(){

        },
        getAppVolumeList(){
            this.$ajax({
                url: "/author/cms/volume/getAppVolumeListByBookId",
                method: 'get',
                data: {
                    bookId: this.bookId
                }
            }).then(res => {
                this.appVolumeList = res.data.data.appVolumeList;
                
            })

        }
    },
    created(){
        this.bookId = this.$route.params.bookId * 1;
        this.getAppVolumeList()
    }
}
</script>

<style lang="scss" scoped>
.volume{
    display: flex;
    .volume-left {
        background-color: #fff;
        padding: 10px 0;
        width: 245px;
        height: 802px;
        overflow: auto;
        margin-right: 20px;
        &__item {
            padding: 20px;
            color: #7b7b7b;
            &.activity {
                color: #3399fe;
                background: rgba(2, 103, 229, 0.05);
            }
            .name {
                font-size: 18px;
                font-weight: 400;
                line-height: 25px;
                margin-bottom: 10px;
            }
            .des {
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                vertical-align: middle;
                .el-icon-time {
                    font-size: 18px;
                    vertical-align: middle;
                }
            }
        }
    }
    .volume-con{
        flex:1;
    }
}
</style>