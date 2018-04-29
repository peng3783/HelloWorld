<template>
  <div>I am seller</div>
</template>

<script>
export default {
   beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = true;
      next();
  }
}
</script>

<style lang="stylus" scoped>

</style>
