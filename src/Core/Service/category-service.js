import axios from "axios";
import {api} from "../../Globals/API";

export const getAllCategoryService = () => {
    return axios.get(api + '/category/all')
}
