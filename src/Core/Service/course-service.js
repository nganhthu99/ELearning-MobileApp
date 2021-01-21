import axios from "axios";
import {api} from "../../Globals/API";

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

export const getRecommendedCoursesService = (limit, page, userId) => {
    const offset = limit * (page - 1)
    return axios.get(api + '/user/recommend-course/' + userId + '/' + limit + '/' + offset)
}

export const getContinueCoursesService = (token) => {
    return axios.get(api + '/user/get-process-courses', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const getFavoriteCoursesService = (token) => {
    return axios.get(api + '/user/get-favorite-courses',{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const getCategoryCoursesService = (limit, page, categoryId) => {
    const offset = limit * (page - 1)
    return axios.post(api + '/course/search', {
        keyword: "",
        opt: {
            category: [
                categoryId
            ]
        },
        limit,
        offset,
    })
}

export const getUserCourseFavouriteStatus = (courseId, token) => {
    return axios.get(api + '/user/get-course-like-status/'+courseId,{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const updateCourseFavouriteStatus = (courseId, token) => {
    return axios.post(api + '/user/like-course', {
        courseId,
    },{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const searchService = (keyword, token) => {
    return axios.post(api+'/course/searchV2', {
        token,
        keyword
    })
};

export const getSearchHistoryService = (token) => {
    return axios.get(api + '/course/search-history', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const deleteSearchHistoryService = (token, searchHistoryId) => {
    return axios.delete(api + '/course/delete-search-history/' + searchHistoryId, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const getCourseDetail = (courseId) => {
    return axios.get(api + '/course/get-course-detail/'+courseId+'/null')
}

export const getUserRatingCourse = (token, courseId) => {
    return axios.get(api + '/course/get-rating/' + courseId, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const updateUserRatingCourse = (token, courseId, formalityPoint, contentPoint, presentationPoint, content) => {
    console.log('courseId', courseId)
    return axios.post(api + '/course/rating-course', {
        courseId,
        formalityPoint,
        contentPoint,
        presentationPoint,
        content
    },{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const getLessonWithVideoUrl = (token, courseId, lessonId) => {
    return axios.get(api + '/lesson/video/'+courseId+'/'+lessonId, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const getLessonDetailService = (token, courseId, lessonId) => {
    return axios.get(api + '/lesson/detail/' + courseId + '/' + lessonId, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const getLessonExercises = (token, lessonId) => {
    return axios.post(api + '/exercise/student/list-exercise-lesson',{
        lessonId,
    },{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const getExerciseQuestions = (token, exerciseId) => {
    return axios.post(api + '/exercise/student/exercise-test',{
        exerciseId,
    },{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const enrollCourseService = (token, courseId) => {
    return axios.post(api + '/payment/get-free-courses', {
        courseId
    }, {
        validateStatus: () => true,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const updateCurrentLearntTimeLessonService = (token, lessonId, currentTime) => {
    return axios.put(api + '/lesson/update-current-time-learn-video', {
        lessonId,
        currentTime
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const getLastWatchedLessonService = (token, courseId) => {
    return axios.get(api + '/course/last-watched-lesson/' + courseId, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}
