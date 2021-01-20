export const validateUsernameUtil = (username) => {
    return (username.length >= 6)
}

export const validateEmailUtil = (email) => {
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
}

export const validatePhoneUtil = (phone) => {
    return (/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone));
}

export const validatePasswordUtil = (password) => {
    return (password.length >= 8)
}

export const validateConfirmPasswordUtil = (confirmPassword, password) => {
    return (confirmPassword === password)
}
