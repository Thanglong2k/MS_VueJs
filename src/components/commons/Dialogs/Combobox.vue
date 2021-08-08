<template>
  <DxSelectBox
    :data-source="dataItemDropdowns"
    display-expr="text"
    value-expr="value"
    @value-changed="clickItem"
    v-model="itemSelected.text"
    :searchEnabled=true
    searchExpr="text"
    :searchTimeout=0
  />
</template>

<script>
import { DxSelectBox } from "devextreme-vue/select-box";
export default {
  components: {
    DxSelectBox,
  },
  props:{
    id: {
      type: String,
      default: "",
    },
    datas: {
      type: Array,
      default: null,
    },
     firstItemDropdown: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      data: [
        { a: "plsd", b: "d" },
        { a: "ran", b: "l" },
      ],
      ca: "abv",
      itemSelected: {},
      dataItemDropdowns: []
    };
  },
  created() {
    console.log(12);
    this.dataItemDropdowns = [...this.datas];
    if (this.firstItemDropdown != null) {
      this.dataItemDropdowns.unshift(this.firstItemDropdown);
    }
    this.itemSelected = this.dataItemDropdowns[0];
      console.log(this.itemSelected);
      this.$emit("selectItemDropdown", this.itemSelected, this.id);
  },
  methods: {
    clickItem(e) {
      
      for (let item in this.dataItemDropdowns) {
        if (this.dataItemDropdowns[item].value == e.value) {
          console.log(this.dataItemDropdowns);
          this.itemSelected = this.dataItemDropdowns[item];
          
          

          break;
        }
      }
      this.$emit("selectItemDropdown", this.itemSelected, this.id);
    },
    avc(){
      this.log("abv");
    }
  },
};
</script>

<style>
    .dx-texteditor-buttons-container{
        border-left: 1px solid #bbbbbb;
    }
    .dx-state-focused{
        border-color:green !important;
    }
    .dx-state-focused .dx-texteditor-buttons-container{
        border-color:green !important;
    }
    .dx-item.dx-state-focused{
        background-color:#bbbbbb !important;
    }
    .dx-item.dx-state-active{
        background-color:green !important;
    }
    .dx-selectbox{
        cursor:auto;
        height:40px !important
    }
    .dx-list-item{
        height: 40px;
        line-height: 40px;
    }
    .dx-item.dx-list-item-selected{
        background-color:green !important;
        color:#ffffff !important;
    }
    .dx-item .dx-list-item-content::before{
        width:30px;
        padding: 0 10px 0 0;
        display: flex;
        align-self: center;
    }
    .dx-item.dx-list-item-selected .dx-list-item-content::before {
     
        
        background-image: url("../../../assets/icon/check.svg") !important;
        background-repeat: no-repeat;
        background-size: 20px;
        background-position: center center;
        
    }
    .dx-dropdownlist-popup-wrapper .dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item-content {
        padding: 0px 7px;
        
    }
    .dx-dropdowneditor-button.dx-state-active .dx-dropdowneditor-icon, .dx-dropdowneditor.dx-dropdowneditor-active .dx-dropdowneditor-icon{
        background-color: #ffffff;
    }
    .dx-dropdowneditor-button.dx-state-active .dx-dropdowneditor-icon, .dx-dropdowneditor.dx-dropdowneditor-active .dx-dropdowneditor-icon::before{
        background-image: url("../../../assets/icon/check.svg") !important;
        background-repeat: no-repeat;
        background-size: 20px;
        background-position: center center;
    }

    /* .dx-dropdowneditor-input-wrapper{
        height:40px;
    } */
    
</style>
