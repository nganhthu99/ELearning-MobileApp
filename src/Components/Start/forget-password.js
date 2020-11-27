import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, Text, View} from "react-native";
import {Button, Icon, Input} from "react-native-elements";
import {
    renderConfirmPasswordValidation,
    renderEmailValidation,
    renderPasswordValidation,
    validateEmailUtil
} from "./render-validation";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";
import ConfirmationCode from "./confirmation-code";
import TimerClock from "./timer-clock";
import {resetPasswordService, verifyCodeService, verifyEmailService} from "../../Core/Service/authentication-service";
import {ScreenName} from "../../Globals/constants";

const ForgetPassword = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)
    const [state, setState] = useState(1)
    // 1
    const [email, setEmail] = useState("")
    // 2
    const [code, setCode] = useState("")
    // 3
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Control
    // 1
    const handleEmailInput = (text) => {
        setEmail(text)
    }

    const handleSendEmailButton = () => {
        if (validateEmailUtil(email)) {
            if (verifyEmailService(email)) {
                setState(2)
            } else {
                Alert.alert(
                    'Authentication Error',
                    'Email does not exist.',
                    [
                        {
                            text: 'Cancel',
                            onPress: (() => {

                            }),
                            style: 'cancel'
                        }
                    ]
                );
            }
        }
    }

    // 2
    const handleOnCompleteTimer = () => {
        setState(1)
    }

    const handleCodeInput = (text) => {
        setCode(text)
    }

    const handleVerifyCodeButton = () => {
        if (code.length === 4) {
            if (verifyCodeService(code)) {
                setState(3)
            } else {
                Alert.alert(
                    'Authentication Error',
                    'Incorrect confirmation code.',
                    [
                        {
                            text: 'Cancel',
                            onPress: (() => {
                                setState(1)
                            }),
                            style: 'cancel'
                        }
                    ]
                );
            }
        }
    }

    // 3
    const handlePasswordInput = (text) => {
        setPassword(text)
    }

    const handleConfirmPasswordInput = (text) => {
        setConfirmPassword(text)
    }

    const handleResetPasswordButton = () => {
        if (password === confirmPassword) {
            if (resetPasswordService(password, email)) {
                props.navigation.navigate(ScreenName.SignIn)
            }
        }
    }

    // state 1
    const renderVerifyEmailBox = () => {
        const {theme} = useContext(ThemeContext)
        return (
            <View style={{alignItems: 'stretch', paddingTop: 25}}>
                <Text style={[styles(theme).text, {fontWeight:'bold', fontSize: 16}]}>{language.forgetPwInstruction}</Text>
                <Input
                       placeholder={language.forgetPwEmailInput}
                       inputStyle={{color: theme.normalText}}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='mail-outline'
                                 color={theme.primaryEmphasis}/>
                       }
                       onChangeText={(text) => handleEmailInput(text)}
                />
                {renderEmailValidation(email)}
                <Button
                        type='outline'
                        buttonStyle={{borderColor: theme.primaryButton}}
                        titleStyle={{color: theme.primaryButton}}
                        title={language.forgetPwEmailButton}
                        containerStyle={{paddingLeft: 40, paddingRight: 40}}
                        onPress={handleSendEmailButton}/>
            </View>
        )
    }

    // state 2
    const renderConfirmationBox = () => {
        const {theme} = useContext(ThemeContext)
        return (
            <View style={{alignItems: 'stretch', paddingTop: 25}}>
                <Text style={[styles(theme).text, {fontWeight:'bold', fontSize: 16}]}>
                    Please enter the 4-digit code sended to your email
                </Text>
                <View style={{padding: 8, alignItems: 'center'}}>
                    <TimerClock onComplete={handleOnCompleteTimer}/>
                    <ConfirmationCode onChangeText={handleCodeInput}/>
                </View>
                <Button
                    onPress={handleVerifyCodeButton}
                    type='outline'
                    buttonStyle={{borderColor: theme.primaryButton}}
                    titleStyle={{color: theme.primaryButton}}
                    title='Verify Code'
                    containerStyle={{paddingLeft: 40, paddingRight: 40, paddingTop: 50}}/>
            </View>
        )
    }

    // state 3
    const renderResetPasswordBox = () => {
        const {theme} = useContext(ThemeContext)
        return (
            <View style={{alignItems: 'stretch', paddingTop: 25}}>
                <Text style={[styles(theme).text, {fontWeight:'bold', fontSize: 16}]}>
                    Change Password
                </Text>
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
                <Button
                    onPress={handleResetPasswordButton}
                    type='outline'
                    buttonStyle={{borderColor: theme.primaryButton}}
                    titleStyle={{color: theme.primaryButton}}
                    title='Reset Password'
                    containerStyle={{paddingLeft: 40, paddingRight: 40, paddingTop: 20}}/>
            </View>
        )
    }

    return(
        <View style={styles(theme).container}>
            {state === 1 && renderVerifyEmailBox()}
            {state === 2 && renderConfirmationBox()}
            {state === 3 && renderResetPasswordBox()}
        </View>
    )
};

const styles = (theme) => (
    StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: theme.background,
        },
        text: {
            color: theme.normalText,
            padding: 10,
            paddingLeft: 15
        },
    })
)

export default ForgetPassword;
