<template>
  <div class="delete-content">
    <div class="delete-top">
      <span @click="back1">
        <van-icon name="arrow-left" class="icon-back"/>
      </span>
      <span class="tit">
        第三方收集使用个人信息列表 - 知乎
      </span>
    </div>
    <div class="zhanwei"></div>
    <div class="delete-title">
      第三方收集使用个人信息列表
    </div>
    <div class="little-title">
      第三方收集和处理信息等行为遵守其自身的隐私条款，而不适用于本政策。当您查看第三方创建的网页或使用第三方开发的应用程序时，这些第三方可能会放置他们自己的 Cookie 或使用其他技术手段，这些技术手段不受我们的控制，且它们的使用不受本政策的约束。
    </div>
    <div class="delete-text">
      为了最大程度保障您的信息安全，我们建议您在使用任何第三方服务前先行查看其隐私条款。为保障您的合法权益，如您发现第三方服务存在风险时，建议您立即终止相关操作并及时与我们取得联系。
    </div>

    <div class="delete-text">
      为了向您提供更多服务、持续优化我们提供服务的稳定性、提升服务质量或者升级相关功能，我们可能会调整我们接入的第三方收集使用个人信息目录。我们会严格遵守相关法律法规与监管要求，在接入第三方前评估第三方收集您的个人信息的合法性、正当性、必要性，以保护您的个人信息。以下为第三方的具体信息：
    </div>
    <div class="delete-text">
      1. 微信开放平台 SDK（Android 端、iOS 端）
    </div>
    <div class="delete-text">
      第三方类别：共享
    </div>
    <div class="delete-text">
      第三方联系方式：深圳市腾讯计算机系统有限公司，深圳市南山区粤海街道麻岭社区科技中一路腾讯大厦 35 层
    </div>
    <div class="delete-text">
      收集方式：SDK 自动收集
    </div>
    <div class="delete-text">
      收集的信息：无
    </div>
    <div class="delete-text">
      业务功能和使用目的：支持微信授权登录、微信分享、微信支付
    </div>

    <div class="delete-text">
      第三方隐私政策链接：https://open.weixin.qq.com/cgi-bin/frame?t=news/protocol_developer_tmpl
    </div>

    <div class="delete-text">
      2. QQ 互联 SDK（Android 端、iOS 端）
    </div>

    <div class="delete-text">
      第三方类别：共享
    </div>

    <div class="delete-text">
      第三方联系方式：深圳市腾讯计算机系统有限公司，深圳市南山区粤海街道麻岭社区科技中一路腾讯大厦 35 层
    </div>

    <div class="delete-text">
      收集方式：SDK 自动收集
    </div>

    <div class="delete-text">
      收集的信息：无
    </div>

    <div class="delete-text">
      业务功能和使用目的：支持 QQ 授权登录、QQ 分享、QQ 空间分享
    </div>

    <div class="delete-text">
      第三方隐私政策链接：https://wiki.connect.qq.com/qq 互联 sdk 隐私保护声明
    </div>

    <div class="delete-text">
      3. Weibo SDK （Android 端）
    </div>

    <div class="delete-text">
      第三方联系方式：北京微梦创科网络技术有限公司，北京市海淀区东北旺西路中关村软件园二期（西扩）N-1、N-2 地块新浪总部科研楼
    </div>

    <div class="delete-text">
      收集方式：SDK 自动收集
    </div>

    <div class="delete-text">
      收集的信息：MAC 地址、IMEI、wifi ssid、IMSI、SimSeriaINumer
    </div>

    <div class="delete-text">
      业务功能和使用目的：支持新浪微博授权登录、新浪微博分享
    </div>

    <div class="delete-text">
      第三方隐私政策链接：https://open.weibo.com/wiki/Android_SDK%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3
    </div>

    <div class="delete-text">
      4. FacebookDrawee（Android 端）
    </div>

    <div class="delete-text">
      第三方类别：委托处理
    </div>

    <div class="delete-text">
      第三方联系方式：Facebook, Inc，https://github.com/facebook/fresco/issues
    </div>

    <div class="delete-text">
      收集方式：SDK 自动收集
    </div>

    <div class="delete-text">
      收集的信息：外置存储器存储的个人数据
    </div>

    <div class="delete-text">
      业务功能和使用目的：加载和展示图片
    </div>

    <div class="delete-text">
      第三方隐私政策链接：https://zh-cn.facebook.com/privacy/explanation
    </div>

    <div class="delete-text">
      5. 腾讯 Bugly（Android 端）
    </div>

    <div class="delete-text">
      第三方类别：委托处理
    </div>

    <div class="delete-text">
      第三方联系方式：深圳市腾讯计算机系统有限公司，深圳市南山区粤海街道麻岭社区科技中一路腾讯大厦 35 层
    </div>

    <div class="delete-text">
      收集方式：SDK 自动收集
    </div>

    <div class="delete-text">
      收集的信息：调用外部命令
    </div>

    <div class="delete-text">
      业务功能和使用目的：分析和统计系统错误
    </div>

    <div class="delete-text">
      第三方隐私政策链接：https://privacy.qq.com/
    </div>
    
    <div class="footer"></div>
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
            font-size: 15px;
            margin-left: 30px;
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

    .footer{
        background-color: black;
        height: 30px;
    }
</style>