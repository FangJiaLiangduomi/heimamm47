<template>
  <div class="login-wrap">
    <!-- 左侧登录的盒子 -->
    <div class="login-box">
      <!-- 标题盒子 -->
      <div class="title-box">
        <!-- logo -->
        <img class="logo" src="./images/logo.png" alt />
        <span class="left-title">黑马面面</span>
        <!-- 竖线 -->
        <span class="line"></span>
        <span class="right-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form :model="form" ref="loginForm" label-width="43px" :rules="rules">
        <!-- 号码框 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 密码框 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <!-- 验证码框 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.code"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="code" @click="changeImgCode" :src="imgUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item prop="agree">
          <!-- 解决多选复选框文字全部变颜色问题 -->
          <div class="sgree-dbox" style="display:flex;align-items:center">
            <el-checkbox class="agree-box" v-model="form.agree"></el-checkbox>
            <span class="agree">
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </span>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="box-button" type="primary" @click="doLogin">登录</el-button>
          <el-button class="box-button" @click="showReg" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="./images/login_banner_ele.png" alt />
    <!-- 使用对话框组件 -->
    <reg ref="reg"></reg>
  </div>
</template>

<script>
// 导入对话框组件
import reg from './components/register'
// 导入封装登陆接口方法的地址
import { login } from '@/api/login.js'
// 导入封装保存token的方法地址
import { setToken } from '@/utilis/token.js'

export default {
  components:{
    // 注册对话框组件
    reg
  },
  data() {
    return {
      // 验证码图片地址
      imgUrl: process.env.VUE_APP_URL + "/captcha?type=login",
      // 表单双向绑定的数据
      form: {
        phone: "18511111111",
        password: "12345678",
        code: "",
        agree: true,
      },
      // 规则对象
      rules: {
        // 规则
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        // 解决多选用户协议通过验证问题
        agree: [
          // {
          //   // trigger: "change"多选框没有失去焦点，只有值改变事件
          //   // checkbox不可能为空，除非赋值为空，在data里，我们给agree赋值为"",""为true，true是值，所以我们不能拿值是否为空来做判断
          //   required: true, message: "必须勾选同意用户协议", trigger: "change"},
          
          // 正则表达式，只有值为true才满足条件，否则不匹配
          // 在data里给agree赋值为flase，或者和上面代码一起运行解决问题
           { pattern:/true/,message:"必须勾选同意用户协议",trigger:"change"
          }
        ]
      }
    };
  },
  methods: {
    // 登录按钮点击事件
    doLogin() {
      // 找到表单对象，调用validate方法
      this.$refs.loginForm.validate(v => {
        if (v) {
          // alert("通过");
          // 发送接口请求
          login({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.code
          }).then(res=>{
            // console.log(res);
            if(res.data.code == 200){
              // 把token存起来
              // window.localStorage.setItem('token',res.data.data.token);
              setToken(res.data.data.token);
              // 显示登陆成功提示（可能会因为账号被禁用而被导航守卫拦截下来，会出现两条提示），所以不能在这里提示，而在导航守卫提示
              // this.$message.success('登陆成功');
              // 跳转到登陆页面
              this.$router.push('./index');
            }else{
              // 跳转失败的错误提示
              this.$message.error(res.data.message)
            }
          })
        }
      });
    },
    // 点击注册按钮弹出对话框
    showReg(){
      this.$refs.reg.dialogFormVisible = true;
    },
    // 验证按点击事件
    changeImgCode(){
      // 加时间戳解决图片缓存问题
     this.imgUrl = process.env.VUE_APP_URL + "/captcha?type=login&aa=" + Date.now();
    }
  }
};
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  // 主轴排列
  justify-content: space-around;
  // 侧周排列
  align-items: center;
  .login-box {
    width: 478px;
    height: 550px;
    padding-right: 41px;
    // 内减盒子，解决加了外边距而撑开父盒子的问题
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);

    .title-box {
      display: flex;
      // 侧轴居中
      align-items: center;
      margin-top: 50px;
      margin-left: 48px;
      margin-bottom: 29px;

      .logo {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }

      .left-title {
        margin-right: 14px;
        font-size: 22px;
      }

      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }

      .right-title {
        font-size: 21px;
      }
    }
    // 验证码图片与盒子大小一致
    .code {
      width: 100%;
      height: 42px;
      // 解决内容因图片与基线对齐而被撑开的问题
      vertical-align: top;
    }
    // 多选框与用户协议普通文字、链接文字水平一致
    .agree-box,
    .agree {
      display: flex;
      align-items: center;
    }
    // 登录按钮同父盒子一样大
    .box-button {
      width: 100%;

      &:nth-child(2) {
        margin-left: 0;
        margin-top: 26px;
      }
    }
  }
}
</style>
