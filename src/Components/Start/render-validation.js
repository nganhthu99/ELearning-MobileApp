import React from "react";
import i18n from "i18n-js";
import {strings} from "../../Globals/Localization/string";

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

export const renderUsernameValidation = (username) => {
    if (username && !validateUsernameUtil(username)) {
        return i18n.t(strings.validate_username_error_message)
    }
}

export const renderEmailValidation = (email) => {
    if (email && !validateEmailUtil(email)) {
        return i18n.t(strings.validate_email_error_message)
    }
}

export const renderPhoneValidation = (phone) => {
    if (phone && !validatePhoneUtil(phone)) {
        return i18n.t(strings.validate_phone_error_message)
    }
}

export const renderPasswordValidation = (password) => {
    if (password && !validatePasswordUtil(password)) {
        return i18n.t(strings.validate_password_error_message)
    }
}

export const renderConfirmPasswordValidation = (confirmPassword, password) => {
    if (confirmPassword && !validateConfirmPasswordUtil(confirmPassword, password)) {
        return i18n.t(strings.validate_confirm_password_error_message)
    }
}

