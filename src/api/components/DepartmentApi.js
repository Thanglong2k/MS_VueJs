import BaseAPI from "../base/BaseApi";
import BaseAPIConfig from "../base/BaseAPIConfig";
class DepartmentAPI extends BaseAPI {
    constructor() {
      super();
      this.controler = "/v1/departments";
    } 
    /**
     * Get new employee code
     * TTLONG 19/07/2021
     */
    getAll() {
      let urlFull = this.controler;
      return BaseAPIConfig.get(urlFull);
    }
  }
  
  export default new DepartmentAPI();