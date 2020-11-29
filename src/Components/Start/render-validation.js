import React, {useContext} from "react";
import {LanguageContext} from "../../Provider/language-provider";

export const validateEmailUtil = (email) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return true;
    } return false
};

export const renderUsernameValidation = (username) => {
    const {language} = useContext(LanguageContext)
    if (username.length > 0 && username.length < 6) {
        return language.usernameValidate
    }
}

export const renderPasswordValidation = (password) => {
    const {language} = useContext(LanguageContext)
    if (password.length > 0 && password.length < 8) {
        return language.passwordValidate
    }
}

export const renderConfirmPasswordValidation = (confirmPassword, password) => {
    const {language} = useContext(LanguageContext)
    if (confirmPassword.length > 0 && confirmPassword !== password) {
        return language.confirmPasswordValidate
    }
}

export const renderEmailValidation = (email) => {
    const {language} = useContext(LanguageContext)
    if (email.length > 0 && !validateEmailUtil(email)) {
        return language.emailValidate
    }
}


