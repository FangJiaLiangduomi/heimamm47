<template>
  <!-- 注册对话框 -->
  <el-dialog width="603px" center title="用户注册" :visible.sync="dialogFormVisible">
    <el-form ref="regForm" :model="form" :rules="rules">
      <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
        <!-- 上传文件的key，默认是叫file，可以通过name属性修改 -->
        <!-- 请求接口参数key为image，为了匹配接口的参数，所有这里的key也要改为image -->
        <!-- 头像表单元素没有值，检测验证不能通过，图片上传后能看到图片是因为img这个标签有值，但是表单元素没有值，所有给表单绑定一个值 -->
        <el-upload
          v-model="form.avatar"
          name="image"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth" prop="imgCode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="img_code" @click="getNewCode" :src="picCodeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 倒计时不为0禁用按钮 -->
            <el-button
              @click="getPhoneCode"
              :disabled="sec != 0"
            >{{sec == 0 ? "获取用户验证码" : "还有" + sec + "秒"}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
      <el-button type="primary" @click="doRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from 'axios'
// 传入封装了接口的方法
// import { sendSMS } from "../../../api/register";
// vue提供@关键字，使用@关键字来简化路径的导入 @代表的是/src这个目录
import { sendSMS,register } from "@/api/register";

export default {
  data() {
    return {
      // 对话框是否显示
      dialogFormVisible: false,
      formLabelWidth: "65px",
      // 图形验证码的接口地址
      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 控制按钮是否禁用，true为禁用
      // btnDisabled: false,
      // 获取验证码按钮的倒计时
      sec: 0,
      // 上传后的图片临时路径
      imageUrl: "",
      // 要上传图片的接口地址
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      // 表单元素双向绑定的对象
      form: {
        // 名字
        name: "",
        // 邮箱
        email: "",
        // 手机号
        phone: "",
        // 密码
        password: "",
        // 图形验证码
        imgCode: "",
        // 头像
        avatar: "",
        // 手机验证码
        rcode: ""
      },
      // 规则对象
      rules: {
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],

        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          // 正则表达式，检测用户输入格式是否正确
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],

        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "号码格式不正确",
            trigger: "blur"
          }
        ],

        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 14, message: "长度在5到14之间", trigger: "blur" }
        ],
        // 头像文件上传检测，这里的trigger不能是失去焦点，而是应该判断是否有值
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],

        imgCode: [
          { required: true, message: "图片验证码不能为空", trigger: "blur" },
          // {min: 4, max: 4, message: "图片验证码只能是4位数", trigger:"blur"}
          // len就是用来限制长度的
          { len: 4, message: "图片验证码只能是4位数", trigger: "blur" }
        ],

        rcode: [
          { required: true, message: "手机验证码不能为空", trigger: "blur" },
          // {min: 4, max: 4, message: "手机验证码只能是4位数", trigger:"blur"}
          { len: 4, message: "手机验证码只能是4位数", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 验证图片点击事件
    getNewCode() {
      // 浏览器缓存机制，已经请求一次后再次请求，浏览器不会再去请求，而是把上次请求的结果再次拿出来
      // 解决方案  1随机数（用的少） 时间戳（用的多）
      // this. picCodeUrl = process.env.VUE_APP_URL + "/captcha?type=sendsms"
      //  this. picCodeUrl = process.env.VUE_APP_URL + "/captcha?type=sendsms$aa=" + Math.random()
      this.picCodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&aa=" + Date.now();
    },
    // 获取手机验证码点击事件
    getPhoneCode() {
      // 按钮被点击后，按钮的状态切换为不能点击
      // this.btnDisabled = true;

      // 判断手机号格式是否正确，在这里判断，会比在点击按钮获取接口时候判断减少服务器压力
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
        // 提示用户手机号格式不正确
        this.$message.error("手机号码格式不正确");
        return;
      }

      if (this.form.imgCode.length != 4) {
        // 提示用户验证码长度不正确
        // this.$message.error('验证码长度不正确')
        // return;
        // 企业中一般会直接写在一起
        return this.$message.error("验证码长度不正确");
      }

      // 按钮倒计时时间为60秒
      this.sec = 60;
      // 计时器一定要啊写箭头函数，不写箭头函数，里面this的指向就是window
      let timerID = setInterval(() => {
        this.sec--;
        // 如果计时器为0，就停止倒计时
        if (this.sec == 0) {
          clearInterval(timerID);
        }
      }, 1000);
      // 下载导入axios，发送请求获取手机验证码
      // axios如果发送跨域请求，默认不会携带cookie
      // axios({
      //   url: process.env.VUE_APP_URL + "/sendsms",
      //   method: "post",
      //   data: {
      //     code: this.form.imgCode,
      //     phone: this.form.phone
      //   },
      //   // 允许携带cookie
      //  withCredentials:true
      // }).then(res=>{
      //     window.console.log(res);
      //     // 获取验证码成功
      //     if(res.data.code == 200){
      //       // alert("获取验证码成功，验证码为" + res.data.data.captcha)
      //       // element优化消息提示框
      //      this.$message.success("获取验证码成功，验证码为" + res.data.data.captcha)
      //     }else{
      //       // alert(res.data.message)
      //       this.$message.error(res.data.message);
      //       // 验证码接口 http://183.237.67.218:3002
      //     }
      //   })

      // 调用接口的对象就可以了
      sendSMS({
        code: this.form.imgCode,
        phone: this.form.phone
      }).then(res => {
        window.console.log(res);
        // 获取验证码成功
        if (res.data.code == 200) {
          // alert("获取验证码成功，验证码为" + res.data.data.captcha)
          // element优化消息提示框
          this.$message.success(
            "获取验证码成功，验证码为" + res.data.data.captcha
          );
        } else {
          // alert(res.data.message)
          this.$message.error(res.data.message);
          // 验证码接口 http://183.237.67.218:3002
        }
      });
    },
    // 头像上传部分，上传成功调用的钩子
    handleAvatarSuccess(res, file) {
      // res就是响应体
      // file里有上传成功后的图片信息
      // 把图片转换成临时路径（页面一刷新就没有了），给了imgUrl
      // 此时img标签有值，但是avatar没有值
      this.imageUrl = URL.createObjectURL(file.raw);
      // 图片上传成功后还要给avatar赋值,手动来赋值才让他有值得，没有时间重新校验，值应该为服务器上的路径file_path（永久路径）而不是img临时路径的值
      this.form.avatar = res.data.file_path;
      // 这个时候我们要用element里单独对某个属性校验的方法来校验头像
      this.$refs.regForm.validateField("avatar");
    },
    // 上传之前调用的钩子
    // 作用：对上传文件做判断，成功才上传，否则给错误提示
    // 参数file，就是我们选择的那个文件对象
    beforeAvatarUpload(file) {
      // 判断上传的文件类型
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      // 判断文件大小
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像的文件只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // 如果满足格式要求，又满足了大小要求
      // 这里就会返回true，true代表上传这个图片
      // 如果返回false就代表有一个不满足，那么不会上传
      return isJPG && isLt2M;
    },

    doRegister() {
      // 要找到表单对象，就得先给表单加ref属性
      this.$refs.regForm.validate(v => {
        // validate 方法 整个表单的验证
        if (v) {
          // alert("通过");
          register({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            // window.console.log(res);
            if(res.data.code == 200){
              // 注册成功。关闭对话框
              this.$message.success("注册成功");
              this.dialogFormVisible = false;
              // element重置，重置表单,头像图片没有被重置，因为头像图片不是表单元素，所有要给img的url设置为空
              this.$refs.regForm.resetFields();
              this.imageUrl = "";
            }else{
              // 注册失败，把问题显示出来
              this.$message.error(res.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
/* 表单标题部分背景颜色渐变 */
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
}
// 标题字体颜色
.el-dialog__title {
  color: white;
  font-size: 17px;
}
// 验证码图片设置同盒子大小一致
.img_code {
  width: 100%;
  height: 41px;
  // 图片水平位置同行内其他元素一致
  vertical-align: top;
}

// 头像上传部分加号框居中显示
.avatar-uploader {
  text-align: center;
}
// 头像上传部分样式
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
