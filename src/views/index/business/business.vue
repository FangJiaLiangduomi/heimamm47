<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="rid">
          <el-input class="short" v-model="formInline.rid"></el-input>
        </el-form-item>

        <el-form-item label="企业名称" prop="name">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>

        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select class="normal" v-model="formInline.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSear">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showAdd">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面卡片 -->
    <el-card class="box-card">
      <!-- 
            data属性指定表格的数据源，简单来说就是设置表格显示哪些数据
      -->
      <el-table :data="tableData" style="width: 100%">
        <!-- el-table-column设置表格的一列，写几个就有几列 -->
        <!-- label属性设置这一列的列名 -->
        <!-- prop是用来控制这一列显示什么属性 -->
        <el-table-column type="index" label="序号" width="50"></el-table-column>

        <el-table-column prop="eid" label="企业编号"></el-table-column>

        <el-table-column prop="name" label="企业名称"></el-table-column>

        <el-table-column prop="username" label="创建者"></el-table-column>

        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            <!-- 创建日期用全局过滤器显示 -->
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态">
          <!-- 自定义页 -->
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeStatus(scope.row)">{{ scope.row.status === 1 ? '禁用' : '启用' }}</el-button>
            <el-button type="text" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- 
            current-page：设置当前页是第几页
            page-sizes：这是设置可以选择的页容量(每页显示多少条)
            page-size：这是设置当前页容量是几
            layout：设置分页的布局效果,我们一般不会改这个属性
            total：设置数据总条数（数据的总数量）
            现在还有没有必要自己设置页数，没必要了
            为什么呢？因为饿了么UI的分页，会自动根据你的总条数和你选择的页容量，去计算出一共有多少页

            size-change：页容量改变的事件
                            只要页容量改变就触发
            current-change：当前页发生改变的事件
                            只要当前页码发生改变就触发

            background加上就会有灰色的背景色
      -->
      <el-pagination
        background
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 新增对话框组件 -->
    <!-- <business-add ref="businessAdd"></business-add> -->
    <!-- 编辑对话框 -->
    <!-- <business-edit ref="businessEdit"></business-edit> -->

    <business-dialog ref="businessDialog"></business-dialog>
  </div>
</template>

<script>
// 导入封装企业列表接口
import { businessList,businessRemove,businessStatus } from "@/api/business/";
// 导入新增对话框组件
// import businessAdd from "./components/businessAdd";
// 导入编辑对话框组件
// import businessEdit from "./components/businessEdit";
// 导入新增编辑对话框
import businessDialog from './components/businessDialog'

export default {
  // 设置name，方便浏览器调试
  name: "business",

  // 注册
  components: {
    // businessAdd,
    // businessEdit,
    businessDialog
  },

  data() {
    return {
      formInline: {},
      tableData: [],
      page: 1,
      size: 5,
      total: 0,
      oldItem: null,
    };
  },

  methods: {
    // 获取企业列表的方法
    getList() {
      businessList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        console.log(res);
        // 数据
        this.tableData = res.data.data.items;
        // 列表总数量
        this.total = res.data.data.pagination.total;
      });
    },

    // 编辑按钮点击事件
    showEdit(item) {
      console.log(item);
      // 显示编辑对话框
      this.$refs.businessDialog.dialogFormVisible = true;
      // 将对话框的isAdd改为false
      this.$refs.businessDialog.isAdd = false;

      // 对象之间赋的值是地址，一个对象里面的值改变了，另一个也会改变,现象，在编辑对话框进行编辑的时候，页面上的数据也会一起进行更改
      // this.$refs.editDialog.form = item;
      // 方法：拷贝一个对象，对象里的数据一样，但是地址却不一样，对话框再进行编辑就不会出现页面同步修改的情况   拷贝对象：{...item}解构赋值对象
      // this.$refs.editDialog.form = { ...item };

      // if (this.isFirst == true) {
      //   // 这行的数据赋值给对话框
      //   this.$refs.editDialog.form = { ...item };
      //   this.isFirst = false;
      // }else{
      //   // 不是第一次点击就不重新赋值，对话框原来是什么再次点开还是什么
      //   // 问题,如果第二次点开的是其他行，对话框保留的还是第一次点开的数据
      // }

      // 如果第二次点开的是同一行，就保留上传编辑的数据，如果点开的是其他行。那就需要把其他行的数据覆盖到对话框，
      // 判断点击编辑的这次是不是上次点的同一行，是就不覆盖对话框，不是就覆盖
      // 如果item（这次点击的数据）不是上次点的那行数据
      if(item != this.oldItem){
         // 那么将这行的数据赋值给对话框
        this.$refs.businessDialog.form = { ...item };
        // 并且把记录的上一行数据改成当前行的数据
        this.oldItem = item;
      }
    },

    // 新增按钮点击事件
    showAdd(){
      // 显示对话框
      this.$refs.businessDialog.dialogFormVisible = true;
      // 将对话框isAdd改为true显示新增对话框
      this.$refs.businessDialog.isAdd = true;
      // 清空表单数据
      this.$refs.businessDialog.form= {};
    },

    // 搜索按钮点击事件
    doSear(){
      this.page = 1;
     this.getList();
    },

    // 清除按钮点击事件
    clear(){
      // 调用表单重置方法
      this.$refs.formInline.resetFields();
      // 重新发送请求刷新页面,从第一页开始
      this.page = 1;
      this.getList();
    },

    // 页码改变事件 page：改变后的页码
    pageChange(page) {
      // console.log(page);
      // 切换后的页码赋值给this.page属性,这样再去请求数据就是切换后的数据
      this.page = page;
      // 根据新的页码重新请求数据
      this.getList();
    },

    // 页容量改变事件，size:改变后的页容量
    sizeChange(size) {
      // console.log(size);
      // 赋值为改变后的容量
      (this.size = size),
        // 页容量改变，都应该从第一页重新请求显示,不然没在第一页去改变页容量可能会有显示空白的情况
        (this.page = 1);
      // 根据最新页容量去请求数据
      this.getList();
    },

    // 删除按钮点击事件
    remove(item){
      // console.log(item);
      businessRemove({
        id: item.id
      }).then(res => {
        // console.log(res);
        if(res.data.code == 200){
          this.$message.success('删除成功');

          // 如果当前页只有一条数据，刷新上一页
          if(this.tableData.length == 1){
            // 将page当前页改为上一页
            this.page--;
          }
          // 在极端的情况下，删除了整个页面的最后一条数据，此时当前页面改成0页，再新增数据，虽然页面能正常显示，但是数据上是在第0页显示的，会有矛盾，所以要多加一条判断
          if(this.page == 0){
            this.page = 1;
          }
          // 刷新页面
          this.getList();
        }else{
          this.$message.error(res.data.$message);
        }
      })
    },

    // 修改状态的点击事件
    changeStatus(item) {
      // console.log(item);

      businessStatus({
        id: item.id
      }).then(() => {
        //刷新表格界面
        //刷新表格其实就是对表格数据重新请求
        this.getList();
      });
    },
  },

  created() {
    // 获取企业列表数据
    this.getList();
  }
};
</script>

<style>
.box-card {
  margin-bottom: 19px;
}

.short {
  width: 100px;
}

.normal {
  width: 149px;
}
</style>
