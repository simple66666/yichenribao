<template>
<!-- 设置组件 -->
  <div class="box">
      <div class="box2">
        <!-- 大字号 -->
        <div class="list">
          <div class="list-left">
            <div>大字号</div>
            <div>内容页将以更大字号显示</div>
          </div>

          <div class="list-right">
            <van-switch v-model="checked" active-color="#05a6ee" inactive-color="#ededed" size="16"/>
          </div>
        </div>
        <!-- 夜间模式 -->
        <div class="list">
          <div class="list-left">
            <div class="title">夜间模式</div>
          </div>

          <div class="list-right">
            <van-switch v-model="checked2" active-color="#05a6ee" inactive-color="#ededed" size="16" v-if="dayOrnight == '#000000'"/>
            <van-switch v-model="checked3" active-color="#05a6ee" inactive-color="#ededed" size="16" v-else/>
          </div>
        </div>
      </div>
      

      <!-- 账号安全 -->
      <div class="box3">
        <div class="list" @click="show_admin">
          <div class="list-left">
            <div class="title">账号与安全</div>
          </div>

          <div class="list-right-3">
            <van-icon name="arrow" size="16"/>
          </div>
        </div>
      </div>

      <div class="box4">
        <!-- 去好评 -->
        <div class="list">
          <div class="list-left">
            <div class="title">去好评</div>
          </div>

          <div class="list-right-3">
            <van-icon name="arrow" size="16"/>
          </div>
        </div>
        <!-- 去吐槽 -->
        <div class="list" @click="showShare = true">
          <div class="list-left">
            <div class="title">去吐槽</div>
          </div>

          <div class="list-right-3">
            <van-icon name="arrow" size="16"/>
          </div>
        </div>
      </div>



      <div class="box5">
        <!-- 清理缓存 -->
        <div class="list" @click="clear">
          <div class="list-left">
            <div class="title">清除缓存</div>
          </div>

          <div class="list-right-3">
            <van-icon name="arrow" size="16"/>
          </div>
        </div>
        <div class="list" @click="privacy">
          <div class="list-left">
            <div class="title">隐私中心</div>
          </div>

          <div class="list-right-3">
            <van-icon name="arrow" size="16"/>
          </div>
        </div>
        <div class="list" @click="enterCenter">
          <div class="list-left">
            <div class="title">证照中心</div>
          </div>

          <div class="list-right-3">
            <van-icon name="arrow" size="16"/>
          </div>
        </div>
        <div class="list">
          <div class="list-left">
            <div class="title">知乎协议</div>
          </div>

          <div class="list-right-3">
            <van-icon name="arrow" size="16"/>
          </div>
        </div>
      </div>
      
      <div class="footerBtn">
        <div>退出登录</div>
      </div>

      <div class="footer-content">
        当前版本：3.6.2(1262)
      </div>


      <!-- 分享面板(去吐槽) -->
      <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="share(index)"></van-share-sheet>

      <!-- 账号与安全点击 -->
      <!-- 点击账号与安全右侧弹出层 -->
       <van-popup v-model="show" position="right" :style="{ width: '100%' ,height: '100%',background: '#f6f6f6'}"  closeable
       close-icon-position="top-left" class="popup" close-icon="arrow-left" >
           <div class="pop-title">账号与安全</div>
           <div class="title-1">账号与安全</div>

           <div class="list" @click="show_adminId">
              <div class="list-left">
                <div class="title">用户 ID</div>
              </div>

              <div class="list-right-3">
                <van-icon name="arrow" size="16"/>
              </div>
           </div>

        <div class="list" @click="show_delete">
          <div class="list-left">
            <div class="title">账号注销</div>
          </div>

          <div class="list-right-3">
            <van-icon name="arrow" size="16"/>
          </div>
        </div>
       </van-popup>

      <!-- 点击撤回权限右侧弹出层 -->
       <van-popup v-model="show4" position="right" :style="{ width: '100%' ,height: '100%',background: '#f6f6f6'}"  closeable
       close-icon-position="top-left" class="popup" close-icon="arrow-left" >
           <div class="pop-title">撤回权限</div>
           <div class="title-1">撤回隐私协议</div>

           <div class="list" @click="show_Returnfunction">
              <div class="list-left">
                <div class="title">撤回隐私协议</div>
              </div>

              <div class="list-right-3">
                <van-icon name="arrow" size="16"/>
              </div>
           </div>
       </van-popup>

      <!-- 撤回用户协议弹出层 -->
      <van-popup v-model="showReturnfunction" class="adminId">
            <div class="title-2">撤回隐私协议</div>
            <div class="title-id">确定要撤回隐私协议吗?</div>
            <button class="content-btn" @click="close_Returnfunction">确定</button>
       </van-popup>
      <!-- 用户id弹出层 -->
       <van-popup v-model="showId" class="adminId">
            <div class="title-2">我的用户 ID</div>
            <div class="title-id">140515682</div>
            <button class="content-btn" @click="close_adminId">确定</button>
       </van-popup>
       <!-- 个人信息下载弹出层 -->
        <van-popup v-model="showMessage" class="adminId">
            <div class="title-2">个人信息下载</div>
            <div class="title-id">您可以通过向user@zhihu.com发送邮件说明您的个人信息下载需求，请附带您在知乎日报APP ---设置页---账号与安全---用户id中您的用户ID截图，以便我们核实确认您的身份。</div>
            <button class="content-btn" @click="close_Message">确定</button>
       </van-popup>
       <!-- 点击隐私中心右侧弹出层 -->
       <van-popup v-model="show3" position="right" :style="{ width: '100%' ,height: '100%',background: '#f6f6f6'}"  closeable
       close-icon-position="top-left" class="popup" close-icon="arrow-left" >
           <div class="pop-title">隐私中心</div>
           <div class="title-1">个人信息</div>

           <div class="list" @click="show_Message">
              <div class="list-left">
                <div class="title">个人信息下载</div>
              </div>

              <div class="list-right-3">
                <van-icon name="arrow" size="16"/>
              </div>
           </div>
          <div class="title-1">隐私政策与权限设置</div>
          <div class="list" @click="show_other">
            <div class="list-left">
              <div class="title">个人信息保护指引</div>
            </div>

            <div class="list-right-3">
              <van-icon name="arrow" size="16"/>
            </div>
          </div>

          <div class="list" @click="show_other">
            <div class="list-left">
              <div class="title">第三方收集使用个人信息列表</div>
            </div>

            <div class="list-right-3">
              <van-icon name="arrow" size="16"/>
            </div>
          </div>

          <div class="list" @click="show_ReturnPower">
            <div class="list-left">
              <div class="title">撤回授权</div>
            </div>

            <div class="list-right-3">
              <van-icon name="arrow" size="16"/>
            </div>
          </div>
       </van-popup>


  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState,mapMutations } from 'vuex'
import AdminDelete from '../components/AdminDelete.vue'
export default {
  // 注册组件
  components:{
    AdminDelete: AdminDelete
  },
  data(){
    return{
      
      checked: false,
      checked2: true,
      checked3: false,
      // 点击吐槽分享
      showShare: false,
      // 点击账号与安全
      show : false,
      // 点击隐私中心
      show3: false,
      // 点击撤回权限
      show4: false,
      // 点击撤回隐私协议
      showReturnfunction: false,
      // 点击用户id
      showId : false,
      // 点击个人信息下载
      showMessage: false,
      // 点击账号注销
      showDelete: false,
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
    }
  },
  computed:{
    ...mapState(['dayOrnight'])
    },
  created() {
    console.log('设置',this.dayOrnight);
    
  },
  methods: {
    // 清除缓存
    clear(){
      console.log(1);
      Toast({
        message: '缓存已清理',
        position: 'bottom',
      });
    },
    // 账号与安全弹出层
    show_admin(){
      // console.log(1);
      this.show = true
    },
    // 用户id弹出层
    show_adminId(){
      this.showId = true
    },
    // 关闭用户id弹出层
    close_adminId(){
      this.showId = false
    },
    // 账号注销弹出层
    show_delete(){
      // this.showDelete = true
      // console.log(1);
      this.$router.push('/AdminDelete')
    },
    //点击个人信息下载
    show_Message(){
      this.showMessage = true
    },
    // 关闭个人信息下载
    close_Message(){
      this.showMessage = false
    },
    // 点击隐私中心弹出层
    privacy(){
      this.show3 = true
    },
    // 点击第三方收集个人使用信息
    show_other(){
      this.$router.push('/Other')
    },
    // 点击撤回权限
    show_ReturnPower(){
      this.show4 = true
    },
    // 撤回隐私协议
    show_Returnfunction(){
      this.showReturnfunction = true
    },
    close_Returnfunction(){
      this.showReturnfunction = false
    },
    enterCenter(){
      this.$router.push('/Center')
    }
  },
}
</script>

<style lang="less" scoped>
  .box2,.box3,.box4,.box5{
    margin-bottom: 8px;
  }
  .list{
    display: flex;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ececec;
    background: white;
    justify-content: space-between;
    transition: all 0.5s;
    .list-left{
      font-size: 15px;
      margin-left: 10px;
      margin-top: 5px;
      div:nth-child(2){
        color: #9c9c9c;
        font-size: 13px;
        
      }
    }
    .list-right{
      line-height: 55px;
      margin-right: 15px;
    }
  }
  .title{
    line-height: 40px;
  }
  .list-right-3{
    line-height: 50px;
    margin-right: 15px;
    color: #d5d5d5;
  }
  .box3 .list:hover{
    background-color: #e5e5e5;
  }
  .box4 .list:hover{
    background-color: #e5e5e5;
  }
  .box5 .list:hover{
    background-color: #e5e5e5;
  }
  .footerBtn{
    color: #ee4241;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: white;
    font-weight: bold;
    transition: all 0.5s;
  }
  .footerBtn:hover{
    background-color: #e5e5e5;
  }
  .footer-content{
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #969696;
    // background-color: pink;
    font-size: 13px;
  }

  .popup{
        color: black;
        width: 100%;
        // height: 100%;
        // 头部文字和头像
        .popup-top{
            margin-top: 60px;
            text-align: center;
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
        .title-1{
          // background: pink;
          height: 40px;
          font-size: 13px;
          padding-left: 10px;
          line-height: 50px;
          color: #cccccc;
        }
  }


  .adminId{
    border-radius:15px;
    text-align: center;
    width: 80%;

    .title-2{
      margin-top: 20px;
      font-weight: bold;
      font-size: 15px;
    }
    .title-id{
      color: #000000;
      font-size: 13px;
      margin-top: 15px;
      padding: 0px 30px;
    }
    .content-btn{
      background-color: #03a9f3;
      color: white;
      width: 80%;
      height: 35px;
      border-radius: 20px;
      margin: 20px 0px 15px 0px;
      border: none;
    }
  }
</style>

