<template>
    <div class="app">
        <div class='tags'>
            <div :class="['tag',leftTagsactivity==tag.id?'activity':'']" v-for='tag in leftTags' :key='tag.id' @click='changeRouter(tag.id)'>
                <span>{{tag.name}}</span>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "app",
    data() {
        return {

        };
    },
    props: {

    },
    computed:{
        leftTagsactivity () {
            return this.$store.state.leftTagsactivity
        },
        leftTags () {
            return this.$store.state.leftTags
        },
    },
    components: {

    },
    watch: {

    },
    methods: {
        changeRouter(id){
            this.activity = id;
            this.$router.push({
                name:id
            })
        },
        getMap(){
            this.$ajax({
                url: "/author/cms/enum/getMap",
                method: 'get'
            }).then(res => {
                let {enums} = res.data.data;
                enums.bookStateObj = {};
                enums.endStateObj = {};
                enums.weskitEnumObj = {};
                let {bookStateEnum,endStateEnum,weskitEnum} = enums;
                bookStateEnum.forEach((item)=>{
                    enums.bookStateObj[item.value] = item.text;
                })
                endStateEnum.forEach((item)=>{
                    enums.endStateObj[item.value] = item.text;
                })
                weskitEnum.forEach((item)=>{
                    enums.weskitEnumObj[item.value] = item.text;
                })
                this.$store.commit('change',enums)
            })
            
        },
        getBookClassifyListByParams(){
            this.$ajax({
                url: "/author/cms/classify/getBookClassifyListByParams",
                method: 'get'
            }).then(res => {
                this.$store.commit('change',{
                    classifyList:res.data.data.classifyList
                })
            })
        },
    },
    created() {
        this.getBookClassifyListByParams();
        this.getMap();
        this.$store.dispatch("enums/enumGetMap");
    }
}
</script>

<style lang="scss">
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
    width: 996px;
    margin: 20px auto 0;
    // border: 1px solid #ccc;
    font-size: 20px;
    position: relative;
    .tags{
        position: absolute;
        background-color: #fff;
        width: 184px;
        top: 0px;
        left: -204px;
        display: inline-block;
        .tag{
            height: 68px;
            color:#7B7B7B;
            line-height: 68px;
            text-align: center;
            &.activity{
                
                color: #3399FE;
                background: rgba(2, 103, 229, 0.05);
            }
        }
    }
}
</style>