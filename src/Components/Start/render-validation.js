import {Text} from "react-native";
import React, {useContext} from "react";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";
import {languages} from "../../Globals/languages";

export const validateEmailUtil = (email) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return true;
    } return false
};

export const renderUsernameValidation = (username) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    if (username.length > 0 && username.length < 6) {
        return (
            <Text style={{
                paddingLeft:10,
                paddingRight: 10,
                fontSize: 12,
                color: theme.secondaryButton}}>
                {language.usernameValidate}
            </Text>
        )
    }
}

export const renderPasswordValidation = (password) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    if (password.length > 0 && password.length < 8) {
        return (
            <Text style={{
                paddingLeft:10,
                paddingRight: 10,
                fontSize: 12,
                color: theme.secondaryButton}}>
                {language.passwordValidate}
            </Text>
        )
    }
}

export const renderConfirmPasswordValidation = (confirmPassword, password) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    if (confirmPassword.length > 0 && confirmPassword !== password) {
        return (
            <Text style={{
                paddingLeft:10,
                paddingRight: 10,
                fontSize: 12,
                color: theme.secondaryButton}}>
                {language.confirmPasswordValidate}
            </Text>
        )
    }
}

export const renderEmailValidation = (email) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    if (email.length > 0 && !validateEmailUtil(email)) {
        return (
            <Text style={{
                paddingLeft:10,
                paddingRight: 10,
                fontSize: 12,
                color: theme.secondaryButton}}>
                {language.emailValidate}
            </Text>
        )
    }
}


