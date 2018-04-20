<template>
  <div id="app">
    <Nav></Nav>
    <display></display>
    <increment></increment>
   <!--  <p>{{message}}</p>
    <input type="text" v-model='message' /> -->
  </div>
</template>

<script>
  import display from './display.vue';
  import increment from './increment.vue';
  import Nav from './components/Nav.vue';
  export default{
    data(){
      return {
        message:'Hello Vue.js'
      }
    },
    components:{
      display,
      increment,
      Nav
    }
  }
</script>

<style>
  #app {
    text-align:center;
  }
</style>
