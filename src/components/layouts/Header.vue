<template>
   <div class="header">
        <div class="header-left">
            <div class="logo-site">
                <div class="logo-box">
                    <div class="toggle-icon"
                        id="toggle-icon"
                        @click="toggleNavbar()"
                    ></div>
                    <div class="amis-logo"></div>
                </div>

            </div>
        </div>
        <div class="header-right">
            <div class="header-region">
               
                <Dropdown
                    id="dropdown-restaurent"
                    :datas="Address"
                    :isDropdown="isDropdown"

                />
            </div>
            <!-- header right -->
            <div class="account-info">
                <!-- icon bell -->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                </svg>
                <div class="right-item account-avartar"></div>
                <div class="right-item account-name">
                    Trần Thăng Long
                </div>
                
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots right-item" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
            </div>
        </div>



    </div>
</template>

<script>
import Dropdown from '../commons/Dialogs/Dropdown.vue'
export default {
    name:"Header",
    components: { Dropdown },
    data() {
        return {
            Address:[
                {value:0, text:"Nhà hàng Biển Đông"},
                {value:1, text:"Misa miền Bắc"},
                {value:2, text:"Misa miền Nam"}
            ],
            isDropdown:true
        }
    },
    methods: {
        /**
         * Thu hẹp, mở rộng navbar
         * CreatedBy: TTLONG (24/07/2021)
         */
        toggleNavbar(){
            this.$bus.emit("toggleNavbar");

        }
    },

}
</script>

<style>
    @import url("../../assets/css/common/header.css");
</style>