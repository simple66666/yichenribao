<template>
  <div class="hello">
    {{message}}
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data(){
        return{
            message: '我是子组件的数据'
        }
    },
    methods: {
        add(num1,num2){
            return num1 + num2
        }
    },
}
</script>

<style>

</style>