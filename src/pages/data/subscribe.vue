<template>
    <div class="subscribe">
        作品名称
        <el-select v-model="form.region" placeholder="请选择活动区域" style='width: 470px'>
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    name: "subscribe",
    data(){
        return {
            
        };
    },
    props: {
        
    },
    components: {
        
    },
    watch: {
        
    },
    methods: {
        
    },
    created(){
        
    }
}
</script>

<style lang="scss" scoped>
.subscribe{
    
}
</style>