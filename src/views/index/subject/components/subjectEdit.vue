<template>
  <el-dialog center title="编辑学科" :visible.sync="dialogFormVisible">
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
      <el-button type="primary" @click="doEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入编辑学科接口
import { subjectEdit } from "@/api/subject";
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
    // 确定按钮点击啊、事件
    doEdit() {
      // 调用编辑接口
      subjectEdit(this.form).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message.success("成功");
          // 关闭对话框
          (this.dialogFormVisible = false),
            // 刷新页面数据，第一页
            this.$parent.getList();
          this.$parent.page = 1;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style>
</style>
