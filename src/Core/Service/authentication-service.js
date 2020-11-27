import {users} from "../../Data/data";

export const signInService = (username, password) => {
    let returnItem = users.find(returnItem => returnItem.username === username && returnItem.password === password)
    if (returnItem) {
        return {
            status: 200,
            user: {
                username: returnItem.username,
                email: returnItem.email
            }
        }
    } else {
        return {
            status: 404,
            error: 'Wrong username or password!'
        }
    }
}

export const signUpService = (username, password, email) => {
    users.push({
        username,
        email,
        password,
    })
    return true;
}

export const verifyEmailService = (email) => {
    return (users.some(returnItem => returnItem.email === email))
}

export const verifyCodeService = (code) => {
    return (code === '1234')
}

export const resetPasswordService = (password, email) => {
    let returnItem = users.find(returnItem => returnItem.email === email)
    users.filter(returnItem => returnItem.email !== email)
    users.push({
        username: returnItem.username,
        email: returnItem.email,
        password: password
    })
    return true
}
