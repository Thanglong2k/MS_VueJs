<template>
<div v-if="isShow" class="m-dialog">
    <div class="dialog-modal dialog-popup"></div>
    <div class="popup-content">
        <div class="dialog-header">
            <div class="dialog-header-title">{{data.title}}</div>
            <div class="dialog-header-close">
                <button id="btnClosePopup" @click="cancelEvent()"></button>
            </div>
        </div>
        <div class="dialog-body">
            <div class="dialog-body-icon"
                :class="'icon-'+data.iconColor"
            >
                <i :class="icon"></i>
            </div>
            <div class="dialog-body-message">{{data.message}}</div>
        </div>
        <div class="dialog-footer">
            <button class="btn-default" 
                    :class="'btn-'+data.typeButtonLeft"
                    :style="'display:'+data.hideButtonLeft"
                    id="btnLeft"
                    @click="cancelEvent()"
                    :title="data.textButtonLeft"
            >
                {{data.textButtonLeft}}
            </button>
            <button class="btn-default" 
                    :class="'btn-'+data.typeButtonRight"
                    id="btnRight"
                    @click="confirmEvent()"
                    :title="data.textButtonRight"
            >
                {{data.textButtonRight}}
            </button>
        </div>
    </div>
</div>
</template>

<script>

export default{
    name:"Popup",
    data() {
        return {
            isShow:false,
            icon:'fas fa-exclamation-triangle',
            data:{
                title : '',
                message : '',
                textButtonLeft: "",
                textButtonRight: "",
                hideButtonLeft:"",
                typeButtonLeft: "",
                typeButtonRight: "",
                iconColor:"",
                typePopup:""
            }
        }
    },
    mounted() {
        /**
         * lắng nghe mở openUp
         * Craete by TTLONG 19/07/2021
         */
        this.$bus.on("openPopup",value=>{
            let me=this;
            me.openPopup(value);
        })
    },
    destroyed() {
        /**
         * tắ sự kiện lắng nghe openUp
         * Craete by TTLONG 19/07/2021
         */
        this.$bus.on("openPopup",value=>{
            let me=this;
            me.openPopup(value);
        })
    },
    methods: {
        /**
         * mở popup
         * Craete by TTLONG 18/07/2021
         */
        openPopup(value) {
            this.data = value;
            this.isShow = true;
           

        },
        /**
         * đóng popup
         * Craete by TTLONG 18/07/2021
         */
        cancelEvent() {
            this.isShow = false;
            
        },
        /**
         * đóng popup và xác nhận sự kiện dialog
         * Craete by TTLONG 18/07/2021
         */
        confirmEvent() {
            this.isShow = false;
            if(this.data.typePopup=="closeDialog"){
                this.$bus.emit("closeDialog");
            }
            else if(this.data.typePopup=="delete"){
                this.$bus.emit("deleteRecord");
            }
            
        }
    }
}
</script>

<style>
@import url("../../assets/css/common/popup.css");
</style>