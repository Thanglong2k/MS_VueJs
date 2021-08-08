<template>
  <div class="m-dialog dialog-detail" >
        <div class="dialog-modal"></div>
        <div class="dialog-content">
            <div class="dialog-header">
                <div class="dialog-header-title">Thông tin nhân viên</div>
                <div class="dialog-header-close">
                    <button id="btnClose" @click="closeDialog()"></button>
                </div>
            </div>
            <div class="dialog-body">
                <div class="dialog-body-left">
                    <div class="img-field">
                      
                    </div>
                    <div class="img-required">
                        (Vui lòng chọn ảnh có định <br> dạng <br>.jpg .jpeg .png .gif)
                    </div>
                </div>
                <div class="dialog-body-right" autocomplete="off">

                    <div class="form-group">
                        <div class="form-title">
                            A. THÔNG TIN CHUNG
                        </div>
                        <div class="form-title-solid"></div>
                        <div class="form-content">
                            <div class="m-row">
                                <InputForm
                                    id="EmployeeCode"
                                    inputLabel="Mã nhân viên"
                                    type="text"    
                                    :isRequired=true                              
                                    :text="Employee.EmployeeCode"
                                    @getInputData="getInputData"
                                    :errorMessage="errorMessage"
                                    
                                />
                                <InputForm
                                    id="FullName"
                                    inputLabel="Họ và tên"
                                    type="text"   
                                    :isRequired=true                               
                                    :text="Employee.FullName"
                                    @getInputData="getInputData"
                                    @isError="errorTrue"
                                    
                                    :errorMessage="errorMessage"
                                    ref="FullName"
                                />
                            </div>
                             <div class="m-row">
                                <InputForm
                                    id="DateOfBirth"
                                    inputLabel="Ngày sinh"
                                    type="date"                                  
                                    :text="Employee.DateOfBirth"
                                    @getInputData="getInputData"
                                    @isError="errorTrue"
                                    :error="isError"
                                    :errorMessage="errorMessage"

                                />
                                <div class="form-item">
                                    <div class="m-label">Giới tính</div>
                                    <Dropdown 
                                        id="Gender"
                                        class="width-form"
                                        :datas="genders"
                                        :text="Employee.Gender"
                                        @selectItemDropdown="selectItemDropdown"
                                    />
                                </div>

                            </div>
                            <div class="m-row">

                                 <InputForm
                                    id="IdentityNumber"
                                    inputLabel="Số CMND/ Căn cước"
                                    type="text"   
                                    typeInput="identityNumber"          
                                    :isRequired=true                     
                                    :text="Employee.IdentityNumber"
                                    @getInputData="getInputData"
                                    @isError="errorTrue"
                                    
                                    :errorMessage="errorMessage"
                                    ref="IdentityNumber"
                                />
                                <InputForm
                                    id="IdentityDate"
                                    inputLabel="Ngày cấp"
                                    type="date"                                  
                                    :text="Employee.IdentityDate"
                                    @getInputData="getInputData"
                                    @isError="errorTrue"
                                    
                                    :errorMessage="errorMessage"
                                />

                            </div>
                            <div class="m-row">
                                <InputForm
                                    id="IdentityPlace"
                                    inputLabel="Nơi cấp"
                                    type="text"
                                    :text="Employee.IdentityPlace"
                                    @getInputData="getInputData"
                                    :errorMessage="errorMessage"
                                />
                                <div class="form-item"></div>

                            </div>
                            <div class="m-row"> 
                                <InputForm
                                    id="Email"
                                    inputLabel="Email"
                                    type="email"
                                    typeInput="email"
                                    :isRequired=true
                                    placeholder="example@gmail.com"
                                    :text="Employee.Email"
                                    @getInputData="getInputData"
                                    @isError="errorTrue"
                                    
                                    :errorMessage="errorMessage"
                                    ref="Email"
                                />
                                <InputForm
                                    id="PhoneNumber"
                                    inputLabel="Số điện thoại"
                                    type="text"
                                    typeInput="phoneNumber"
                                    :isRequired=true
                                    :text="Employee.PhoneNumber"
                                    @getInputData="getInputData"
                                    @isError="errorTrue"
                                    
                                    :errorMessage="errorMessage"
                                    ref="PhoneNumber"
                                />
                               
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-title">
                            B. THÔNG TIN CÔNG VIỆC
                        </div>
                        <div class="form-title-solid"></div>
                        <div class="form-content">
                            <div class="m-row">
                                <div class="form-item">
                                    <div class="m-label">Vị trí</div>
                                    <Dropdown 
                                        id="PositionId"
                                        class="width-form"
                                        :datas="positions"
                                        :text="Employee.PositionId"
                                        @selectItemDropdown="selectItemDropdown"
                                    />
                                </div>
                                <div class="form-item">
                                    <div class="m-label">Phòng ban</div>
                                    <Dropdown 
                                        id="DepartmentId"
                                        class="width-form"
                                        :datas="departments"
                                        :text="Employee.DepartmentId"
                                        @selectItemDropdown="selectItemDropdown"  
                                    />
                                </div>
                            </div>
                            <div class="m-row">
                                <InputForm
                                    id="PersonalTaxCode"
                                    inputLabel="Mã số thuế cá nhân"
                                    type="text"
                                    typeInput="number"
                                    @getInputData="getInputData"
                                    @isError="errorTrue"
                                    
                                    :errorMessage="errorMessage"
                                />
                                <InputForm
                                    id="Salary"
                                    inputLabel="Mức lương cơ bản"
                                    type="text"
                                    :text="Employee.Salary"
                                    typeInput="number"
                                    @getInputData="getInputData"
                                    :isMoney="true"
                                    @isError="isError"
                                   
                                    :errorMessage="errorMessage"
                                />
                            </div>
                            <div class="m-row">
                                <InputForm
                                    id="JoinDate"
                                    inputLabel="Ngày gia nhập công ty"
                                    type="date"
                                    :text="Employee.JoinDate"
                                    @getInputData="getInputData"
                                    @isError="errorTrue"
                                    
                                    :errorMessage="errorMessage"

                                />
                                <div class="form-item">
                                    <div class="m-label">Tình trạng công việc</div>
                                    
                                    <Dropdown 
                                        id="dropdown-form-workstatus"
                                        class="width-form"
                                        :datas="workStatuses"
                                        :text="Employee.WorkStatus"
                                        @selectItemDropdown="selectItemDropdown"
                                    />
                                    
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="dialog-footer">
                <button class="btn-default btnForm" 
                        id="btnCancel" 
                        Command="Cancel" 
                        @click="closeDialog()"
                        title="Hủy thông tin đang nhập"
                >
                    Hủy
                </button>
                <button class="btn-default btn-green btnForm" 
                        id="btnSave" 
                        Command="Save" 
                        @click="saveEmployee()"
                        title="Lưu lại thông tin"
                >
                    <div class="m-btn-icon icon-save"></div>
                    <div class="btn-text">Lưu</div>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import Dropdown from './Dropdown.vue'
import EmployeeAPI from '../../../api/components/EmployeeApi.js'
import InputForm from './InputForm.vue'

export default {
    name:"BaseDialog",
    components:{
        Dropdown,
        InputForm
    },
    props:{
        positions:{
            type:Array,
            default:null
        },
        departments:{
            type:Array,
            default:null
        },        
        Employee:{
            Type:Object,
            default:null
        },
        formMode:{
            type:String,
            default:""
        }
    },
    
    data(){
        
        return {
            Employees:[],
            workStatuses:[
                {value:0, text:"Đang làm việc"},
                {value:1, text:"Đã nghỉ làm"},
                {value:2, text:"Khác"}
            ],
            genders:[
                {value:0, text:"Nữ"},
                {value:1, text:"Nam"},
                {value:2, text:"Không xác định"},
            ],
            isError:false,
            errorMessage:{
                Success:"",
                Data: "",
                DevMsg:"",
                UserMsg:"",
                MISACode:"",
            },
            required:[]
        }
        
    },
    created() {    
    

        
    },
    methods:{
        /*
        * close form employee detail
        * Create by TTLONG 14/7/2021
        */
        closeDialog(){
            //truyền về cha
            //this.$emit("changeDisplayFalse");
            //gọi sự kiện mở popup
            this.$bus.emit("openPopup",{
                title : 'Đóng form thông tin',
                message : 'Bạn có chắc chắn muốn đóng form nhập thông tin nhân viên không?',
                textButtonLeft: "Tiếp tục nhập",
                textButtonRight: "Đóng",
                hideButtonLeft:"visible",
                typeButtonLeft: "popup-left",
                typeButtonRight: "green",
                iconColor:"yellow",
                typePopup:"closeDialog"
            })
        
            
        },
        /*
        * lưu thông tin nhân viên gồm : thêm, sửa
        * Create by TTLONG 17/7/2021
        */
        async saveEmployee(){
            await Object.keys(this.$refs).forEach(el => {
                this.$refs[el].blur();
                
            })
            //this.$refs.required.blur();
            if(this.isError){
                this.$bus.emit("openToast",{
                    type: "error",
                    text: "Lỗi! Vui lòng liên hệ MISA",
                })
                console.log("al");

            }
            else{
               
                switch(this.formMode){
                case "Add":
                    //bật loading
                    
                    //Thêm dữ liệu 
                    EmployeeAPI.insert(this.Employee)
                    .then(
                        ()=>{

                            this.$bus.emit("openToast",{
                                type: "success",
                                text: "Thêm nhân viên thành công",
                            });
                           
                            //Gọi sang component Loading để open Loading
                            this.$bus.emit("onLoading");
                            //Gọi sang component Grid để reload data
                            this.$bus.emit("loadData");
                            //Gọi sang component Loading để close Loading
                            this.$bus.emit("offLoading");
                            //Gọi sang component Content để close Dialog

                            this.$bus.emit("closeDialog");
                            
                        }
                    )
                    .catch(
                        (res)=>{
                            
                            this.$bus.emit("openToast",{
                                type: "error",
                                text: "Lỗi! Vui lòng liên hệ MISA",
                            })

                            this.errorMessage=res.response.data;

                        }
                    )
                    break;
                case "Edit":
                    //bật loading
                    
                    //Cập nhật dữ liệu
                    await EmployeeAPI.update(this.Employee.EmployeeId,this.Employee)
                    .then(
                        ()=>{
                            this.$bus.emit("openToast",{
                                type: "success",
                                text: "Sửa nhân viên thành công",
                            });
                     
                            //Gọi sang component Loading để open Loading
                            this.$bus.emit("onLoading");
                            //Gọi sang component Grid để reload data
                            this.$bus.emit("loadData");
                            //Gọi sang component Loading để close Loading
                            this.$bus.emit("offLoading");
                            //Gọi sang component Content để close Dialog

                            this.$bus.emit("closeDialog");
                        }
                    )
                    .catch(
                        ()=>{
                            this.$bus.emit("openToast",{
                                type: "error",
                                text: "Lỗi! Vui lòng liên hệ MISA",
                            })
                        }
                    )
                    break;

                }
            }
            
            
            
        },
        
        /**
         * reset form
         * Craete by TTLONG 19/07/2021
         */
        resetForm(){
            this.$emit("resetForm");
            
        },
        /**
         * check id các dropdown để gán đúng thuộc tính
         * Craete by TTLONG 19/07/2021
         */
        selectItemDropdown(data,id){
            
            this.Employee[id]=data.value;
  
        },
        /**
         * lấy dữ liệu ô InputForm
         * Craete by TTLONG 19/07/2021
         */
        getInputData(data,id){
            
            this.Employee[id]=data;
    
            
        },
        errorTrue(error){
            if(error){
                this.isError=true;
            }
            else{
                this.isError=false;
            }
            
        },
        /**
         * định dạng ngày tháng
         * Craete by TTLONG 16/07/2021
         */
        formatDate(dateTime,type){
            if(dateTime==""|| dateTime==null){
                    return "";
                }
            var date = new Date(dateTime);
            if (Number.isNaN(date.getTime())) return "";
            var day = date.getDate(),
                month = date.getMonth() + 1,
                year = date.getFullYear();
            day = day < 10 ? "0" + day : day;
            month = month < 10 ? "0" + month : month;
            if(type==2){
                return year + "-" + month + "-" + day;
            }
            return day + "/" + month + "/" + year;
        },
        // validateForm(){
        //     $("InputForm[required]").blur(function () {
        //     //kiểm tra dữ liệu đã nhập , nếu để trống thì cảnh báo:

        //     let value = $(this).val();
        //     if (!value) {
        //         $(this).addClass("error-border");
        //         //$(this).attr("title", "Trường này không được phép để trống.");
        //         $(this).siblings(".tooltip-alert").text("Trường này không được phép để trống.");
        //         $(this).attr("validate", false);
        //     }
        //     else {
        //         $(this).removeClass("error-border");
        //         $(this).attr("validate", true);
        //     }

        // })
        //}
    }
}
</script>

<style>
@import url("../../../assets/css/common/common.css");
/* @import url("../../../assets/css/common/tooltip.css"); */
@import url("../../../assets/css/page/employee.css");
</style>
                