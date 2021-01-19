import axios from "axios";
import {api} from "../../Globals/API";

export const getListInstructorsService = () => {
    return axios.get(api + '/instructor')
}

export const getInstructorInfoService = (instructorId) => {
    return axios.get(api + '/instructor/detail/' + instructorId)
}
