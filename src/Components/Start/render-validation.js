import React from "react";
import i18n from "i18n-js";
import {strings} from "../../Globals/Localization/string";
import {
    validateConfirmPasswordUtil,
    validateEmailUtil,
    validatePasswordUtil,
    validatePhoneUtil,
    validateUsernameUtil
} from "../../Core/Util/validate-input";

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

