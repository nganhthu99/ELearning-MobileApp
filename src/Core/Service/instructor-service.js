import axios from "axios";
import {api} from "./authentication-service";

export const getListIntructors = () => {
    return axios.get(api + '/instructor',{
        validateStatus: () => true
    })
}

export const getIntructorInfo = (instructorId) => {
    return axios.get(api + '/instructor/detail/' + instructorId, {
        validateStatus: () => true
    })
}
