<template>
  <div class="grid grid-employee">
        <table>
            <thead>
                <tr>
                    <th fieldName="CheckBox"><input :checked="isCheckFullEmployees" type="checkbox" @click="toggleCheckFullEmployees" /></th>
                    <th fieldName="EmployeeCode">Mã nhân viên</th>
                    <th fieldName="FullName">Họ và tên</th>
                    <th fieldName="GenderName" fieldValue="Gender">Giới tính</th>
                    <th fieldName="DateOfBirth" formatType="ddmmyyyy">Ngày sinh</th>
                    <th fieldName="PhoneNumber">Số điện thoại</th>
                    <th fieldName="Email">Email</th>
                    <th fieldName="PositionName" fieldValue="PositionId">Chức vụ</th>
                    <th fieldName="DepartmentName" fieldValue="DepartmentId">Phòng ban</th>
                    <th fieldName="Salary" formatType="Money">Mức lương hiện tại</th>
                    <th fieldName="Address">Địa chỉ</th>
                    <th fieldName="WorkStatus">Tinh trạng công việc</th>


                </tr>
            </thead>
            <tbody>
                <!--table được load dữ liệu bằng js-->
                <tr  v-for="employee in Employees" 
                    v-bind:key="employee.EmployeeId" 
                    :class="{'selected':itemSelecteds.includes(employee.EmployeeId)}" 
                    @dblclick="rowDblClick(employee.EmployeeId)"
                    @click="rowClick(employee.EmployeeId)"

                >
                    <td>
                        <input type="checkbox"
                              :checked="itemSelecteds.includes(employee.EmployeeId)"  
                        />
                    </td>
                    <td>{{employee.EmployeeCode}}</td>
                    <td>{{employee.FullName}}</td>
                    <td>{{employee.GenderName}}</td>
                    <td class="text-align-center">{{formatDate(employee.DateOfBirth,1)}}</td>
                    <td>{{employee.PhoneNumber}}</td>
                    <td>{{employee.Email}}</td>
                    <td>{{employee.PositionName}}</td>
                    <td>{{employee.DepartmentName}}</td>
                    <td class="text-align-right">{{formatMoney(employee.Salary)}}</td>
                    <td :title="employee.Address">{{employee.Address}}</td>
                    <td>{{employee.WorkStatusName}}</td>    
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
import EmployeeAPI from '../../api/components/EmployeeApi.js'

    export default {
        name:"Grid",
        props:{
            // employee:String,
            formMode:{
                type:String,
                default:""
            },
            dataFilter:{
                type:Object,
                default:()=>{}
            },
            pagination:{
                type:Object,
                default:()=>{}
            },
            itemSelecteds:{
                type:Array,
                default:()=>[]
            }

        },
        components:{

        },
        created(){
           let me=this;
            //gọi api thực hiện lấy dữ liệu:
            me.loadData();
        },
        mounted() {
            let me=this;
            //bắt sự kiện loadData đưuọc gọi đến
            this.$bus.on("loadData",()=>{
                me.loadData();
            })
        },
        data(){
            return{
                Employees:[],
                
                mode:"",
                params:{
                    pageSize:10,
                    pageNumber:1, 
                    employeeFilter:"",
                    departmentId:"",
                    positionId:""
                },
                isCheckFullEmployees:false
                
            }
        },
        updated() {
            if(this.itemSelecteds.length!=this.pagination.pageSize){
                this.isCheckFullEmployees=false;
            }
        },
        methods:{
            /**
             * lấy thông tin của row khi double click
             * Craete by TTLONG 15/07/2021
             */
            rowDblClick(id){
                this.mode="Edit";
                EmployeeAPI.getById(id)
                .then(res=>(
                    this.$emit("changeDisplayTrue",res.data.Data,this.mode)
                    
                ));               
            },
            /**
             * lấy id của row khi click
             * Craete by TTLONG 17/07/2021
             */
            rowClick(id){
               if(!this.itemSelecteds.includes(id)){
                   this.itemSelecteds.push(id);
               }else{
                   this.itemSelecteds.splice(this.itemSelecteds.indexOf(id), 1);
               }
               console.log(this.itemSelecteds.length);
                if(this.itemSelecteds.length==this.pagination.pageSize){
                    this.isCheckFullEmployees=true;
                    console.log(this.isCheckFullEmployees);
                    
                }
                else{
                    this.isCheckFullEmployees=false;
                    console.log(this.isCheckFullEmployees);
                }
               this.$emit("setSelectedEmployeeId",this.itemSelecteds);
            },
            /**
             * load data table
             * Craete by TTLONG 19/07/2021
             * 
             */
            loadData(){
                this.$bus.emit("onLoading");
                if(this.dataFilter.id=="dropdown-department"){
                    this.params.departmentId=this.dataFilter.dropDown.value;
                }
                if(this.dataFilter.id=="dropdown-position"){
                    this.params.positionId=this.dataFilter.dropDown.value;
                }
                if(this.dataFilter.inputText!=""){
                    this.params.employeeFilter=this.dataFilter.inputText;
                }
                this.params.pageSize=this.pagination.pageSize;
                this.params.pageNumber=this.pagination.pageNumber; 
                
                EmployeeAPI.filter(this.params)
                .then(
                    (res)=>{
                        this.Employees=res.data.Data;
                        this.$emit("filterData",res.data);
                        this.$bus.emit("offLoading");
                    }
                )
            },
            toggleCheckFullEmployees(){
                this.isCheckFullEmployees=!this.isCheckFullEmployees;
                if(this.isCheckFullEmployees){
                    for(var i=0;i<this.pagination.pageSize;i++){
                        if(!this.itemSelecteds.includes(this.Employees[i].EmployeeId)){
                            this.itemSelecteds.push(this.Employees[i].EmployeeId);
                        }
                    }
                }
                else{
                    this.$emit("setSelectedEmployeeId",[]);
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
                    return year + "/" + month + "/" + day;
                }
                return day + "/" + month + "/" + year;
            },
                        /**-------------------------------------
             * Định dạng hiển thị tiền tệ
             * @param {Number} money số tiền
             * Created by TTLONG (2/7/2021)
             */
            formatMoney(money) {

                if (money) {
                /*return money.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&.");*/
                    return new Intl.NumberFormat("vi-VN").format(money);
                }
                /*var num = money.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, "$&,");
                return num;*/


            }
        }
        

    }
</script>

<style>
    @import url("../../assets/css/common/grid.css");
</style>