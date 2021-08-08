<template>
  <div id="app">
    <!-- header -->
    <Header/>
    <!-- navbar -->
    <navbar/>
    <!-- main view -->
    <Main msg="Welcome to Your Vue.js App"/>
    <!-- loading -->
    <Loading/>
    <!-- toast -->
    <div id="toast" >
      <Toast/>
      
    </div>
    
    <!-- Popup -->
    <Popup/>
  </div>
</template>

<script>
import Loading from './components/commons/Loading.vue'
import Popup from './components/commons/Popup.vue'
import Toast from './components/commons/Toast.vue'
import Header from './components/layouts/Header.vue'
import Main from './components/layouts/Main.vue'
import Navbar from './components/layouts/Navbar.vue'



export default {
  name: 'App',
  components: {
    Main,
    Navbar,
    Header,
    Loading,
    Toast,
    Popup
  },
  data() {
    return {
      isToggleNavbar:true,
      a:[
        
      ]

      
    }
  },
}
</script>

<style>
    @import "./assets/css/common/main.css";
    @import "./assets/css/common/common.css";
    /* body{
      margin:0;
      font-size: 13px;
      
    } */
    #toast{

    }
</style>
