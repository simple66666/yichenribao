<template>
  <div class="box">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="header">
          <!-- 头部导航栏 -->
          <van-nav-bar :fixed="true" :placeholder="true" class="top1" style="background-color: red;">
              <template #left>
                  <!-- 左上角日期 -->
                  <div class="header-left">
                      <div>{{day}}</div>
                      <div>{{month}}月</div>
                  </div>
                  <!-- 根据时间变化的提示词 -->
                  <div class="header-left-2" ref="headerTime" v-if="hour > 6 && hour < 12">早上好!</div>
                  <div class="header-left-2" ref="headerTime" v-else-if="hour >= 12 && hour < 18">知乎日报</div>
                  <div class="header-left-2" ref="headerTime" v-else-if="hour >= 18 && hour < 23">晚上好!</div>
                  <div class="header-left-2" ref="headerTime" v-else>深夜了~早点休息喔!</div>
              </template>
              <template #right>
                  <!-- 小图标 -->
                  <img src="https://pica.zhimg.com/v2-46f9b4ae22f2ac98d3d19a7b6b829be7_l.jpg?source=8673f162" alt="" class="headers" @click="showPopup">
              </template>
          </van-nav-bar>
      </div>
      
      <!-- 轮播图 -->
      <div class="swiper">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
            <van-swipe-item v-for="item in swiper" :key="item.id"  @click="enterList(item.id)">
            <!-- 图片 -->
            <van-image fit='cover' :src="item.image"></van-image>
            <!-- 底部渐变模糊 -->
            <div class="footer">
                <div class="img"  :style="{
                    background: '#' + item.image_hue.substr(2, 8) + 'd5',
                    background: `
                    linear-gradient(0,#${item.image_hue.substr(2, 8)},#${item.image_hue.substr(2, 8)}e6,#${item.image_hue.substr(2, 8)}00)`,
                    }">

                </div>
            </div>
            <!-- 图片标题 -->
            <div class="swiper-title">{{item.title}}</div>
            <!-- 作者 -->
            <div class="swiper-hint">{{item.hint}}</div>
            </van-swipe-item>
            <!-- 轮播图指示器 -->
              <template #indicator>
                <div class="custom-indicator">
                    <span :class="{'active' : current == index}"  v-for="(item,index) in swiper " :key="index"></span>
                </div>
            </template>
          </van-swipe>
      </div>
      
      <div class="content-list" v-for="item in ListContent" :key="item.id" @click="enterList(item.id)">
        <div class="content-left">
            <!-- 文章标题 -->
            <div class="title">{{item.title}}</div>
            <!-- 作者+时间-->
            <span>{{item.hint}}</span> 
        </div>
        <div class="content-right">
            <!-- 文章图片 -->
            <img :src="item.images[0]" alt="">
        </div> 
      </div>  
    <!-- </div> -->
     <!-- 时间 -->
     <!-- <div>时间</div> -->
    </van-pull-refresh>
    <!-- 上拉加载提示 -->
    <div class="load">
        <van-loading size="24px" :style="`background:${this.dayOrnight}; color:${this.TextColor};`">加载中...</van-loading>
    </div>
     <!-- 点击头像右侧弹出层 -->
     <van-popup v-model="show" position="right" :style="`background:${this.dayOrnight}; color:${this.TextColor};`"  closeable
  close-icon-position="top-left" class="popup" close-icon="arrow-left" >
     <div class="popup-top">
        <img src="https://pica.zhimg.com/v2-46f9b4ae22f2ac98d3d19a7b6b829be7_l.jpg?source=8673f162" alt="">
        <div class="popup-admin">天</div>
     </div>
     <!-- 我的收藏 -->
     <div class="popup-list" @click="showPopup2">
        <span>我的收藏</span>
        <span class="right">
            <van-icon name="arrow" />
        </span>
     </div>
     <!-- 消息中心 -->
     <div class="popup-list" @click="showPopup3">
        <span>消息中心</span>
        <span class="right">
            <van-icon name="arrow" />
        </span>
     </div>
     <div class="popup-bottom">
        <!-- 夜间模式  -->
        <div class="night" v-if="this.show3 == true" @click="showDayOrNight">
            <div>
                <img src="../assets/night.png" alt="">
            </div>
            <div class="mode">夜间模式</div>
        </div>
        <!-- 日间模式 -->
        <div class="night" v-else @click="showDayOrNight">
            <div>
                <img src="../assets/day.png" alt="">
            </div>
            <div class="mode">日间模式</div>
        </div>
        <!-- 设置  -->
        <div class="setting" @click="showPopup5">
            <div>
                <img src="../assets/setting.png" alt="">
            </div>
            <div class="mode">设置</div>
        </div>
     </div>
     </van-popup>
     
    <div v-if="isCommentList.length">
        <!-- 点击我的收藏右侧弹出层 -->
    <van-popup v-model="show2" position="right" :style="{ width: '100%' ,height: '100%',background: '#f6f6f6'}"  closeable
    close-icon-position="top-left" class="popup" close-icon="arrow-left" >
        <div class="pop-title">收藏</div>
        <div class="pop-list" v-for="(item,index) in isCommentList" :key="index" @click="enterList(item.id)">
            <div class="pop-list-left">
                <div class="list-title">{{item.title}}</div>
            </div>
            <div class="pop-list-right">
                <img :src="item.images" alt="">
            </div>
        </div>
        <div class="list-none">没有更多内容</div>
    </van-popup>
     </div>
        
    <!-- 点击我的消息右侧弹出层 -->
    <van-popup v-model="show4" position="right" :style="{ width: '100%' ,height: '100%',background: '#f6f6f6'}"  closeable
    close-icon-position="top-left" class="popup" close-icon="arrow-left" >
        <div class="pop-title">消息中心</div>
    </van-popup>

    <!-- 点击设置右侧弹出层  -->
    <van-popup v-model="show5" position="right" :style="{ width: '100%' ,height: '100%',background: '#F6F6F6'}"  closeable
    close-icon-position="top-left" class="popup" close-icon="arrow-left" >
        <div class="pop-title">设置</div>
        <setting></setting>
    </van-popup>
    
    <!-- 点击回到顶部按钮 -->
    <div class="ball" @click="goBackTop" v-if="PageTop > 100">
        <van-icon name="back-top" class="ball-icon" size="40"/>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState,mapMutations } from 'vuex'
import Setting from '../components/Setting.vue'
export default {
    // 设置组件注册 
    components:{
        'Setting': Setting
    },
    // 发送axios请求获取列表信息
    created(){
        this.getContentList()
        this.getTime()
        this.bindScroll() //首次调用
        this.getNowHour() //获取当前小时数
        this.show5 = false
    },
    
    destroyed() {
        this.clearScroll()  //页面销毁之前 清除scroll事件
    },
    mounted() {
        this.getNowHour()
    },
    // 计算属性
    computed:{
    ...mapState(['ListContentAll','nowtime','EnterListAll','dayOrnight','TextColor'])
    },
    data(){
        return {
            // 获取的数据
            ListContent : [],
            // 日期
            Time:{
                month: '',
                day: 0,
            },
            // 轮播图
            swiper : [],
            // 顶部信息的日期
            nowdate: '',
            // 拆解出来的年
            nowyear: 0,
            // 拆解出来的月
            nowmonth: 0,
            // 拆解出来的日
            nowday: 0,
            // 判断是否重复加载
            flag : true,
            // 点击头像弹出层
            show: false,
            // 点击我的收藏弹出层
            show2: false,
            // 下拉刷新
            loading: false,
            finished: false,
            refreshing: false,
            // 轮播图
            current: 0,
            // 存放收藏内容
            isCommentList: [],
            // 日夜模式
            show3: true,
            // 消息中心更新
            show4: false,
            // 设置
            show5: false,
            // 距离顶部的距离
            PageTop: 0,
            // 当前的小时时间
            hour: 0,
        }
    },
    methods:{
        ...mapMutations(['setListContentAll','setTimeNow','setDayNight']),
        async getContentList(){
            const { data: res} = await this.$http.get('/stories/latest')
            console.log(res);
            // 获取列表内容信息
            this.ListContent = res.stories
            // 获取轮播图数据
            this.swiper = res.top_stories
            // 获取当前时间
            this.nowdate = res.date
            // this.nowdate = toString(this.nowtime)
            console.log('今天是',this.nowdate);
            // 获取当前年
            this.nowyear = parseInt(this.nowdate.slice(0,4))
            // console.log('当前年份是:',this.nowyear);
            // 获取当前月
            this.nowmonth = parseInt(this.nowdate.slice(4,6)) > 9 ? parseInt(this.nowdate.slice(4,6)) : '0' + parseInt(this.nowdate.slice(4,6))
            // console.log('当前月份是:',this.nowmonth);
            var day = parseInt(this.nowdate.slice(6,8))
            this.nowday = day > 9 ? day : '0' + day
            // console.log('当前日期是:',this.nowday);
            // console.log(this.swiper);
            this.setListContentAll(this.ListContent)
        },
        getTime(){
            var nowdate = new Date()
            var month1 = nowdate.getMonth() + 1
            var day1 = nowdate.getDate() 
            
            // this.month = month1
            if(month1 == 1){
                this.month = '一'
            }
            else if(month1 == 2){
                this.month = '二'
            }
            else if(month1 == 3){
                this.month = '三'
            }
            else if(month1 == 4){
                this.month = '二'
            }
            else if(month1 == 5){
                this.month = '五'
            }
            else if(month1 == 6){
                this.month = '六'
            }
            else if(month1 == 7){
                this.month = '七'
            }
            else if(month1 == 8){
                this.month = '八'
            }
            else if(month1 == 9){
                this.month = '九'
            }
            else if(month1 == 10){
                this.month = '十'
            }
            else if(month1 == 11){
                this.month = '十一'
            }
            else{
                this.month = '十二'
            }
            this.day = day1
            
        },
        async enterList(id){
            // 获取内容列表的id
            console.log(id)
            var strId = id.toString()
            const {data : res} = await this.$http.get('/story/' + strId,{
                params: strId
            })
            console.log(res)
            // 使用params传参更加安全
            this.$router.push({path:'/Detail/:id',query: {contentId: id}})
            
            
        },
         // 绑定scroll事件
        bindScroll(){
          window.addEventListener("scroll",this.scrollHande)
        },
        // 清除scroll事件
        clearScroll(){
          window.removeEventListener("scroll",this.scrollHande)
        },
         // 滚动的回调函数
        scrollHande(){
          // scroll和input滑动等都是高频率触发事件，所以在写这些事件的时候 尽量加上防抖和节流
          if(this.isLoading) return // 正在加载的时候，如果滚动时候不请求新数据
          var B = document.documentElement.scrollHeight //获取html内容的高度
          var H = window.innerHeight //获取窗口的高度
          var S = document.body.scrollTop ||document.documentElement.scrollTop //滚出去的高度
          this.PageTop = document.documentElement.scrollTop
          if(B-H-S<2){
            // 快触底了 请求新数据
            // console.log('触底了');
            // 申请更多数据
            this.getMoreContentList()
          }
    
        },
        // 触底加载更多数据
        async getMoreContentList(){
            // 年份处理
            var hday = this.nowday //number型
            var hmonth = this.nowmonth //number型

            var hday = hday - 1
            if(hday < 1){
                hday = 30
                var hmonth = hmonth - 1
                var hmonth = (hmonth > 9 ? hmonth : '0' + hmonth).toString()
                console.log('月份减一拉,month是什么看看',hmonth);
            }
            var day = (hday > 9 ? hday : '0' + hday).toString()   
            var month = hmonth
            var year = this.nowyear.toString()
            // 日期拼接
            var result = year + month + day
            var dateHistory = result
            console.log('axios拼接日期的结果:',result);
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
                            this.flag = false
                        }
                }
                if(this.flag == true){
                    // 把下拉新获取的内容push进入ListContent数组
                    for(var i=0;i<res.stories.length;i++){
                        res.stories[i].day = 0
                        res.stories[i].month = 0
                    }
                    this.ListContent.push(...res.stories)
                    console.log('啦啦啦啦啦',this.ListContent);
                    this.nowdate = res.date
                    this.nowyear = parseInt(this.nowdate.slice(0,4))
                    this.nowmonth = parseInt(this.nowdate.slice(4,6)) > 9 ? parseInt(this.nowdate.slice(4,6)) : '0' + parseInt(this.nowdate.slice(4,6))
                    var day1 = parseInt(this.nowdate.slice(6,8))
                    this.nowday = day1 > 9 ? day1 : '0' + day1
                    console.log('最新的nowday:',this.nowday);
                    console.log('最新的nowdate:',this.nowdate);
                    console.log('最新的nowmonth:',this.nowmonth);
                    this.setListContentAll(res.stories)
                    console.log('vuex定义的全局数据是',this.ListContentAll);
                    this.setTimeNow(this.nowdate)
                    console.log('vuex定义的全局时间是:',this.nowtime);
                }
                else{
                    console.log('此数据已加载');
                    this.flag = true
                }
            }
        },
        // 导航栏根据时间动态获取
        getNowHour(){
            var nowdate = new Date()
            this.hour = nowdate.getHours()
            console.log('小时数',this.hour);
        },
        // 点击头像展示我的
        showPopup(){
            this.show = true
        },
        // 在这定义收藏数据显示
        showPopup2(){
            console.log('所有收藏页面的数据是:',this.isCommentList);
            if(this.EnterListAll[0].length > 0){
                this.show2 = true
                console.log(this.EnterListAll[0]);
                for(var i=0;i<this.EnterListAll[0].length;i++){
                    if(this.EnterListAll[0][i].isComment == 2){
                        this.isCommentList.push(this.EnterListAll[0][i])
                        this.isCommentList = [...new Set(this.isCommentList)]
                    }
                }
                console.log('所有收藏页面的数据是:',this.isCommentList);
            }
            else{
                this.show2 = false
                Toast({
                    message: '暂无收藏内容',
                    position: 'bottom',
                });
            }
        },
        // 消息中心
        showPopup3(){
            this.show4 = true
        },
        // 下拉刷新
        onLoad() {
            setTimeout(() => {
                if (this.refreshing) {
                    this.ListContent = []
                    this.refreshing = false;
                }
                // 获取数据
                this.getContentList()
                this.loading = false;
            }, 1000);
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
        showDayOrNight(){   
            this.show3 = !this.show3  

            if(this.show3 == true){
                this.setDayNight('#F6F6F6')
                // console.log(this.dayOrnight,123);
                // console.log(this.show3);
                // console.log('123',this.TextColor);
            }
            else{                
                this.setDayNight('#000000')    
                // console.log(this.dayOrnight);
                // console.log(this.show3);
                // console.log('123',this.TextColor);
            }

        },
        showPopup5(){
            this.show5 = true
        },
        // 轮播图
        onChange(index) {
            this.current = index;
        },
        //悬浮球回到顶部
        goBackTop(){
            // console.log('页面整体高度',document.documentElement.scrollHeight);
            // console.log('具体顶部距离',document.documentElement.scrollTop);
            document.documentElement.scrollTop = 0
        },
        
        
    }
}
</script>

<style lang="less" scoped>
    .box{
        width: 100%;
        height: auto;
        
    }
    .header-left{
        border-right: 1px solid #989898;
        width: 30px;
        padding-right: 15px;
        height: 30px;
        line-height: 18px;
        text-align: center;
        margin-right: 8px;
        font-size: 20px;
        div:nth-child(2){
            font-size: 12px;
        }
    }
    .header-left-2{
        font-size: 21px;
        font-weight: 500;
    }

    .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: left;
    background-color: #39a9ed;
    margin-bottom: 5px;
    height: 300px;
    width: 100%;
    position: relative;
    // 解决使用filters后的底部白边问题
    overflow: hidden;
    .van-image{
        width: 100%;
        height: 350px;
        // background-size:100% 100%;
        z-index: 1;
        position: absolute;     
    }
    
    
    .swiper-title{
        
        z-index: 999;
        position: absolute;
        font-size: 18px;
        font-weight: bold;
        padding: 180px 15px 0px 15px;
        width: 350px;
    }
    .swiper-hint{
        z-index: 999;
        position: relative;
        font-size: 14px;
        padding: 220px 15px 20px 15px;
        width: 350px;
        color: #e7dac9;
        margin-top: 10px;
    }
    

  }
    
    .custom-indicator span{
        display: block;
        width: 1vw;
        height: 1vw;
        border-radius: 50px;
        background-color: gray;
        margin: 0 3px;
        // position: absolute;
        // position: absolute;
        z-index: 999;
    }

    .custom-indicator span.active{
        background: rgb(255, 250, 250);
        width: 4vw;
    }
     .custom-indicator {
    position: absolute;
    right: 0px;
    bottom: 15px;
    padding: 2px 5px;
    font-size: 12px;
    // background: rgba(0, 0, 0, 0.1);
    width: 20vw;
    display: flex;
  }

  .content-list{
      
      width: 100%;
      height: 90px;
      display: flex;
      padding: 12px 10px;
      box-sizing: border-box;
      .content-left{    
          flex: 9;
          line-height: 23px;
          div{
              font-size: 14px;
              font-weight: 500;
          }
          span{
              margin-top: 5px;
              font-size: 13px;
              color: #989898;
          }
      }

      .content-right{
          flex: 2;
          margin-left: 8px;
          img{
              width: 66px;
              height: 66px;
          }
      }
  }
  .headers {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .van-skeleton {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 0px 0px;
    }

    .popup{
        color: black;
        width: 100%;
        height: 100%;
        // 头部文字和头像
        .popup-top{
            margin-top: 60px;
            text-align: center;
            img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
            div{
                font-size: 18px;
                font-weight: bold;
                
                margin: 10px 0px 30px 0px;
            }
            
        }
        // 下方索引列表
        .popup-list{
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #ececec;
        padding-left: 10px;
        display: flex;
        justify-content: space-between;
        transition: all 0.5s;
        .right{
            padding-right: 15px;
            font-size: 20px;
            color: #989898;
        }
        }
        .popup-list:hover{
            background-color: #e5e5e5;
        }
        .popup-bottom{
            text-align: center;
            width: 100%;
            height: 60px;
            // background-color: #e5e5e5;
            bottom: 20px;
            position: fixed;
            display: flex;
            justify-content: center;
            .night{
                margin-right: 80px;
                img{
                    height: 30px;
                    width: 30px;
                    
                }
                .mode{
                    margin-top: 5px;
                    font-size: 13px;
                }
            }
            .setting{
                img{
                    height: 30px;
                    width: 30px;
                }
                .mode{
                    margin-top: 5px;
                    font-size: 13px;
                }
            }
        }
        .list-none{
            color: #cccccc;
            text-align: center;
            height: 50px;
            // background: red;
            line-height: 50px;
        }
    }
    
    .pop-title{
        height: 50px;
        line-height: 50px;
        // background-color: pink;
        text-align: center;
        font-weight: bold;
        border-bottom: 1px solid #e5e5e5;
        background-color: white;
    }
    .pop-list{
        display: flex;
        height: 12vh;
        // background-color: pink;
        background-color: white;
        border-bottom: 1px solid #e5e5e5;
        .pop-list-left{
            width: 80vw;
            // border-right: 1px solid red;
            margin: auto 5px auto 5px;
            color: #9a9a9a;
        }
        .pop-list-right{
            width: 20vw;
            // border-left: 1px solid red;
            text-align: center;
            padding-top: 7px;
            img{
                width: 66px;
                height: 66px;    
            }
        }
        
    }
    // Home页面轮播图模糊样式
    .footer{
        position: relative;
        z-index: 999;
    }
    .img{
        width: 100%;
        height: 20vh;
        position: absolute;
        transform: translateY(150px);
    }
    // 悬浮球样式
    .ball{
        width: 40px;
        height: 40px;
        position: fixed;
        right: 10px;
        bottom: 50px;
        border: 1px solid #cccccc;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        background-color: rgb(255, 250, 250);
        .ball-icon{
            border-radius: 50%;
            height: 40px;
            width: 40px;
            color: black;
            
        }
    }
    // 上拉加载文案加icon
    .load{
        text-align: center;
        height: 40px;
        
        background-color: white;
        line-height: 40px;
    }

    .content-top{
        display: flex;
        color: #979797;
        .content-top-left{
            padding-left: 10px;
            flex: 3;
            // border-right: 1px solid #000000;
        }
        .content-top-right{
            flex: 15;
            // border-bottom: 1px solid red;
            // background: pink;
            .line{
                // width: 100%;
                border-bottom: 1px solid #ebebeb;
                transform: translateY(10px);
            }
        }
    }

    
    
</style>>

