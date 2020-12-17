import React, {useContext, useState} from 'react';
import {Button, Input} from "react-native-elements";
import {ActivityIndicator, Alert, StyleSheet, View} from "react-native";
import { Icon } from 'react-native-elements'
import {ScreenName} from "../../Globals/constants";
import {
    renderConfirmPasswordValidation, renderEmailValidation,
    renderPasswordValidation, renderPhoneValidation,
    renderUsernameValidation, validateConfirmPasswordUtil,
    validateEmailUtil, validatePasswordUtil,
    validatePhoneUtil, validateUsernameUtil
} from "./render-validation";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {LanguageContext} from "../../Core/Provider/language-provider";
import {signUpService} from "../../Core/Service/authentication-service";

const SignUp = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Control
    const handleUsernameInput = (text) => {
        setUsername(text)
    }

    const handleEmailInput = (text) => {
        setEmail(text)
    }

    const handlePhoneInput = (text) => {
        setPhone(text)
    }

    const handlePasswordInput = (text) => {
        setPassword(text)
    }

    const handleConfirmPasswordInput = (text) => {
        setConfirmPassword(text)
    }

    const handleSignUpButton = () => {
        if (validateUsernameUtil(username) &&
            validateEmailUtil(email) &&
            validatePhoneUtil(phone) &&
            validatePasswordUtil(password) &&
            validateConfirmPasswordUtil(confirmPassword, password)) {
            setIsLoading(true)
            signUpService(username, email, phone, password)
                .then((response) => {
                    if (response.status === 200) {
                        Alert.alert(
                            'Sign Up Successfully',
                            'Follow instruction on your email to activate your account',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        props.navigation.navigate(ScreenName.SignIn)
                                    }
                                }
                            ]
                        )
                    } else if (response.status === 400){
                        Alert.alert(
                            'Error Signing Up',
                            'Email or phone number has already existed',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                    }
                                }
                            ]
                        )
                    }
                })
                .catch((error) => {
                    Alert.alert(
                        'Error Signing Up',
                        'Please try again later',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                }
                            }
                        ]
                    )
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    // View
    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).inputContainer}>
                {isLoading && <ActivityIndicator size='small' color={theme.emphasis}/>}
                <Input placeholder={language.username}
                       inputStyle={{color: theme.text}}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='person-outline'
                                 color={theme.emphasis}/>
                       }
                       onChangeText={(text) => handleUsernameInput(text)}
                       errorMessage={renderUsernameValidation(username)}
                       errorStyle={{color: theme.danger}}
                />
                <Input placeholder={language.email}
                       inputStyle={{color: theme.text}}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='mail-outline'
                                 color={theme.emphasis}/>
                       }
                       onChangeText={(text) => handleEmailInput(text)}
                       errorMessage={renderEmailValidation(email)}
                       errorStyle={{color: theme.danger}}
                />
                <Input placeholder={language.phone}
                       inputStyle={{color: theme.text}}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='call'
                                 color={theme.emphasis}/>
                       }
                       onChangeText={(text) => handlePhoneInput(text)}
                       errorMessage={renderPhoneValidation(phone)}
                       errorStyle={{color: theme.danger}}
                />
                <Input placeholder={language.password}
                       inputStyle={{color: theme.text}}
                       secureTextEntry={true}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='lock-outline'
                                 color={theme.emphasis}/>
                       }
                       onChangeText={(text) => handlePasswordInput(text)}
                       errorMessage={renderPasswordValidation(password)}
                       errorStyle={{color: theme.danger}}
                />
                <Input placeholder={language.confirm_password}
                       inputStyle={{color: theme.text}}
                       secureTextEntry={true}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='lock'
                                 color={theme.emphasis}/>
                       }
                       onChangeText={(text) => handleConfirmPasswordInput(text)}
                       errorMessage={renderConfirmPasswordValidation(confirmPassword, password)}
                       errorStyle={{color: theme.danger}}
                />
                <Button type='outline'
                        title={language.sign_up}
                        buttonStyle={{borderColor: theme.primary}}
                        titleStyle={{color: theme.primary}}
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
            paddingTop: 20
        },
    })
)

export default SignUp
