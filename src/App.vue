<template>
  <div id="app" :style="`background:${this.dayOrnight}; color:${this.TextColor};`">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'app',
  data(){
    return{
      textcolor: 'red'
    }
  },
  methods: {
    
  },
  computed:{
    ...mapState(['dayOrnight','TextColor'])
  },
}
</script>
<style scoped>
#app {
  width: 100vw;
  min-height: 100vh;
  /* color: pink; */
}

</style>
