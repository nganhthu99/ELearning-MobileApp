import React, {useContext, useState} from 'react';
import {Button, Input} from "react-native-elements";
import {StyleSheet, View} from "react-native";
import { Icon } from 'react-native-elements'
import {ScreenName} from "../../Globals/constants";
import {
    renderConfirmPasswordValidation,
    renderEmailValidation,
    renderPasswordValidation,
    renderUsernameValidation,
    validateEmailUtil
} from "./render-validation";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";

const SignUp = (props) => {
    // State
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    // Control
    const handleUsernameInput = (text) => {
        setUsername(text)
    }

    const handleEmailInput = (text) => {
        setEmail(text)
    }

    const handlePasswordInput = (text) => {
        setPassword(text)
    }

    const handleConfirmPasswordInput = (text) => {
        setConfirmPassword(text)
    }

    const handleSignUpButton = () => {
        if (username.length >= 6 && password.length >= 8 &&
            password === confirmPassword && validateEmailUtil(email)) {
            // signUpService
            props.navigation.navigate(ScreenName.SignIn)
        }
    }

    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).inputContainer}>
                <Input placeholder={language.usernameInput}
                       inputStyle={{color: theme.normalText}}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='person-outline'
                                 color={theme.primaryEmphasis}/>
                       }
                       onChangeText={(text) => handleUsernameInput(text)}
                />
                {renderUsernameValidation(username)}
                <Input placeholder={language.emailInput}
                       inputStyle={{color: theme.normalText}}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='mail-outline'
                                 color={theme.primaryEmphasis}/>
                       }
                       onChangeText={(text) => handleEmailInput(text)}
                />
                {renderEmailValidation(email)}
                <Input placeholder={language.passwordInput}
                       inputStyle={{color: theme.normalText}}
                       secureTextEntry={true}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='lock-outline'
                                 color={theme.primaryEmphasis}/>
                       }
                       onChangeText={(text) => handlePasswordInput(text)}
                />
                {renderPasswordValidation(password)}
                <Input placeholder={language.confirmPasswordInput}
                       inputStyle={{color: theme.normalText}}
                       secureTextEntry={true}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='lock'
                                 color={theme.primaryEmphasis}/>
                       }
                       onChangeText={(text) => handleConfirmPasswordInput(text)}
                />
                {renderConfirmPasswordValidation(confirmPassword, password)}
                <Button type='outline'
                        title={language.signUp}
                        buttonStyle={{borderColor: theme.primaryButton}}
                        titleStyle={{color: theme.primaryButton}}
                        containerStyle={{paddingLeft: 40, paddingRight: 40}}
                        onPress={handleSignUpButton}/>
            </View>
        </View>
    )
};

const styles = (theme) => (
    StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: theme.background,
        },
        inputContainer: {
            flex: 5,
            paddingTop: 50
        },
    })
)

export default SignUp
