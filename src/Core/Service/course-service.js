import axios from "axios";
import {api} from "./authentication-service";

export const getNewCoursesService = (limit, page) => {
    return axios.post(api + '/course/top-new', {
        limit,
        page
    })
}

export const getTopSellingCoursesService = (limit, page) => {
    return axios.post(api + '/course/top-sell', {
        limit,
        page
    })
}

export const getTopRatingCoursesService = (limit, page) => {
    return axios.post(api + '/course/top-rate', {
        limit,
        page
    })
}

export const getRecommendedCoursesService = (limit, offset, userId) => {
    offset -= 1
    offset *= limit
    return axios.get(api + '/user/recommend-course/' + userId + '/' + limit + '/' + offset)
}

export const getContinueCoursesService = (limit, page, userId, token) => {
    return axios.get(api + '/user/get-process-courses', {
        headers: {
            Authorization: 'Bearer ' + token
        },
        validateStatus: () => true
    })
}

export const getFavoriteCoursesService = (limit, page, userId, token) => {
    return axios.get(api + '/user/get-favorite-courses',{
        headers: {
            Authorization: 'Bearer ' + token
        },
        validateStatus: () => true
    })
}

export const getCategoryCoursesService = (limit, offset, categoryId) => {
    offset -= 1
    offset *= limit
    return axios.post(api + '/course/search', {
        keyword: "",
        opt: {
            category: [
                categoryId
            ]
        },
        limit,
        offset,
    }, {
        validateStatus: () => true
    })
}

export const updateCourseFavouriteStatus = (courseId, token) => {
    console.log('hereherehere')
    return axios.post(api + '/user/like-course', {
        courseId,
    },{
        headers: {
            Authorization: 'Bearer ' + token
        },
        validateStatus: () => true
    })
}
