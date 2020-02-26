<template>
  <!-- 大容器，不管用什么布局，都是被el-container包住 -->
  <el-container class="my-container">
    <!-- 头部盒子 -->
    <el-header class="my-header">
      <!-- 左边部分 -->
      <div class="left">
        <i @click="isCollapse = !isCollapse" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        <img src="./images/images.png" alt />
        <span>黑马面面</span>
      </div>
      <!-- 右边部分 -->
      <div class="right">
        <img :src="avatar" alt />
        <span class="user">{{username}},你好</span>
        <el-button @click="doLogout" type="primary" size="mini">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左边盒子 -->
      <!-- width="auto" 盒子宽度根据盒子内容宽度而改变 -->
      <el-aside class="my-aside" width="auto">
        <!-- default-active="2"默认选中的菜单  router属性为true，开启路由模式，点击菜单会进行路由跳转-->
        <el-menu :collapse="isCollapse" router default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          
          <el-menu-item index="/index/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
          
        </el-menu>

      </el-aside>
      <!-- 右边盒子 -->
      <el-main class="my-main">
          <!-- 路由出口 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入接口
import { info, logout } from "@/api/index.js";
// 导入操作删除token的工具
import { removeToken } from "@/utilis/token.js";

export default {
  data() {
    return {
      // 用户名
      username: "",
      //   用户头像
      avatar: "",
    //   字体图标属性，点击控制左边盒子列表的展开与折叠
      isCollapse: false
    };
  },

  methods: {
    //   点击退出按钮事件
    doLogout() {
      //   element弹窗
      this.$confirm("即将退出本系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //   发请求
          logout().then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success("退出成功");
              // 删除本地token
              removeToken();
              // 跳转到登录页面
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },

  // 在生命周期created中调用接口
  created() {
    // 调用获取用户信息接口
    info().then(res => {
      console.log(res);
      this.username = res.data.data.username;
      // 注意 接口返回的头像路径不是完整的路径，还有在前面拼接基地址，并且拼接的时候，中间不能忘了加个/
      this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    });
  }
};
</script>

<style lang=less>
.my-container {
  height: 100%;

  .my-header {
    height: 60px;
    /* 给里面两个子盒子同行且居中显示 */
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      height: 100%;

      i {
        font-size: 24px;
        margin-right: 22px;
      }

      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }

      span {
        width: 92px;
        height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }

    .right {
      height: 100%;
      display: flex;
      align-items: center;

      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }

      span.user {
        font-size: 14px;
        margin-right: 30px;
      }
    }
  }

  /* .my-aside {
    background-color: yellow;
  } */
  /* 导航菜单展开折叠动画平滑 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .my-main {
    background-color: blue;
  }
}
</style>
