<template>
    <el-form :model="account" :rules="rules" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
            <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="handleLogin" :loading="logining" >登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {requestLogin} from '../api/api'
    export default {
        data () {
            return {
                logining: false,
                account: {
                    username: 'test',
                    pwd: 'test'
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                checked: true
            }
        },
        methods: {
            handleLogin () {
                this.logining = true
                var loginParams = { username: this.account.username, password: this.account.pwd }
                console.log(this.account.username,this.account.pwd)
                requestLogin(loginParams).then(data => {
                    this.logining = false
                    console.log(data)
                    let { code, userid } = data
                    if (code === 200) {
                        // 登录成功，把用户信息保存在sessionStorage中
                        sessionStorage.setItem('userid', userid)
                        // 跳转到主界面
                        this.$router.push({ path: '/manage' })
                    } else {
                        this.$message({
                            message: '登录失败',
                            type: 'error'
                        })
                        // this.$router.push({ path: '/Register' })
                    }
                })
            }
        }
    }

</script>

<style>
    body{
        background: #DFE9FB;
    }
    .login-container{
        width:350px;
        margin-left:35%;
    }
</style>
