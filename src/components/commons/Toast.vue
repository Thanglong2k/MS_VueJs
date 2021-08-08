<template>
    <div v-if="isShow" class="toast"
        :class="'toast-'+data.type"
    >
        <div class="toast-icon">
            <i :class="icons[data.type]"></i>
        </div>
        <div class="toast-body">
            
            <p class="toast-msg">{{data.text}}</p>
        </div>
        <div class="toast-close" @click="closeToast()">
            <i class="fas fa-times"></i>
        </div>
    </div>
</template>

<script>
export default {
  name:"Toast",
  props:{
    a:{
      type:Array,
      default:()=>{}
    }
  },
  data() {
    return {
      isShow:false,
      data:{
        type: "toast-default",
        text: "",
      },
      icons:{
        success:'fas fa-check-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle',
        error: 'fas fa-exclamation-circle',
      }
      
    }
  },
  mounted() {
    //nhận yêu cầu mở Toastmessage
    this.$bus.on("openToast",value=>{
      let me=this;
      me.openToast(value);
      
      setTimeout(function() {
        me.closeToast();
      }, 3000);
    })
  },
  destroyed() {
    this.$bus.off("openToast",value=>{
      let me=this;
      me.openToast(value);

      setTimeout(function() {
        me.closeToast();
      }, 3000);
    })
  },
  methods: {
    /**
     * mở toast
     * Craete by TTLONG 18/07/2021
     */
    openToast(value) {
      let me = this;
      this.isShow=true;
      
      this.data = value;
      setTimeout(function() {
        me.closeToast();
        
      }, 3000);
    },
    /**
     * đóng toast
     * Craete by TTLONG 18/07/2021
     */
    closeToast() {
      this.isShow = false;
    },
  }
}
</script>

<style>
@import url("../../assets/css/common/alert.css");
</style>