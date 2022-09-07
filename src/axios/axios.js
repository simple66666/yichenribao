import Vue from 'vue'
import axios from "axios";


// axios根路径
axios.defaults.baseURL = 'https://apis.netstart.cn/zhihudaily'

// 2.解决前端向后端发送数据时，显示xx is required
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 把挂载到全局中axios
Vue.prototype.$http = axios

export default axios