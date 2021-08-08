<template>
    <div class="form-item">
        <div v-if="isRequired"
             class="m-label"
        >
            {{inputLabel}} (<span class="required">*</span>)
        </div>
        <div v-else class="m-label">{{inputLabel}}</div>
        <div class="tooltip width-form" >
            <div class="input" :class="{'error-border':isError}">
                <input 
                    autocomplete="off"
                    class="m-control"                     
                    :id="id" 
                    v-model="inputValue"
                    @input="getInputValue()"
                    :type="type"
                    :placeholder="placeholder"
                    @blur="blur"
                    ref="focus"
                />
                <span v-if="isMoney" class="placeholder-input-area">
                    <span class="placeholder-money">
                        <i>VNĐ</i>
                    </span>
                </span>
                <span v-if="isShowClear" class="clear-input-area">
                    <span  class="clear-input" @click="clearInput()">
                        
                    </span>
                </span>
            </div>
            <span class="tooltip-alert">{{errorText}}</span>
        </div>

    </div>
</template>

<script>
export default {
    name:"InputForm",
    props:{
        inputLabel:{
            type:String,
            default:""
        },
        id:{
            type:String,
            default:""
        },
        type:{
            type:String,
            default:""
        },
        text:{
            type:[String,Number],
            default:""
        },
        placeholder:{
            type:String,
            default:""
        },
        isRequired:{
            type:Boolean,
            default:false
        },
        typeInput:{
            type:String,
            default:""
        },
        isMoney:{
            type:Boolean,
            default:false
        },
        errorMessage:{
            type:Object,
            default:()=>{}
        }
        // ,
        // data:{
        //     type:Object,
        //     default:{}
        // }
    },
    data() {
        return {           
            inputValue:"",
            isShowClear:false,
            isError:false,
            errorText:"",
            validate:false

        }
    },
    created() {
        // if(this.isRequired){
        //     this.isError=true;
        //     this.errorText="Trường này không được bỏ trống";
        // }
        /**
         * Xét mặc định cho date là null
         * CreatedBy: TTLONG (06/08/2021)
         */
        if(this.type=="date")
        {
            this.inputValue=null;
        }   
       
        this.inputValue=this.text;
    },
    
    methods:{
        /**
         * Lấy giá trị Input gửi lên Form
         * CreatedBy: TTLONG (20/07/2021)
         */
        getInputValue(){
            if(this.inputValue!=""){
                this.isShowClear=true;
            }
            else{
                this.isShowClear=false;
            }
            this.$emit("getInputData",this.inputValue,this.id);

        },
        /**
         * Xóa input
         * CreatedBy: TTLONG (20/07/2021)
         */
        clearInput(){
            this.inputValue="";
            this.$refs.focus.focus();
            this.isShowClear=false;
        },
        /**
         * blur ra khỏi input và check các input được required
         * CreatedBy: TTLONG (20/07/2021)
         */
        blur(){
            let me=this;
            if(this.isRequired && this.inputValue==""){
                this.isError=true;
                this.errorText="Trường này không được bỏ trống";
                
            }
            else{
                if(this.typeInput=="email"){
                    let regex=/^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
                    me.validateData(this.inputValue,regex,this.inputLabel);
                    return;
                }
                if(this.typeInput=="phoneNumber"){
                    let regex=/^(0|(\+84)){1}(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;//0328564125,+84328564125
                    me.validateData(this.inputValue,regex,this.inputLabel);
                    return;
                }
                if(this.typeInput=="identityNumber"){
                    let regex=/^[0-9]{12}$/;
                    me.validateData(this.inputValue,regex,this.inputLabel);
                    return;
                }
                // các trường không có validate
                this.isError=false;
                this.errorText="";
            }
            this.$emit("isError",this.isError);
        },
        /**
         * check email
         * CreatedBy: TTLONG (20/07/2021)
         */
        validateEmail(value){
            let regex=/^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regex.test(value)) {
                this.isError=true;
                this.errorText="Bạn đã nhập sai định dạng email";
                //$(this).siblings(".tooltip-alert").text( "Bạn đã nhập sai định dạng email");
                //$(this).attr("validate", false);
            } else {
                this.isError=false;
                this.errorText="";
            }
        },
        /**
         * check phone number
         * CreatedBy: TTLONG (20/07/2021)
         */
        validatePhoneNumber(value){
            let regex=/^(0|(\+84)){1}(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;//0328564125,+84328564125
                if (!regex.test(value)) {
                    this.isError=true;
                    this.errorText="Bạn đã nhập sai định dạng số điện thoại";
                    
                } else {
                    this.isError=false;
                    this.errorText="";
                }
        },
        /**
         * check cmnd/cccd
         * CreatedBy: TTLONG (20/07/2021)
         */
        validateIdentityNumber(value){
            let regex=/^[0-9]{12}$/;
                if (!regex.test(value)) {
                    this.isError=true;
                    this.errorText="Bạn đã nhập sai định dạng CMND/CCCD";
                    
                } else {
                    this.isError=false;
                    this.errorText="";
                }
        },
        /**
         * check dữ liệu
         * CreatedBy: TTLONG (20/07/2021)
         */
        validateData(value,regexString,label){
                if (!regexString.test(value)) {
                    this.isError=true;
                    this.errorText="Bạn đã nhập sai định dạng "+label;
  
                } else {
                    this.isError=false;
                    this.errorText="";
                }
                this.$emit("isError",this.isError);
        }
    },
    watch:{
        
        /**
         * nếu có lỗi từ baseDialog truyền vào thay đổi sẽ tìm trường lỗi và gán các giá trị lỗi
         * CreatedBy: TTLONG (06/08/2021)
         */
        
        errorMessage(){
            if(this.errorMessage.Data==this.id){
                this.isError=true;
                this.errorText=this.errorMessage.UserMsg;
            }
        }
    }
    // watch:{
    //     isError(){
    //         console.log(this.isError);
    //         // if(this.isError){
    //         //     this.$emit("isError");
    //         // }
    //     }
    // }
    // ,
    // watch:{
    //     inputValue(){
    //         this.$emit("getInputData",this.inputValue,this.id);
    //         console.log(this.inputValue);
    //     }
    // }
}
</script>

<style>

</style>