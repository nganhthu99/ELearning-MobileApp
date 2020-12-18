import axios from "axios";
import {api} from "./authentication-service";

export const getAllCategoryService = () => {
    return axios.get(api + '/category/all',{
        validateStatus: () => true
    })
}
