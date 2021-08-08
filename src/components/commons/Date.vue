<template>
  <DxDateBox
        type="date"
        :use-mask-behavior="true"
        display-format="dd/MM/yyyy"
    />
</template>

<script>
import 'devextreme/dist/css/dx.light.css';
 
import { DxDateBox } from 'devextreme-vue/date-box';
 
export default {
    components: {
        DxDateBox
    },
    data() {
        return {
            minDate: new Date(1900, 0, 1),
            now: Date(),
        }
    }
}
</script>

<style>

</style>