<template>
  <div class="navbar" :class="{'navbar-toggle_navbar':!isToggleNavbar}">

        <div class="navbar-content" >
            <router-link class="nav-item" :to="item.link" v-for="(item,index) in data" :key="index" :title="item.text">
                <div class="nav-item-icon" :class="item.icon"></div>
                <div class="nav-item-text" :style="isToggleNavbar==true?{'display':'block'}:{'display':'none'}">{{item.text}}</div>
            </router-link>
            
        </div>
    </div>
</template>

<script>
export default {
    name:"Navbar",
    data() {
        return {
            isToggleNavbar:true,
            data:[
                {icon:"nav-item-document-online",link:"#",text:"Hồ sơ điện tử"},
                {icon:"nav-item-document-online",link:"#",text:"Hồ sơ giấy"},
                {icon:"nav-item-report",link:"#",text:"Theo dõi chi"},
                {icon:"nav-item-dic-employee",link:"/",text:"Danh mục nhân viên"},
                {icon:"nav-item-dic-employee",link:"/customer",text:"Danh mục khách hàng"},
                {icon:"nav-item-setting",link:"#",text:"Thiết lập"}
                
            ]
        }
    },
    mounted() {
        //lắng nghe sự kiện toggleNavbar
        this.$bus.on("toggleNavbar",()=>{
            this.isToggleNavbar=!this.isToggleNavbar;
        })
    },
}
</script>

<style>
    @import url("../../assets/css/common/navbar.css");
    .navbar-toggle_navbar{
        width: 52px !important;
    }
</style>