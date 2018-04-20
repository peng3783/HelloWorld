<template>
   <div>
      <div>
      <button @click="add" >+1</button>
      <button @click="decrement" >-1</button>
    </div>
    <div>
      <input type="text" v-model="incrementValue">
      <button @click="incrementWithValue">incrementWithValue</button>
    </div>
    <input type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox">{{checked}}</label>
    <input type="checkbox" id="checkbox1" v-model="checked1">
    <label for="checkbox1">{{checked1}}</label>
   </div>
</template>

<script>
    import {mapActions} from "vuex";
    export default {
      name: "increment",
      data(){
        return {
          incrementValue:0,
          checked:false,
          checked1:true
        }
      },
      methods:{
        ...mapActions(["decrement"]),
        ...mapActions({
          add:"increment"
        }),
        incrementWithValue(){
          try{
            this.$store.dispatch("incrementWithValue",this.incrementValue)
          }catch(e){
            console.log(e);
          }
        }
      }
    }
</script>

<style scoped>
  button {
    width: 100px;
    height: 100px;
    font-size:30px;
  }
</style>
