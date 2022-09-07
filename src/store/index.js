import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // vuex中定义数据的地方
  state: {
    ListContentAll: [],
    nowtime : '',
    EnterListAll: [],
    dayOrnight: '',
    TextColor: ''
  },
  // 相当于vue文件中的computed 计算属性
  getters: {
  },
  // 相当于vue文件中的methods方法
  mutations: {
    // setcateAll 一个方法名称
    // state vuex 中定义数据的地方
    // payload 调用方法时传过来的值
    // 获取Home页面全局列表数据
    setListContentAll(state,payload){
      // state.cateAll 数组末尾添加一个数据
      state.ListContentAll.push(payload)
      state.ListContentAll.splice(1,2)
      console.log(payload);
    },
    // 获取全局时间
    setTimeNow(state,payload){
      state.nowtime = payload
      console.log(payload);
    },
    // 获取详情页的全局数据
    setEnterList(state,payload){
      state.EnterListAll.push(payload)
      
    },
    // 获取收藏页面的全局数据
    setIsComment(state,payload){

    },
    // 获取白天黑夜变量
    setDayNight(state,payload){
      state.dayOrnight = payload
      // 白天
      if(state.dayOrnight == '#F6F6F6'){
        state.TextColor = '#000000'
        console.log('字体颜色',state.TextColor);
      }
      // 黑夜
      else if(state.dayOrnight == '#000000'){
        state.TextColor = '#cccccc'
        console.log('字体颜色',state.TextColor);
      }
    },
    // 获取黑色模式的字体颜色
    // setTextColor(state,payload){
    //   state.TextColor = payload
    // }
    // 增加数量
    // changeCateAll(state,payload){
    //   for(var i=0;i < state.cateAll.length;i++){
    //     if(payload == state.cateAll[i].id){
    //       state.cateAll[i].number += 1
    //       // 数组中改变某一项，或多项的方法
    //       // i 在哪一个位置开始修改
    //       // 1 修改多少项
    //       // state.cateAll[i]修改之后的值
    //       state.cateAll.splice(i,1,state.cateAll[i])
    //     }
    //   }
    // },
    // subCateAll(state,payload){
    //   for(var i=0;i < state.cateAll.length;i++){
    //     if(payload == state.cateAll[i].id){
    //       if(state.cateAll[i].number > 1){
    //         state.cateAll[i].number -= 1
    //       // 数组中改变某一项，或多项的方法
    //       // i 在哪一个位置开始修改
    //       // 1 修改多少项
    //       // state.cateAll[i]修改之后的值
    //       state.cateAll.splice(i,1,state.cateAll[i])
    //       }
    //     }
    //   }
    // }
  },
  // 异步的方法
  actions: {
  },
  // 模块
  modules: {
  }
})
