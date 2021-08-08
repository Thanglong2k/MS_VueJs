<template>
  <div v-if="isShow" class="loading">
        <div class="loading-modal"></div>
        <div class="loading-icon"></div>

    </div>
</template>

<script>
export default {
  name:"Loading",
  data() {
    return {
      isShow:false
    }
  },
  mounted() {
    let me=this;
    //bắt sự kiện bật loading được gọi đến
    this.$bus.on("onLoading",()=>{
      me.onLoading();
    });
    //bắt sự kiện tắt loading được gọi đến
    this.$bus.on("offLoading",()=>{
      me.offLoading();
    });
  },
  methods: {
    /**
     * Bật loading
     * CreatedBy: TTLONG (16/07/2021)
     */
    onLoading(){
      this.isShow=true;

    },
    /**
     * Tắt loading
     * CreatedBy: TTLONG (16/07/2021)
     */
    offLoading(){
      this.isShow=false;

    }
  },

}
</script>

<style>

</style>