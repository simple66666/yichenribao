<template>
  <div class="delete-content">
    <div class="delete-top">
      <span @click="back1">
        <van-icon name="arrow-left" class="icon-back"/>
      </span>
      <span class="tit">
        账号注销
      </span>
    </div>
    <div class="zhanwei"></div>
    <div class="delete-title">
      知乎日报用户注销重要提醒
    </div>
    <div class="little-title">
      在您申请注销您的帐号之前，请充分阅读、理解并同意下列事项：
    </div>
    <div class="delete-text">
      一. 注销须知
    </div>

    <div class="delete-text">
      如果您申请注销知乎日报帐号，请在提交申请前确认您的帐号处于正常使用状态，未发生过被盗、帐号异常等情形。
    </div>
    <div class="delete-text">
      二. 注销流程
    </div>
    <div class="delete-text">
      知乎日报提供自助注销方式：设置 → 帐号与安全 → 帐号注销
    </div>
    <div class="delete-text">
      三. 注销后果
    </div>
    <div class="delete-text">
      1.您的知乎日报帐号一旦被注销成功将不可恢复，您将无法再使用本帐号或找回您添加、绑定的任何内容或信息（即使您使用相同的第三方帐号再次注册并使用知乎日报），请您务必在操作之前自行备份与帐号相关的所有信息和数据。
    </div>
    <div class="delete-text">
      2.对于您在知乎日报平台已发布的所有内容，在您注销帐号后，该内容将无法继续留存在知乎日报平台。
    </div>
    <div class="delete-text">
      3.注销知乎日报帐号并不代表帐号注销前的行为和相关责任得到任何形式的豁免或减轻。
    </div>

    <div class="delete-text">
      四. 其他重要提醒
    </div>

    <div class="delete-text">
      1.如果您在其他平台使用知乎日报帐号进行第三方登录的，注销知乎日报帐号通常不会影响您继续使用其他平台。但仍请您自行确认此类其他平台对于关联帐号的使用规则说明，以避免不必要的损失，知乎日报对帐号注销导致的关联问题不承担责任。
    </div>

    <div class="delete-text">
      2.您知晓并同意，如知乎日报帐号存在权属争议的，知乎日报有权禁用该帐号，直至争议双方通过和解或司法途径解决并向知乎日报提供有效证明。在此期间知乎日报有权拒绝帐号注销操作。
    </div>

    <div class="delete-text1">
      3.在您的帐号注销期间，如您的知乎日报帐号被他人投诉、被国家机关调查或正处于诉讼、仲裁程序中，知乎日报有权自行终止您的知乎日报帐号注销流程而无需另行获得您的同意。
    </div>

    <div class="zhanwei2"></div>
    <div class="delete-footer">
      <span class="footer-up" @click="changeCicle">
      
          <img src="../assets/cicle1.png" alt="" class="cicle" v-if="flag == false">
          <img src="../assets/cicle2.png" alt="" class="cicle" v-else>
          <span class="up-1">我已阅读并接受《知乎日报用户注销协议》</span>
      </span>
      <div>
        <button class="btn1" :style="`background:${this.btn_bgc};`" @click="deleteId">
            了解风险，确定注销
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data(){
    return{
      flag: true,
      btn_bgc: '#a6d2f7'
    }
  },
  methods: {
    back1(){
      console.log(1)
      // this.$router.back();
      this.$router.go(-1)
    },
    changeCicle(){
      this.flag = !this.flag
      if(this.flag ==false){
        this.btn_bgc = '#4ba6ed'
      }
      else{
        this.btn_bgc = '#a6d2f7'
      }
    },
    deleteId(){
       if(this.flag == false){
        Toast({
          message: '注销账号成功',
          position: 'bottom',
        });
        this.$router.push('/Home')
       }

    }
  },
}
</script>

<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
    .delete-content{
        color: white;
        font-size: 14px;
        margin-top: 35px;
        background-color: black;
        height: 100%;
        width: 100%;
        .zhanwei{
          height: 35px;
          width: 100%;
        }
        .delete-top{
          top: 0;
          position: fixed;
          height: 35px;
          background: white;
          line-height: 35px;
          z-index: 999;
          width: 100%;
          padding-left: 15px;
          .icon-back{
            color: black;
            font-size: 20px;
            transform: translateY(2px);
          }
          .tit{
            color: black;
            text-align: center;
            font-size: 16px;
            margin-left: 33%;
            font-weight: bold;
          }
        }
        .delete-title{
          margin-bottom: 25px;
          padding: 0px 10px 0px 15px;
        }
        .little-title{
          margin-bottom: 25px;
          padding: 0px 10px 0px 15px;
        }
        .delete-text{
          margin-bottom: 25px;
          padding: 0px 10px 0px 15px;
        }
    }
    .delete-footer{
      
      background-color: white;
      height: 80px;
      position: fixed;
      width: 100%;
      bottom: 0px;
      transform: translateY(1px);
      font-size: 20px;
    }
    .zhanwei2{
      height: 80px;
      width: 100%;
    }
    .delete-text1{
      padding: 0px 10px 0px 15px;
      margin-bottom: 30px;
    }
    .delete-footer{
      padding-top: 10px;
      box-sizing: border-box;
    }
    .footer-up{
      margin-top: 10px;
      padding: 10px 10px 0px 15px;
      
    }
    .radio-1{
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: none;
    }


    .cicle{
      width: 15px;
      height: 15px;
      // background-color: skyblue;
      border-radius: 50%;
      border: none;
      margin-right: 5px;
    }
    .up-1{
      color: #ccc;
      font-size: 13px;
    }
    .btn1{
      // background-color: #a6d2f7;
      width: 90%;
      margin: 0 5%;
      border: none;
      border-radius: 20px;
      text-align: center;
      margin-top: 10px;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
    }
</style>