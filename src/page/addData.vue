<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <header class="form_header">添加数据 </header>
                <el-form :model="dataForm" ref="dataForm" label-width="110px" class="form data _form">
                    <el-form-item label="采样点" prop="name">
                        <el-input v-model="dataForm.cyd"></el-input>
                    </el-form-item>
                    <el-form-item label="采样时间" prop="activity">
                        <el-input v-model="dataForm.sxkey"></el-input>
                    </el-form-item>
                    <el-form-item label="生物" prop="description">
                        <el-input v-model="dataForm.jcd_time"></el-input>
                    </el-form-item>
                    <el-form-item label="生物数量">
                        <el-input v-model="dataForm.number"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addData('dataForm')">确认添加</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getCategory, addCategory, addFood} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
        data(){
            return {
                dataForm: {
                    cyd: '',
                    jcd_time: '',
                    sxkey: '',
                    number: 0,
                },
            }
        },
        components: {
            headTop,
        },
        computed: {
            selectValue: function (){
                return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
            }
        },
        methods: {
            updateData(dataForm){
                this.$refs[dataForm].validate(async (valid) => {
                    if (valid) {
                        const params = {
                            ...this.dataForm,
                        }
                        try{
                            const result = await addFood(params);
                            if (result.status == 1) {
                                console.log(result)
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.dataForm = {
                                    cyd: '',
                                    jcd_time: '',
                                    sxkey: '',
                                    number: 0,
                                }
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: result.message
                                });
                            }
                        }catch(err){
                            console.log(err)
                        }
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .form{
        min-width: 400px;
        margin-bottom: 30px;
        &:hover{
            box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
            border-radius: 6px;
            transition: all 400ms;
        }
    }
    .food_form{
        border: 1px solid #eaeefb;
        padding: 10px 10px 0;
    }
    .form_header{
        text-align: center;
        margin-bottom: 10px;
    }
    .category_select{
        border: 1px solid #eaeefb;
        padding: 10px 30px 10px 10px;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
    }
    .add_category_row{
        height: 0;
        overflow: hidden;
        transition: all 400ms;
        background: #f9fafc;
    }
    .showEdit{
        height: 185px;
    }
    .add_category{
        background: #f9fafc;
        padding: 10px 30px 0px 10px;
        border: 1px solid #eaeefb;
        border-top: none;
    }
    .add_category_button{
        text-align: center;
        line-height: 40px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        border: 1px solid #eaeefb;
        border-top: none;
        transition: all 400ms;
        &:hover{
            background: #f9fafc;
            span, .edit_icon{
                color: #20a0ff;
            }
        }
        span{
            .sc(14px, #999);
            transition: all 400ms;
        }
        .edit_icon{
            color: #ccc;
            transition: all 400ms;
        }
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .cell{
        text-align: center;
    }
</style>
