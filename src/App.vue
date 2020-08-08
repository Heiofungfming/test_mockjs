<template>
    <div>
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="content" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="add()">添加</el-button>
          </el-form-item>
        </el-form>

          <el-table
          height="500"
            border
            style="width: 100%"
            :data="newsList">
            <el-table-column
              type="index">
            </el-table-column>
            <el-table-column
              label="图片"
              width="120px"
              >
             <template slot-scope="scope">
               <el-image
                :src="scope.row.img_url"
                align="center"></el-image>
             </template>
            </el-table-column>
            <el-table-column
              label="标题"
              prop="title"
              width="180px">
            </el-table-column>
            <el-table-column
              label="内容"
              prop="content">
            </el-table-column>
            <el-table-column
              label="时间"
              prop="add_time"
              width="180px">
            </el-table-column>
            <el-table-column label="操作" width="100px">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pageindex"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
    </div>  
</template>

<script>
import axios from 'axios'
 export default {
  components: {
  },
  // 定义属性
  data() {
    return {
      title:'',
      content:'',
      newsList:[],
      pageindex:1,
      total:0
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
      
  },
  // 监控data中的数据变化
  watch: {
      
  },
  // 方法集合
  methods: {
    add(){
      if (this.title.trim() === ''|| this.content.trim() === '') return alert('请填写新闻标题和内容')
        console.log(this.title,this.content)  
      axios.post('/api/add/news',{
        title: this.title,
        content: this.content
      }).then(res=>{
        console.log(res)
        this.getNewsList()
      }) 
    },
    getNewsList(){
        axios.get('/api/get/news',{
          params:{
            pageindex:this.pageindex,
            pagesize:10
          }
        }).then(res=>{
          this.newsList = res.data.list
          this.total = res.data.total
      })
    },
    handleDelete(id){
      axios.post('/api/delete/news',{
        id
      }).then(res=>{
        console.log(res);
        this.getNewsList()
      })
    },
    handleCurrentChange(newPage){
      this.pageindex = newPage
      this.getNewsList()
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
   this.getNewsList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
  },
}
</script>

<style lang="less" scoped>
  .el-image{
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
</style>