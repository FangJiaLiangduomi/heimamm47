<template>
  <el-dialog center title="新增学科" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" ref="form" :model="form">
      <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入新增学科接口
import { subjectAdd } from "@/api/subject";
export default {
  data() {
    return {
      // 对话框默认显示
      dialogFormVisible: false,
      //   表单绑定对象
      form: {},
      //   表单宽度
      formLabelWidth: "80px",
      rules: {
        rid: [{ required: true, message: "编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },

  methods: {
    doAdd() {
      // 表单验证
      this.$refs.form.validate(v => {
        if (v) {
          // alert('通过')
          // 验证通过调用新增学科接口数据
          // subjectAdd({
          // rid: this.form.rid,
          // name: this.form.name,
          // short_name: this.form.short_name,
          // intro: this.form.intro,
          // remark: this.form.remark
          // ...this.form
          // })
          // subjectAdd需要传入对象，而this.form也是对象，并且属性一样，所以可以直接传入this.form
          subjectAdd(this.form).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success("成功");
              // 关闭对话框
              this.dialogFormVisible = false;
              // 调用父组件方法刷新页面数据,第一页
              this.$parent.getList();
              this.$parent.page = 1;
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
