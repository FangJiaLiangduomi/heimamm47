<template>
  <el-dialog
    center
    width="477px"
    :title="isAdd ? '新增用户' : '编辑用户'"
    :visible.sync="dialogFormVisible"
  >
    <el-form :rules="rules" ref="form" :model="form">
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="角色" prop="role" :label-width="formLabelWidth">
        <el-select @change="form.role_id = form.role" v-model="form.role" placeholder="请选择角色">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入接口
import { userAdd,userEdit } from "@/api/user";

export default {
  name: "userDialog",
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "80px",
      // 默认表单属性，true为新增
      isAdd: true,

      //   表单验证规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],

        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            patern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式错误",
            trigger: "blur"
          }
        ],

        phone: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          {
            patern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "号码格式错误",
            trigger: "blur"
          }
        ],

        role: [
          { required: true, message: "角色不能为空", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    // 对话框确定按钮点击事件
    save() {
      //   表单验证
      this.$refs.form.validate(v => {
        if (v) {
          //   判断isAdd属性来显示对话框
          if (this.isAdd) {
            userAdd(this.form).then(res => {
              //   console.log(res);
              if (res.data.code == 200) {
                this.$message.success("成功");
                //   关闭对话框
                this.dialogFormVisible = false;
                this.$parent.page = 1;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            userEdit(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success("修改成功");
                this.dialogFormVisible = false;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>
