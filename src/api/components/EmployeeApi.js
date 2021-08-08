import BaseAPI from "../base/BaseApi";
import BaseAPIConfig from "../base/BaseAPIConfig";
class EmployeeAPI extends BaseAPI {
    constructor() {
      super();
      this.controler = "/v1/employees";
    } 
    /**
     * Get new employee code
     * TTLONG 19/07/2021
     */
    getNewEmployeeCode() {
      let urlFull = this.controler + "/NewCode";
      return BaseAPIConfig.get(urlFull);
    }
    /**
     * Filter employee
     * TTLONG 20/07/2021
     */
    filter(params) {
      let urlFull =
        this.controler +
        `/employeeFilter`;
        // if(departmentId!=""){
        //   urlFull +=`&departmentId=${departmentId}`;
        // }
        // if(positionId!=""){
        //   urlFull +=`&positionId=${positionId}`;
        // }
        
      return BaseAPIConfig.get(urlFull,{params:params});
    }
    
  }
  
  export default new EmployeeAPI();