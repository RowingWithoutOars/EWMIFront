<template>
    <div>
        <h2>上传文件命名：需要在名字中指明是密度数据还是生物量数据还是水质数据</h2>

        <el-upload
            class="upload-demo"
            action="http://47.101.213.106:8080/EWMIS/data/excel/import"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                fileList: []
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>
