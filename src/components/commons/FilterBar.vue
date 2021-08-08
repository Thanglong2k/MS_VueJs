<template>
  <div class="filter-bar">
            <div class="filter-left">
                <input class="icon-search input-search"
                        type="text" 
                        placeholder="Tìm kiếm theo Mã, Tên nhân viên" 
                        v-model="inputSearch"
                        @input="search"        
                />
                <Dropdown 
                    id="dropdown-department"
                    :datas="departments"
                    @selectItemDropdown="dataDropdown"
                    :firstItemDropdown="firstItemDropdown[0]"
                />
                <Dropdown 
                    id="dropdown-position"
                    :datas="positions"
                    @selectItemDropdown="dataDropdown"
                    :firstItemDropdown="firstItemDropdown[1]"

                />
                <!-- <Combobox
                    id="dropdown-department"
                    :datas="departments"
                    @selectItemDropdown="dataDropdown"
                    :firstItemDropdown="firstItemDropdown[0]"
                /> -->
            </div>


            <div class="filter-right">
                <button class="m-second-button m-btn-delete" 
                        id="btnDelete"
                        @click="confirmDelete()"
                        title="Xóa nhân viên"
                ></button>
                <button class="m-second-button m-btn-refresh" 
                        id="btnRefresh"
                        @click="refreshTable()"
                        title="Tải lại dữ liệu bảng"
                ></button>
            </div>
        </div>
</template>

<script>

import Dropdown from "../commons/Dialogs/Dropdown.vue"
import EmployeeAPI from "../../api/components/EmployeeApi.js"
export default {
    name:"FilterBar",
    components:{
        Dropdown
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
        selectedEmployeeIds:{
            type:Array,
            default:null
        }
    },
    data() {
        return {
            hideDepartment:false,
            hidePosition:false,
            idDropdown:"",
            inputSearch:"",
            firstItemDropdown:[
                {value:"",text:"Tất cả phòng ban"},
                {value:"",text:"Tất cả vị trí"}
            ],
                
            

        }
    },
    
    created() {

    },
    mounted() {
        let me=this;
        //bắt sự kiện xóa bản ghi được gọi đến
        this.$bus.on("deleteRecord",()=>{
            me.deleteEmployees();
        })
    },
    methods:{
        /**
         * click ẩn/hiện item dropdown
         * Craete by TTLONG 14/07/2021
         */
        dropdownMenu(event){
            //this.hideDepartment=!this.hideDepartment;
            if(event.target.parentElement.getAttribute("id")=="dropdown-department"){
                this.hideDepartment=!this.hideDepartment;
                return this.hideDepartment;
            }else if(event.target.parentElement.getAttribute("id")=="dropdown-position"){
                this.hidePosition=!this.hidePosition;
                return this.hidePosition;
            }
        },
        /**
         * xác nhận delete employee
         * Craete by TTLONG 25/07/2021
         */
        confirmDelete(){
            if(this.selectedEmployeeIds.length==0){
                this.$bus.emit("openPopup",{
                    title : 'Thông báo',
                    message : 'Bạn chưa chọn nhân viên muốn xóa.',
                    textButtonLeft: "Hủy",
                    textButtonRight: "Đóng",
                    hideButtonLeft:"none",
                    typeButtonLeft: "popup-left",
                    typeButtonRight: "green",
                    iconColor:"yellow",
                    typePopup:""
                })
            }
            else{
                this.$bus.emit("openPopup",{
                title : 'Xóa thông tin',
                message : 'Bạn có chắc chắn muốn xóa nhân viên không?',
                textButtonLeft: "Hủy",
                textButtonRight: "Xóa",
                hideButtonLeft:"visible",
                typeButtonLeft: "popup-left",
                typeButtonRight: "red",
                iconColor:"red",
                typePopup:"delete"
            })
            }
            
        },
        /**
         * xóa employee
         * Craete by TTLONG 14/07/2021
         */
        deleteEmployees(){

            
           let me=this;
           for(let item in this.selectedEmployeeIds){
                
                EmployeeAPI.delete(this.selectedEmployeeIds[item])
                .then(
                    ()=>{
                        
                       
                        this.$bus.emit("openToast",{
                            type: "success",
                            text: "Xóa nhân viên thành công",
                        });
                        me.refreshTable();  
                        
                        this.$emit("setSelectedEmployeeId",[]);
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
                
            }
            // for(let item in this.selectedEmployeeIds){
                
            //     axios
            //     .delete("http://cukcuk.manhnv.net/v1/Employees/"+this.selectedEmployeeIds[item])
            //     .then(()=>{
            //         this.selectedEmployeeIds.splice(this.selectedEmployeeIds.indexOf(this.selectedEmployeeIds[item]), 1);
                  
            //     })
                
            // }
            
        },
        /**
         * Gửi dữ liệu được nhập trong input về Content để lấy nội dung filter
         * CreatedBy: TTLONG (21/07/2021)
         */
        search(){

            this.$emit("searchText",this.inputSearch);

        },
        /**
         * load table
         * Craete by TTLONG 14/07/2021
         */
        refreshTable(){
            
            this.$bus.emit("loadData");

        },
        /**
         * Gửi dữ liệu được chọn trong dropdown về Content để lấy nội dung filter
         * CreatedBy: TTLONG (21/07/2021)
         */
        dataDropdown(data,id){
            this.$emit("dataDropdown",data,id);
        }      
        

    }
}
</script>

<style>
@import url("../../assets/css/common/toolbar.css");
</style>