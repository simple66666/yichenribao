<template>
  <div class="box">
    <van-nav-bar :title="this.numComments+'条评论'" left-arrow @click-left="onClickLeft" :placeholder="true" :fixed="true"/>
     <div class="CommentList-top" v-if="LongCommentsList.length > 0">
        <span>&nbsp&nbsp{{this.LongCommentsList.length}}条长评</span>
    </div>
    <!--  -->
    <div class="commentList" v-for="(item,index) in LongCommentsList" :key="item.id">
        <!-- 评论左 -->
        <div class="commentList-left">
            <img :src="item.avatar" alt="">
            
        </div>
        <!-- 评论右 -->
        <div class="commentList-right">
            <!-- 评论作者 -->
            <div class="author">{{item.author}}</div>
            <!-- 评论内容 -->
            <div class="content">{{item.content}}</div>
            <!-- 评论底部 -->
            <div class="bottom" >
                <!-- 使用moment插件转换时间戳 -->
                <span class="time">{{item.time | datefmt("MM-DD HH:ss")}}</span>
                <!-- 点赞按钮 -->
                <span class="icon1" @click="addLike(index)">
                    <van-icon name="good-job-o" size="19px" :badge="item.likes" ref="icon1"/>
                    <van-icon name="good-job" size="17px" color="skyblue" :badge="item.likes + 1" class="addLike2" ref="icon2"/>
                </span>
                <!-- 评论按钮 -->
                <span class="icon2" @click="writeDiscuss">
                    <van-icon name="comment-o" size="19px"/>
                </span>
            </div>
        </div>
    </div>
    <div class="CommentList-top">
        <span>&nbsp&nbsp{{this.CommentsList.length}}条短评</span>
    </div>
    <!--  -->
    <div class="commentList" v-for="(item,index) in CommentsList" :key="item.id">
        <!-- 评论左 -->
        <div class="commentList-left">
            <img :src="item.avatar" alt="">
            
        </div>
        <!-- 评论右 -->
        <div class="commentList-right">
            <!-- 评论作者 -->
            <div class="author">{{item.author}}</div>
            <!-- 评论内容 -->
            <div class="content">{{item.content}}</div>
            <!-- 评论底部 -->
            <div class="bottom">
                <!-- 使用moment插件转换时间戳 -->
                <span class="time">{{item.time | datefmt("MM-DD HH:ss")}}</span>
                <!-- 点赞按钮 -->
                <span class="icon1" @click="addLike(index)">
                    <van-icon name="good-job-o" size="19px" :badge="item.likes" ref="icon1"/>
                    <van-icon name="good-job" size="17px" color="skyblue" :badge="item.likes + 1" class="addLike2" ref="icon2"/>
                </span>
                <!-- 评论按钮 -->
                <span class="icon2" @click="writeDiscuss">
                    <van-icon name="comment-o" size="19px"/>
                </span>
            </div>
        </div>
    </div>
    <!-- 底部提示 -->
    <div class="bottom-content">已显示全部内容</div>    
    <!-- 发表评论 -->
    <div class="discuss" @click="writeDiscuss">
            <img src="https://pica.zhimg.com/v2-46f9b4ae22f2ac98d3d19a7b6b829be7_l.jpg?source=8673f162" alt="">
            <span>说说你的看法...</span>
    </div>

    <!-- 写评论的弹出层 -->
    <!-- 点击我的消息右侧弹出层 -->
    <van-popup v-model="show" position="right" :style="{ width: '100%' ,height: '100%',background: '#f6f6f6'}"  closeable
    close-icon-position="top-left" class="popup" close-icon="arrow-left" >
        <span class="pop-title">
            <span>写点评</span>
            <span>发布</span>
        </span>
        <van-field v-model="message" rows="2" autosize type="textarea" maxlength="200" placeholder="友善的评论是交流的起点..." show-word-limit class="text-content"
        />
    </van-popup>
  </div>
</template>

<script>
export default {
    created() {
        this.getId()
        this.getComments()
        this.getCommentsList()
        this.getLongCommentsList()
    },
    data(){
        return{
            id: 0,
            // 评论数量
            numComments : 0,
            // 评论内容
            CommentsList: [],
            // 判断旗
            flag : true,
            // 弹出层
            show: false,
            // 评论内容
            message: '',
            // 长评内容
            LongCommentsList: []
        }
    },
    methods: {
        onClickLeft() {
            // 返回上一页
            this.$router.go(-1)
        },
        getId(){
            // this.$router.push({name: xxx,{params: xxx}})params传参不会在网页路径中显示
            // this.id = this.$route.params.commentsId
            this.id = this.$route.query.contentId
            console.log('当前页面的id值为: ' + this.id)
        },
        // 获取文章评论和点赞数量
        async getComments(){
          const {data : res} = await this.$http.get('story/' + this.id + '/extra',{
              params: this.id
          })
        //   console.log(res);
          this.numComments = res.comments
          console.log('评论的数量是:',this.numComments);
        },
        // 获取文章短评内容
        async getCommentsList(){
            const {data : res} = await this.$http.get('/story/' + this.id + '/short-comments',{
                params: this.id
            })
            // console.log(res);
            this.CommentsList = res.comments
            console.log(this.CommentsList);
            
        },
        // 获取长评内容
        async getLongCommentsList(){
            const {data : res} = await this.$http.get('/story/' + this.id + '/long-comments',{
                params: this.id
            })
            // console.log(res);
            this.LongCommentsList = res.comments
            console.log('长评内容',this.LongCommentsList);
        },
        // 点赞
        addLike(index){
            console.log(index);
            if(this.flag = !this.flag){
                this.$refs.icon2[index].style.display = 'none'
                this.$refs.icon1[index].style.display = 'inline'
                console.log('取消点赞',this.flag);
            }
            else{
                this.$refs.icon1[index].style.display = 'none'
                this.$refs.icon2[index].style.display = 'inline'
                console.log('点赞',this.flag)
                
            }
            
            
        },
        // 判断弹出层是否打开
        writeDiscuss(){
            this.show = true
        }
    },
}
</script>

<style scoped lang="less">
    .CommentList-top{
        font-size: 14px;
        font-weight: bold;
        width: 100%;
        height: 40px;
        line-height: 40px;
    }
    .commentList{
        width: 100%;
        height: auto;
        display: flex;
        border-top: 1px solid #ccc;
        box-sizing: border-box;
        .commentList-left{
            flex: 1;
            text-align: center;
            img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-top: 15px;
            }
        }
        .commentList-right{
            flex: 7;
            padding-right: 20px;
            .author{
                margin-top: 15px;
                font-weight: bold;
                font-size: 14px;
            }
            .content{
                font-size: 14px;
            }
            .bottom{
                margin: 10px 0px;
                display: flex;
                width: 100%;
                height: 30px;
                line-height: 30px;
                .time{
                    width: 100%;
                    color: #ccc;
                    font-size: 14px;
                }
                .icon1{
                    margin-right: 30px;
                    color: #ccc;
                }
                .icon2{
                    padding-right: 10px;
                    color: #ccc;
                }
                // 点赞右上角文字
                .van-info{
                    background-color: #ffffff;
                    border: none;
                    font-size: 15px;
                    // border: 0px;
                    color: #ccc;
                    transform: translate(-20px,0px);
                }
                .addLike2{
                    display: none;
                }
            }
        }
    }
    .bottom-content{
        color: #c0c0c0;
        text-align: center;
        // background-color: pink;
        height: 40px;
        line-height: 40px;
        margin-bottom: 50px;
    }

    .discuss{
        height: 50px;
        width: 100%;
        background-color: #ebebeb;
        bottom: 0;
        position: fixed;
        line-height: 50px;
        padding-left: 10px;
        transform: translateY(3px);
        img{
            height: 30px;
            width: 30px;
            border-radius: 50%;
            
        }
        span{
            margin-left: 8px;
            color: #989898;
        }
    }

    .popup{
        color: black;
        .pop-title{
        height: 50px;
        line-height: 50px;
        // background-color: pink;
        text-align: center;
        font-weight: bold;
        border-bottom: 1px solid #e5e5e5;
        background-color: white;
        display: block;
        span:nth-child(2){
            position: fixed;
            right: 10px;
            color: skyblue;
            font-size: 14px;
        }
    }
    }

    .text-content{
        background-color: #f6f6f6;
    }

   
</style>

