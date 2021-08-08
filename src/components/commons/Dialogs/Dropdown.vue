<template>
  <div class="tooltip">
    <div
      class="dropdown-list dropdown-form"
      :id="id"
      :class="{
        'error-border': isError,
        input: !isError,
        dropdown: isDropdown,
      }"
      v-click-outside="hide"
    >
      <input
        type="text"
        class="dropdown-input-text"
        v-model="inputText"
        @keyup.down="keyCodeDown"
        @keyup.up="keyCodeUp"
        @keyup.enter="keyCodeEnter"
        @input="input"
        ref="blur"
        :readonly="isDropdown ? true : false"
      />
      <span class="clear-input-area">
        <span v-if="isShowClear" class="clear-input" @click="clearInput()">
        </span>
      </span>
      <div
        class="dropdown-button-select"
        :class="{
          'error-border-dropdown': isError,
          'background-button-select-up': hideDropdownBox,
          'background-button-select-down': !hideDropdownBox,
        }"
        @mousedown="dropdownMenu($event)"
      >
        <i
          :class="{
            'fas fa-chevron-down': !hideDropdownBox,
            'fas fa-chevron-up': hideDropdownBox,
          }"
        ></i>
      </div>
      <div class="dropdown-list-box" v-if="hideDropdownBox">
        <div
          class="item-list"
          v-for="data in dataItemDropdowns"
          :class="{ selected: itemSelected.value == data.value }"
          :value="data.value"
          :key="data.value"
          :tabindex="
            dataItemDropdowns.indexOf(data) == currentIndex
              ? currentIndex
              : false
          "
          @click="clickItemDropdown(data.value)"
        >
          <div class="icon-check"></div>
          <div class="item-dropdown-text">{{ data.text }}</div>
        </div>
      </div>
    </div>
    <span class="tooltip-alert">{{ errorText }}</span>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
export default {
  name: "Dropdown",
  props: {
    id: {
      type: String,
      default: "",
    },
    fieldName: {
      type: String,
      default: "",
    },
    datas: {
      type: Array,
      default: null,
    },
    text: {},
    typeDropdown: {
      type: String,
      default: "",
    },
    firstItemDropdown: {
      type: Object,
      default: () => {},
    },
    isDropdown: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hideDropdownBox: false,
      itemSelected: {},
      inputValue: "",
      dataItemDropdowns: [],
      inputText: "",
      currentIndex: 0,
      isToggleClass: false,
      isShowClear: false,
      isError: false,
      errorText: "",
    };
  },
  created() {
    // if(this.firstItemDropdown!=null){
    //     this.datas.unshift(this.firstItemDropdown);
    // }
    //tạo biến mới lưu data để tính toán trên nó
    this.dataItemDropdowns = [...this.datas];
    if (this.firstItemDropdown != null) {
      this.dataItemDropdowns.unshift(this.firstItemDropdown);
    }
    
    //lấy giá trị dropdown lên input khi dblclick table
    if (this.text != null) {
      for (let item in this.dataItemDropdowns) {
        if (this.dataItemDropdowns[item].value == this.text) {
          this.itemSelected = this.dataItemDropdowns[item];
          this.inputText = this.dataItemDropdowns[item].text;
          break;
        }
      }
    }
    //tự động chọn item đầu tiên
    else {
      this.itemSelected = this.dataItemDropdowns[0];
      this.inputText = this.dataItemDropdowns[0].text;
      this.$emit("selectItemDropdown", this.itemSelected, this.id);
    }
    //nếu input có kí tự thì hiện button X
    if (this.inputText != "") {
      this.isShowClear = true;
    }
    //nếu là dropdown thì tắt button X
    if (this.isDropdown) {
      this.isShowClear = false;
    }
  },

  // do not forget this section
  directives: {
    ClickOutside,
  },
  methods: {
    /**
     * click ẩn/hiện dropdownbox
     * Craete by TTLONG 14/07/2021
     */
    dropdownMenu() {
      this.dataItemDropdowns = [...this.datas];
      if (this.firstItemDropdown != null) {
        this.dataItemDropdowns.unshift(this.firstItemDropdown);
      }
      this.hideDropdownBox = !this.hideDropdownBox;

      // this.$emit("getValueDropdown",this.itemSelected);
    },
    /**
     * click item dropdown
     * Craete by TTLONG 16/07/2021
     */
    clickItemDropdown(value) {
      for (let item in this.dataItemDropdowns) {
        if (this.dataItemDropdowns[item].value == value) {
          this.itemSelected = this.dataItemDropdowns[item];
          this.inputText = this.dataItemDropdowns[item].text;
          this.hideDropdownBox = !this.hideDropdownBox;

          break;
        }
      }
      this.$emit("selectItemDropdown", this.itemSelected, this.id);
    },
    /**
     * sự kiện nhấn arrowdown di chuyển chọn các item dropdown
     * Craete by TTLONG 20/07/2021
     */
    keyCodeDown() {
      if (this.currentIndex == this.dataItemDropdowns.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    },
    /**
     * sự kiện nhấn arrowup di chuyển chọn các item dropdown
     * Craete by TTLONG 20/07/2021
     */
    keyCodeUp() {
      if (this.currentIndex == 0) {
        this.currentIndex = this.dataItemDropdowns.length - 1;
      } else {
        this.currentIndex--;
      }
    },
    /**
     * sự kiện nhấn enter để chọn item
     * Craete by TTLONG 20/07/2021
     */
    keyCodeEnter() {
      if (this.currentIndex >= 0) {
        this.itemSelected = this.dataItemDropdowns[this.currentIndex];
        this.hideDropdownBox = false;

        this.inputText = this.itemSelected.text;
        this.$emit("selectItemDropdown", this.itemSelected, this.id);
      }

      this.$refs.blur.blur();
    },
    // blur(){
    //     this.hideDropdownBox=false;
    //     this.isToggleClass=false;
    //     console.log(this.hideDropdownBox +"blur");
    // },
    /**
     * sự kiện nhập giá trị input
     * Craete by TTLONG 20/07/2021
     */
    input() {
      let dataItems = [],
        value = "",
        text = "";
      this.inputValue = this.inputText;
      if (this.inputValue == "") {
        this.currentIndex = -1;
        this.isShowClear = false;
      } else {
        console.log(this.isShowClear);
        this.isShowClear = true;

        let data = [];
        //sao chép mảng
        data = [...this.datas];
        //thêm phần tử vào đàu mảng
        if (this.firstItemDropdown != null) {
          data.unshift(this.firstItemDropdown);
        }
        for (let item in data) {
          if (
            data[item].text
              .toUpperCase()
              .includes(this.inputValue.toUpperCase())
          ) {
            value = data[item].value;
            text = data[item].text;
            dataItems.push({ value, text });
          }
          // if(this.datas[item].text.toUpperCase()==this.inputValue.toUpperCase()){
          //     //this.hideDropdownBox=false;
          //     return;
          // }
        }
        this.currentIndex = 0;
      }
      this.dataItemDropdowns = dataItems;
      if (dataItems.length > 0) {
        this.hideDropdownBox = true;

        this.isError = false;
      } else {
        this.hideDropdownBox = false;
        this.currentIndex = -1;
        this.isError = true;
        this.errorText = "Không có lựa chọn nào chứa từ khóa bạn tìm!";
      }
    },
    /**
     * sự kiện close dropdown
     * Craete by TTLONG 22/07/2021
     */
    hide() {
      this.hideDropdownBox = false;
      if (this.inputText == "") {
          
        this.inputText = this.itemSelected.text;
        this.isError = false;
      }
      // this.inputText=this.itemSelected.text;
      // this.isError=false;
      //     console.log(this.isShowClear);

      //this.isShowClear=true;
    },
    /**
     * sự kiện xóa trắng input
     * Craete by TTLONG 22/07/2021
     */
    clearInput() {
      this.$refs.blur.focus();
      this.inputText = "";

      //this.isShowClear=false;
    },
  },

  // ,
  // watch:{
  //     /**
  //      * thiết lập lại các item có chứa kí tự trong ô input khi input thay đổi value
  //      * Craete by TTLONG 20/07/2021
  //      */
  //     inputText:function(){
  //         let dataItems=[],
  //             value="",
  //             text=""
  //         this.inputValue=this.inputText;
  //         if(this.inputValue==""){
  //             this.currentIndex=-1;
  //         }
  //         else{

  //             for(let item in this.datas){
  //                 if(this.datas[item].text.toUpperCase().includes(this.inputValue.toUpperCase())){
  //                     value=this.datas[item].value;
  //                     text=this.datas[item].text;
  //                     dataItems.push({value,text});
  //                 }
  //                 if(this.datas[item].text.toUpperCase()==this.inputValue.toUpperCase()){
  //                     //this.hideDropdownBox=false;
  //                     return;
  //                 }
  //             }
  //             this.currentIndex=0;

  //         }
  //         if(dataItems.length>0){
  //             this.dataItemDropdowns=dataItems;
  //             this.hideDropdownBox=true;
  //             this.isToggleClass=true;
  //         }else{
  //             this.hideDropdownBox=false;
  //             this.isToggleClass=false;

  //         }
  //     }
  // }
};
</script>

<style scope>
    .dropdown-list .clear-input-area{
        right: 40px;
    }
</style>
