<template>
  <div class="box">
      <!-- 轮播图 -->
      <div class="swiper">
          <van-swipe class="my-swipe" @change="change" :initial-swipe="inde" ref="swipe" :show-indicators="false">
            <van-swipe-item v-for="(item,index) in ListContent" :key="index" @change="change">
                <div class="top-img">
                    <!-- 图片 -->
                    <!-- <img  alt=""> -->
                    <van-image  :src="Content.image" fit="cover"></van-image>
                    <!-- 底部渐变模糊 -->
                  <div class="footer">
                      <div class="img"  :style="{
                      background: '#' + item.image_hue.substr(2, 8) + 'd5',
                      background: `
                      linear-gradient(0,#${item.image_hue.substr(2, 8)},#${item.image_hue.substr(2, 8)}e6,#${item.image_hue.substr  (2, 8)}00)`,
                      }">
                  </div>
            </div>
                    <!-- 图片标题 -->
                    <div class="title">{{Content.title}}</div>                  
                </div>
                <!-- 黑夜 -->
                <div class="content-top" v-html="html" v-if="dayOrnight == '#000000'"></div> 
                <!-- 白天 -->
                <div class="content-top" v-html="html" v-else></div> 
            </van-swipe-item>  
          </van-swipe>
      </div>
      
      <!-- 底部操作栏 -->
      <div class="bottom" v-if="EnterListAll.length">
        <!-- 返回键 -->
        <router-link to="/home">
          <div class="bottom-icon-1">
            <van-icon name="arrow-left" size="17px"/>         
          </div>
        </router-link>
        <!-- 评论 -->
        <div class="bottom-icon-2" @click="enterComments">
          <van-icon name="chat-o" :badge="this.comments" size="17px"/>
        </div>
        <!-- 点赞 -->
        <div class="bottom-icon-2" @click="giveLike">
          <van-icon name="good-job-o" size="17px" :badge="this.popularity" v-if="this.flag1"/>
          <van-icon name="good-job" size="17px" :badge="this.popularity + 1" color="skyblue" v-if="!this.flag1"/>
        </div>
        <!-- 收藏 -->
        <div class="bottom-icon-2" @click="collectArticle">
          <van-icon name="star-o" size="17px" v-if="EnterListAll[0][this.indexNum].isComment == 1" />
          <van-icon name="star" v-else color="skyblue"/>       
        </div>
        <!-- 分享 -->
        <div class="bottom-icon-2" @click="showShare = true">
          <van-icon name="share-o" size="17px"/>
        </div>
      </div>
      <!-- 分享面板 -->
      <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="share(index)"></van-share-sheet>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState,mapMutations } from 'vuex'
export default {
  created(){
    // 获取当前页面id
    this.getId()
    // 获取文本内容
    this.getContentList()
    // 获取点赞和评论数量
    this.getLike_Comments()
    // 获取附近页面
    this.getContentLists()
    console.log('yanse',this.dayOrnight);
  },
  computed:{
    ...mapState(['ListContentAll','EnterListAll','dayOrnight','TextColor'])
  },
  data(){
    return{
      // 获取当前页面的id值
      id: 0,
      // 当前列表的数据
      Content : [],
      // body中的html数据
      html: '',
      // 收藏点击
      flag: true,
      inde:0,
      // 点赞
      flag1: true,
      // 点击分享
      showShare: false,
      // 分享图片数据
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],
      // 点赞数量
      popularity: 0,
      // 评论数量
      comments : 0,
      ListContent: [],
      swipernowId: 0,
      // 判断是否加入
      flagdata: true,
      // 顶部信息的日期
      nowdate: '',
      // 拆解出来的年
      nowyear: 0,
      // 拆解出来的月
      nowmonth: 0,
      // 拆解出来的日
      nowday: 0,
      // 判断是否重复加载
      flag3 : true,
      // 加载的次数
      page: 1,
      // index值
      indexNum: 0,
      flag5: true,
      // 新加载后的数据
      NewList: []
    }
  },
  methods: {
    ...mapMutations(['setEnterList']),
    // 获取当前页面的id
    getId(){
      // 接收主页的router的query传值
      this.id = this.$route.query.contentId
      console.log('当前页面的id值为: ' + this.id);
    },
    // 获取页面数据
    async getContentList(){
      const {data : res} = await this.$http.get('story/' + this.id,{
          params: this.id
      })
      // 获取页面图片和图片标题内容
      this.Content = res.story     
      // 获取html标签内容
      this.html = res.story.body
      
    },
    // 点击收藏
    collectArticle(){
      console.log(this.id);
      // console.log(this.EnterListAll[0].length);
      for(var i=0;i<this.EnterListAll[0].length;i++){
        // console.log(this.EnterListAll[0][i].id);
        if(this.id == this.EnterListAll[0][i].id){
          console.log('i是啥',i)
          // this.EnterListAll[0][i].isComment = 2;
          if(this.EnterListAll[0][i].isComment == 1){
            this.EnterListAll[0][i].isComment = 2;
            this.EnterListAll[0].splice(i,1,this.EnterListAll[0][i])
            Toast({
              message: '已收藏',
              position: 'bottom',
            });
          }
          else if(this.EnterListAll[0][i].isComment == 2){
            console.log(1);
            this.EnterListAll[0][i].isComment = 1;
            this.EnterListAll[0].splice(i,1,this.EnterListAll[0][i])
            Toast({
              message: '已取消收藏',
              position: 'bottom',
            });
          }
          // this.EnterListAll[0].splice(i,1,this.EnterListAll[0][i])
          console.log(this.EnterListAll[0][i].isComment)
          console.log(this.EnterListAll[0][this.indexNum].isComment)
          console.log(typeof this.EnterListAll[0][i].isComment);
        }
      }    
    },
    // 点赞
    giveLike(){
      this.flag1 = !this.flag1
      console.log(this.indexNum);
    },
    // 点击分享触发
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    // 获取文章评论和点赞数量
    async getLike_Comments(){
      const {data : res} = await this.$http.get('story/' + this.id + '/extra',{
          params: this.id
      })
      // console.log(res);
      this.popularity = res.popularity
      this.comments = res.comments
      console.log('点赞的数量是:',res.popularity);
      console.log('评论的数量是:',res.comments);
    },
    // 点击评论进入评论页面
    enterComments(){
      // this.$router.push({ name: 'Review', params: { commentsId: this.id }})
      this.$router.push({path:'/Detail/:id/Review',query: {contentId: this.id}})
      console.log('id是啥?',this.id);
    },
    async getContentLists(){
            const { data: res} = await this.$http.get('/stories/latest')
            console.log(res);
            // 获取列表内容信息
            this.ListContent = res.stories
            console.log('啦啦啦啦啦啦',this.ListContent);
             // 获取当前时间
            this.nowdate = res.date
            console.log('今天是',this.nowdate);
            // 获取当前年
            this.nowyear = parseInt(this.nowdate.slice(0,4))
            // 获取当前月
            this.nowmonth = parseInt(this.nowdate.slice(4,6)) > 9 ? parseInt(this.nowdate.slice(4,6)) : '0' + parseInt(this.nowdate.slice(4,6))
            // 获取当前日
            var day = parseInt(this.nowdate.slice(6,8))
            this.nowday = day > 9 ? day : '0' + day
            const {data : res2} = await this.$http.get('story/' + this.id,{
            params: this.id
            })
            this.Content = res2.story
            console.log('当前页面数据是:',this.Content);
            // 获取html标签内容
            this.html = res2.story.body
            // console.log('点击进入后页面的id值为',this.id);
            for(var i=0;i<this.ListContent.length;i++){
              if(this.id == this.ListContent[i].id){
                // console.log(this.id)
                // console.log(this.ListContent[i].id);
                this.flagdata = false
              }
              
            }
            if(this.flagdata == true){
              console.log(this.flagdata);
              this.ListContent.unshift(this.Content)
            }
            for(var i=0;i<this.ListContent.length;i++){
              this.ListContent[i].isComment = 1
              this.ListContent[i].isLike = 1
              console.log(i);
            }
            console.log('插入数据后的新数组是:',this.ListContent);
            console.log(this.EnterListAll.length);
            if(this.EnterListAll.length > 0){
                for(var i = 0;i<this.ListContent.length;i++){
                  // 检验EnterListAll数据是否重复插入
                  if(this.EnterListAll[0][0].id == this.ListContent[i].id){
                    this.flag5 = false
                    console.log('加载过啦数据',this.EnterListAll);
                  }
              }
            }
            
            if(this.flag5 == true){
              // console.log(this.flag5);
              this.setEnterList(this.ListContent)
            }
            // console.log(this.EnterListAll[0][0])
            console.log('详情页面的全局数据是啥',this.EnterListAll)
    },
    // 轮播图切换
    async change(index){
      console.log('当前轮播图的位置是',index)
      this.indexNum = index
      this.id = this.ListContent[index].id
      // 获取页面内容
      this.getContentList()
      // 获取评论和点赞数量
      this.getLike_Comments()
      // 加载更多页面
      if(index == 5 * this.page){
        this.getMoreContentList()
        console.log('当前index是啥',index);
      }
      // 路由跳转
      this.$router.push({path:'/Detail/:id',query: {contentId: this.id}})
    },
    // 加载更多数据
      async getMoreContentList(){
          // 年份处理
          var hday = this.nowday //number型
          var hmonth = this.nowmonth //number型
          var hday = hday - 1
          if(hday < 1){
              hday = 31
              var hmonth = hmonth - 1
              var hmonth = (hmonth > 9 ? hmonth : '0' + hmonth).toString()
              // console.log('月份减一拉,month是什么看看',hmonth);
          }
          var day = (hday > 9 ? hday : '0' + hday).toString()   
          var month = hmonth
          var year = this.nowyear.toString()
          // 日期拼接
          var result = year + month + day
          var dateHistory = result
          // console.log('axios拼接日期的结果:',result);
          // console.log(month);
          const {data: res} = await this.$http.get('/stories/before/' + dateHistory,{
              params: dateHistory
          })
          console.log(res);
          // 判断数据是否存在
          if(res.stories.length > 0){
              // var flag = false
              for(var i=0;i<this.ListContent.length;i++){
                  // 如果存在之前的ListContent数组中已经存在了下拉获取的数据内容，则不再重复添加列表
                      if(this.ListContent[i].id == res.stories[1].id){
                          this.flag3 = false
                      }
              }
              if(this.flag3 == true){
                  // 把下拉新获取的内容push进入ListContent数组
                  this.ListContent = this.ListContent.concat(res.stories)
                  this.inde = 5 * this.page;
                  // this.page = this.page + 1
                  for(var i=0;i<res.stories.length;i++){
                    res.stories[i].isComment = 1
                    res.stories[i].isLike = 1
                    console.log(i);
                  }
                  this.page = this.page + 1
                  console.log('获取新数据后的内容数组',this.ListContent);
                  this.nowdate = res.date
                  this.nowyear = parseInt(this.nowdate.slice(0,4))
                  this.nowmonth = parseInt(this.nowdate.slice(4,6)) > 9 ? parseInt(this.nowdate.slice(4,6)) : '0' + parseInt(this.nowdate.slice(4,6))
                  var day1 = parseInt(this.nowdate.slice(6,8))
                  this.nowday = day1 > 9 ? day1 : '0' + day1
                  // console.log('最新的nowday:',this.nowday)
                  // console.log('最新的nowdate:',this.nowdate)
                  // console.log('最新的nowmonth:',this.nowmonth)
                  // 申请的数据加入到全局变量中
                  console.log('申请的数据',res.stories);
                  this.EnterListAll[0] = this.EnterListAll[0].concat(res.stories)
                  for(var i=0;i<this.EnterListAll[0].length;i++){
                    this.EnterListAll[0].splice(i,1,this.EnterListAll[0][i])
                    // console.log('啦啦啦啦',i);
                  }
                  console.log('插入申请的数据之后的全局内容',this.EnterListAll);
              }
              else{
                  console.log('此数据已加载');
                  this.flag3 = true
              }
          }
      },
  },
  share(index){
    console.log(index);
  }
}
</script>

<style scoped lang="less">
*{
  margin: 0;
  padding: 0;
}

.swiper{
  background-color: pink !important;
}

.box{
  
  background-color: pink !important;
  
}
::v-deep .view-more a {
  color: #fff;
}
  .top-img{
    width: 100%;
    height: 300px;
    color: white;
    text-align: left;
    position: relative;
    
    .van-image{
      // width: 100%;
      // // height: 30vh;
      // height: 100%;
      // background-size:100% 100%;
      // z-index: 1;
      position: absolute;
    }
    .title{
        z-index: 999;
        position: absolute;
        font-size: 20px;
        width: 95%;
        letter-spacing: 2px;
        transform: translate(10px,220px);
    }
  }
  .content-top{
    margin-bottom: 95px;
    transform: translateY(70px);
    
  }
  .bottom{
    display: flex;
    width: 100%;
    height: 40px;
    bottom: 0;
    position: fixed;
    background-color: #f6f6f6;
    text-align: center;
    box-sizing: border-box;
    line-height: 35px;
    transform: translateY(1px);
    
    .bottom-icon-1{
      flex: 1;
      width: 40px;
      border-right: 1px solid #000000;
      margin: 5px 0px 5px 0px;
      // margin-right: 50px;
    }
    .bottom-icon-2{
      flex: 2;
      margin: 5px 0px 5px 0px;
    }
    .van-info{
      background-color: #f6f6f6;
      border: 0px;
      color: black;
      transform: translate(22px,-5px);
      text-align: left;
    }
  }

    .footer{
        position: relative;
        z-index: 999;
        // background-color: pink;
    }
    .img{
        width: 100%;
        height: 29vh;
        position: absolute;
        // transform: translateY(2500px);
        transform: translateY(157px);
        z-index: 9999;
    }

    .content-inner{
      background-color: pink;
    }

    .van-share-sheet__options{
      transform: translateX(100px);
    }
</style>>

<style>
@import "../assets/css/Detail.css";
/* @import "../assets/css/Night.css" */
  .content-inner{
      background-color: black;
    }
    .headline{
      border: none;
    }
</style>
