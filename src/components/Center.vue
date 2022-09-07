<template>
  <div>
    <!-- 为什么v-for和v-if不建议再一起使用 -->
    <!-- v-for优先级高于V-if  -->
    <div v-for="item in filterArr" :key="item.id">
        <div>{{item.name}}</div>
    </div>
    <div>------------------------------------------</div>
    <!-- 为什么v-for要添加key -->
    <!-- 快速查找节点，减少渲染次数，提升渲染性能，高效的更新虚拟dom -->
    <div>
        <div>2.为什么v-for要添加key</div>
        <input type="text" v-model="name">
        <button @click="add">添加</button>
        <ul>
            <li v-for="item in arr" :key="item.id">
                <input type="checkbox">{{item.name}}
            </li>
        </ul>
    </div>
    <div>------------------------------------------</div>
    <div>3.Vue2中diff算法原理</div>
    <div>vue2: 递归+双指针</div>
    <!-- 
        1.判断是不是同一元素，不是同一元素 直接替换
        2.是同一个元素 -》 比对属性是否相同 -》 比对各自的儿子（4种情况）
        A.老的有儿子，新的没有儿子
        B.老的没有儿子，新的有儿子
        C.都是文本的情况，只需要创建文本
        D.都有children = > vue2 采取双指针进行头头，尾尾 ， 头尾 ， 尾头 =》对比查找后进行复用
     -->
    <div>------------------------------------------</div>
     <div>4.watch和computed的区别</div>
     <!-- 
        1.computed: 计算属性，基于它们的响应式依赖进行缓存，只有在相关的依赖发生改变时才会重新计算，对于任何复杂的逻辑，我们就可以使用computed
        2.watch：侦听器，用于观察和监听页面上vue实例的变化,在数据变化的同时，要进行异步操作，或者比较大的开销
        3.methods: 给Vue定义方法,只要重新渲染，method调用总是会被执行
      -->

      <div>{{message}}</div>
      <!-- 调用几次计算几次， -->
      <div>methods翻转:{{reverseMsg()}}</div>
      <div>methods翻转:{{reverseMsg()}}</div>
      
      <!-- 只有message改变时才会触发，连续调用message也是只改变一次，性能会比methods更高-->
      <div>computed:{{reveserMessage}}</div>
      <div>computed:{{reveserMessage}}</div>
      <div>年龄:{{age}}</div>
      <button @click="addAge">增加年龄</button>
      <div>------------------------------------------</div>
      <div>5.vue中ref的作用</div>
      <!-- 
        1.获取页面中的DOM元素
        2.获取子组件对象
       -->
       <!-- 定义ref属性，用来给元素或者子组件注册引用信息，父组件通过$refs可以获取到对应的DOM元素和子组件信息 -->
       <p ref="p" id="pid">我是父组件中的p标签</p>
       <HelloWorld ref="helloworld"></HelloWorld>
       <div>------------------------------------------</div>
       6.vue中filter过滤器的使用
       <!-- 
        用于一些常见的文本格式化
        过滤器可以在不改变原始数据，只是对数据进行加工处理，并返回过滤后的数据，再进行调用处理

        局部过滤器

        -->
        <div v-for="(item,index) in list" :key="item.id">
            <div>
                <!-- 局部过滤器和全局过滤器的使用 -->
                <span>{{item.id}}{{item.name}}{{item.sex | sexFilter}} {{item.sex | mainsexFilter}}</span>
            </div>
        </div>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
export default {
    components:{
        HelloWorld,
    },
    data(){
        return{
            name: '小林',
            newId: 5,
            arr: [
                {id: 1,name: '张三', isShow: false},
                {id: 2,name: '李四', isShow: true},
                {id: 3,name: '王五', isShow: true},
                {id: 4,name: '赵六', isShow: false}
            ],
            message: 'helloworld',
            age: 20,

            list: [
                {id: 10, name: '小林',sex:1},
                {id: 20, name: '小李',sex:1},
                {id: 30, name: '小王',sex:1},
                {id: 40, name: '小赵',sex:0},
                {id: 50, name: '小丑',sex:0}
            ],
        }
    },
    computed:{
        filterArr(){
            return this.arr.filter(item=>{
                return item.isShow == true
            })
        },
        reveserMessage(){
            console.log(222);
            return this.message.split('').reverse().join('')
        }
    },
    methods: {
        add(){
            // console.log(1)
            this.arr.unshift({id:this.newId,name: this.name})
            this.name= ''
            console.log(this.arr.length);
        },
        reverseMsg(){
            // console.log(1);
            return this.message.split('').reverse().join('')
        },
        addAge(){
            this.age++
        }
    },
    watch:{
        age:function(newValue,oldValue){
            console.log('新数据age:',newValue);
            if(newValue > 25){
                console.log('毁灭吧');
            }
            console.log('旧数据age:',oldValue);
        }
    },
    mounted() {
        console.log(this.$refs)
        console.log(this.$refs.helloworld.message);
    },
    filters:{
        sexFilter(value){
            if(value ==0){
                return '男'
            }
            else{
                return '女'
            }
        }
    }
}
</script>

<style>

</style>