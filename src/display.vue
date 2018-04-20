<template>
    <div>
      <h3>Count is {{count}}</h3>
      <p>组件自己的内部计算属性{{localComputed}}</p>
    </div>
</template>

<script>
  import {mapState} from "vuex";  //引入mapState
    export default {
      name: "display",
      computed :{
        localComputed(){
          return this.count+10;
        },
        ...mapState(["count"])
      }
    }
</script>

<style scoped>

</style>
