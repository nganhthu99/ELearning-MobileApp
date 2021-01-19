import axios from "axios";
import {api} from "../../Globals/API";

export const getUserInfoService = (token) => {
    return axios.get(api + '/user/me', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const signUpService = (name, email, phone, password) => {
    return axios.post(api + '/user/register', {
        name,
        email,
        phone,
        password
    }, {validateStatus: () => true})
}

export const signInService = (email, password) => {
    return axios.post(api + '/user/login', {
        email,
        password
    }, {validateStatus: () => true})
}

export const signInWithGoogleService = (email, googleId) => {
    return axios.post(api + '/user/login-google-mobile', {
        user: {
            email,
            id: googleId
        }
    })
}

export const forgetPasswordSendEmailService = (email) => {
    return axios.post(api + '/user/forget-pass/send-email', {
        email
    }, {validateStatus: () => true})
}

export const updateProfileService = (username, avatar, phone, token) => {
    return axios.put(api + '/user/update-profile', {
        name: username,
        avatar,
        phone
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const updatePasswordService = (userId, oldPass, newPass, token) => {
    return axios.post(api + '/user/change-password', {
        id: userId,
        oldPass,
        newPass
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        validateStatus: () => true
    })
}

export const updateEmailService = (newEmail, token) => {
    return axios.put(api + '/user/change-user-email', {
        newEmail
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        validateStatus: () => true
    })
}
