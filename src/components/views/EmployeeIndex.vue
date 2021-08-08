<template>
  
    <div class="content" :class="{'content-toggle_navbar':!isToggleNavbar}">
        <div class="header-content">
            <div class="title">Danh sách nhân viên</div>
            <div class="content-feature">
                <button class="m-btn m-btn-default" id="btnAdd" v-on:click="openDialog()" title="Thêm nhân viên">
                    <div class="m-btn-icon icon-add"></div>
                    <div class="btn-text">Thêm nhân viên</div>
                </button>
            </div>
        </div>
        <FilterBar v-if="isOk" :positions="Positions"
                    :departments="Departments"
                    :selectedEmployeeIds="selectedEmployeeIds"
                    @dataDropdown="dataDropdownSelected"
                    @searchText="searchText"
                    v-on:setSelectedEmployeeId="setSelectedEmployeeId"
                    
        />
        <Grid v-on:changeDisplayTrue="displayTrue"
               :employeeId="employeeId" 
               :Employee="Employee"  
               :formMode="FormMode"
               v-on:setSelectedEmployeeId="setSelectedEmployeeId"
               :dataFilter="dataFilter"
               @filterData="filterData"
               :pagination="pagination"
               ref="loadData"
               :itemSelecteds="itemSelecteds"
               
        />
        <Paging :pagination="pagination"
                @changePageSize="changePageSize"
                @changeCurrentPage="changeCurrentPage"
                
        />
        <EmployeeDialog  v-if="isDisplay"
            v-on:changeDisplayFalse="displayFalse"
            :employeeId="employeeId"
            :Employee="Employee"
            :positions="Positions"
            :departments="Departments"
            :formMode="FormMode"  
            v-on:resetForm="resetForm"                
        />
    </div>
</template>

<script>
import EmployeeDialog from './EmployeeDialog.vue'
import FilterBar from './EmployeeFilterBar.vue'
import Grid from '../commons/Grid.vue'
import Paging from '../commons/Paging.vue'
import EmployeeAPI from "../../api/components/EmployeeApi.js"
import DepartmentAPI from "../../api/components/DepartmentApi.js"
import PositionAPI from "../../api/components/PositionApi.js"
export default {
  components: { FilterBar, Grid, Paging, EmployeeDialog },
    data(){
        return{
            test:"hihi",
            isDisplay:false,
            employeeId:null,
            Positions:[],
            Departments:[],
            Employee:{},
            FormMode:"",
            selectedEmployeeIds:[],
            dataFilter:{
                dropDown:"",
                id:"",
                inputText:""
            },
            pagination: {
                pageSize: 10,
                pageNumber: 1,
                totalPage: null,
                totalRecord: null,
                currentPage: 1,
            },
            isToggleNavbar:true,
            isOk:false,
            itemSelecteds:[]
            

        }
    },

    mounted() {
        let me=this;

        //nhận sự kiện yêu cầu đóng dialog
        this.$bus.on("closeDialog",function(){
            me.displayFalse();
        })
        this.$bus.on("toggleNavbar",()=>{

            this.isToggleNavbar=!this.isToggleNavbar;

        })
        
    },
    async beforeCreate() {
        
        //lấy dữ liệu department để load lên dropdown
         let departments= await[];
        await DepartmentAPI.getAll()
            .then(res=>{
                departments=res.data.Data;
                for(let i=0;i<departments.length;i++){
                    this.Departments.push({value:departments[i].DepartmentId,text:departments[i].DepartmentName});
                }
            });
        
        //lấy dữ liệu position để load lên dropdown
        let positions= await [];
        await PositionAPI.getAll()
            .then(res=>{
                positions=res.data.Data;
                for(let i=0;i<positions.length;i++){
                    this.Positions.push({value:positions[i].PositionId,text:positions[i].PositionName});
                }
                // this.Positions=JSON.parse(JSON.stringify(this.Positions));


            });
        this.isOk= await true;
        
        
    },
   
    methods:{

        /**
         * Open form EmployeeDetail
         * Craete by TTLONG 14/07/2021
         */
        async openDialog(){
            
            this.FormMode="Add";
            await EmployeeAPI.getNewEmployeeCode()
            .then(
                (res)=>{
                    this.$bus.emit("openToast",{
                        type: "success",
                        text: "Load mã nhân viên thành công",
                    });
                    this.Employee.EmployeeCode=res.data.Data;
                    
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
            this.isDisplay=true;
            
           
        },
        /**
         * Set thuộc tính display=false để đóng form
         * Craete by TTLONG 14/07/2021
         */
        displayFalse(){
            this.isDisplay=false;
            this.resetForm();
        },
        /**
         * Set thuộc tính display=true để đóng form
         * Craete by TTLONG 14/07/2021
         * paramater{data,formMode}: data lâ thông tin của 1 employee, formMode để xác định là add hay edit
         */
        displayTrue(data,formMode){
            this.isDisplay=true;
            this.Employee=data;
            this.Employee.DateOfBirth=this.formatDate(this.Employee.DateOfBirth,2);
            this.Employee.JoinDate=this.formatDate(this.Employee.JoinDate,2);
            this.Employee.IdentityDate=this.formatDate(this.Employee.IdentityDate,2);
            this.FormMode=formMode;

        },
        /**
         * lấy id của cá employee khi row được chọn
         * Craete by TTLONG 17/07/2021
         * paramater{data}: 1 mảng các EmployeeId được chọn
         */
        setSelectedEmployeeId(data){
            this.selectedEmployeeIds=data;
            this.itemSelecteds=data;
            console.log(this.itemSelecteds);
            
            
        },
        /**
         * Làm mới form chi tiết
         * Craete by TTLONG 20/07/2021
         */
        resetForm(){
            this.Employee={};

        },
        /**
         * Set nội dung được filter trên dropdown
         * Craete by TTLONG 23/07/2021
         * paramater{data,id}: data: text của itrm dropdown, id là tên trường
         */
        dataDropdownSelected(data,id){
            this.dataFilter.dropDown=data;
            this.dataFilter.id=id;
            this.$refs.loadData.loadData();

        },
        /**
         * Set nội dung được filter trên input text
         * Craete by TTLONG 23/07/2021
         * paramater{data}: data: text của text
         */
        searchText(data){
            this.dataFilter.inputText=data;
            this.$refs.loadData.loadData();
 
        },
        /**
         * Set tổng số trang và tổng số bản ghi
         * Craete by TTLONG 23/07/2021
         * paramater{data}: data: dữ liệu được filter
         */
        filterData(data){
            this.pagination.totalRecord=data.TotalRecord;
            this.pagination.totalPage=data.TotalPage;
        },
        /**
         * Thay đổi số lượng bản ghi 1 trang và chỉnh sửa tổng số trang
         * Craete by TTLONG 23/07/2021
         * paramater{pageSize}: số lượng bản ghi trong một trang
         */
        changePageSize(pageSize){
            this.pagination.pageSize=pageSize;
            this.pagination.totalPage=Math.ceil(Number(this.pagination.totalRecord/this.pagination.pageSize));
            this.$refs.loadData.loadData();
        },
        /**
         * khi trang hiện tại bị thay đổi thì load lại data table
         * Craete by TTLONG 23/07/2021
         * paramater{pageSize}: số lượng bản ghi trong một trang
         */
        changeCurrentPage(){
            //this.pagination.pageNumber=(currentPage-1)*this.pagination.pageSize;
            this.$refs.loadData.loadData();
        },
        
        /**
         * định dạng ngày tháng
         * Craete by TTLONG 16/06/2021
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
        }

    },
}
</script>

<style>
    @import url("../../assets/css/common/content.css");
    @import url("../../assets/css/common/dialog.css");
    
    @import url("../../assets/css/common/button.css");
    
    
    @import url("../../assets/css/common/dropdown-list.css");
    @import url("../../assets/css/common/icon.css");
    @import url("../../assets/css/common/input.css");
    @import url("../../assets/css/common/toolbar.css");
    @import url("../../assets/css/common/tooltip.css");
    @import url("../../assets/css/page/employee.css");
    .content-toggle_navbar{
        width: calc(100% - 53px) !important;
        left:53px;
    }
</style>