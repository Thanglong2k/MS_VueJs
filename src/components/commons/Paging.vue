<template>
  <div class="paging-bar">
            <div class="page-number-show">
                Hiển thị
                <b>{{fromRecord}}-{{toRecord}}/{{ pagination.totalRecord }}</b> nhân
                viên
            </div>
            <div class="paging-number">
                <a class="pagination page-move" @click="firstPage()" href="#"><i class="fa fa-angle-double-left icon-page"></i></a>
                <a class="pagination page-move" @click="prevPage()" href="#"><i class="fa fa-angle-left icon-page"></i></a>
                <a class="pagination"
                    href="#" 
                    v-for="(item,index) in listPages"
                    :key="index"
                    :currentPage="item==pagination.pageNumber?pagination.pageNumber:false"
                    @click ="selectedPage(item)"
                >
                    {{item}}
                </a>
                
                <a class="pagination page-move" @click="nextPage()" href="#"><i class="fa fa-angle-right icon-page"></i></a>
                <a class="pagination page-move" @click="lastPage()" href="#"><i class="fa fa-angle-double-right icon-page"></i></a>
            </div>
            <div class="row-limit">
                 <span>
                    <b>{{ pagination.pageSize }}</b> nhân viên/trang
                </span>
                <div class="change-record">
                    <svg
                        width="12"
                        height="12"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        class="icon-pagenumber"
                        @click="increPagesize()"
                        >
                        <title>Tăng số trang</title>
                        <path
                            d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
                        />
                        </svg>
                        <svg
                        width="12"
                        height="12"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        class="icon-pagenumber"
                        @click="decrePagesize()"
                        >
                        <title>Giảm số trang</title>
                        <path
                            d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                        />
                    </svg>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name:"Paging",
    props:{
        pagination:{
            type:Object,
            default:()=>{}
        },
       
    },
    data() {
        return {
            
        }
    },
    methods:{
        /**
         * Set trang hiện tại được chọn
         * CreatedBy: TTLONG (23/07/2021)
         */
        selectedPage(item){
            this.pagination.pageNumber=item;
            

        },
        /**
         * Set trang hiện tại sang trang tiếp
         * CreatedBy: TTLONG (23/07/2021)
         */
        nextPage(){
            if(this.pagination.pageNumber<this.pagination.totalPage){
                this.pagination.pageNumber++;
            }
                 
            
        },
        /**
         * Set trang hiện tại sang trang trước
         * CreatedBy: TTLONG (23/07/2021)
         */
        prevPage(){
             if(this.pagination.pageNumber>1){
                this.pagination.pageNumber--;
            }
            
        },
        /**
         * Set trang hiện tại về trang đầu
         * CreatedBy: TTLONG (23/07/2021)
         */
        firstPage(){
            this.pagination.pageNumber=1;
            
        },
        /**
         * Set trang hiện tại về trang cuối
         * CreatedBy: TTLONG (23/07/2021)
         */
        lastPage(){
            this.pagination.pageNumber=this.pagination.totalPage;
            
        },
        /**
         * Tăng số lượng bản ghi của một trang
         * CreatedBy: TTLONG (23/07/2021)
         */
        increPagesize(){
            this.pagination.pageSize++; 
            this.$emit("changePageSize",this.pagination.pageSize);
        },
        /**
         * Giảm số lượng bản ghi của một trang
         * CreatedBy: TTLONG (23/07/2021)
         */
        decrePagesize(){
            this.pagination.pageSize--;
            this.$emit("changePageSize",this.pagination.pageSize);
        }
    },
    computed:{
        /**
         * Danh sách trang được hiển thị
         * CreatedBy: TTLONG (23/07/2021)
         */
        listPages(){
            let array=[];
            //nếu trang hiện tại nhỏ hơn 3 thì danh sách hiển thị là 5 trang đầu tiên
            if(this.pagination.pageNumber<3){
                for(let i=1;i<=5;i++){
                    array.push(i);
                }
            }
            //nếu trang hiện tại lơn hơn tổng số trang -2 thì danh sách hiển thị là 5 trang cuối
            else if(this.pagination.pageNumber>this.pagination.totalPage-2){

                for(let i=this.pagination.totalPage-4;i<=this.pagination.totalPage;i++){
                    array.push(i);
                }
            }
            //NGược lại thì hiển thị 2 cả 2 trang trước và 2 trang sau của trang hiện tại
            else{

                for(let i=this.pagination.pageNumber-2;i<=this.pagination.pageNumber+2;i++){
                    
                    array.push(i);
                }
            }
            
            return array;
        },
        /**
         * Set trang hiện tại
         * CreatedBy: TTLONG (23/07/2021)
         */
        currentPage(){
            
            return this.pagination.pageNumber;

        },
        /**
         * Set vị trí bản ghi bắt đầu của 1 trang
         * CreatedBy: TTLONG (23/07/2021)
         */
        fromRecord(){
            return (this.pagination.pageNumber-1)*this.pagination.pageSize;
        },
        /**
         * Set vị trí bản ghi kết thúc của 1 trang
         * CreatedBy: TTLONG (23/07/2021)
         */
        toRecord(){
            
            if(this.pagination.pageNumber<this.pagination.totalPage){
                return this.pagination.pageNumber*this.pagination.pageSize-1;
            }
            return this.pagination.totalRecord;
        }

    },
    watch:{
        /**
         * Nếu trang hiện tại bị thay đổi thì gửi giá trị về COntent
         * CreatedBy: TTLONG (23/07/2021)
         */
        currentPage(value){
            this.$emit("changeCurrentPage",value);
        }
    }
}
</script>

<style>
.change-record {
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.change-record svg:hover {
  opacity: 0.7;
  background-size: #838383;
}

.row-limit {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
}
.row-limit span {
  margin-right: 10px;
}

.row-limit .icon-pagenumber {
  cursor: pointer;
  margin: 0 16px 0px 10px;
}

</style>