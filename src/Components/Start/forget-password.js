import React, {useContext, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from "react-native";
import {Button, Icon, Input} from "react-native-elements";
import {renderEmailValidation, validateEmailUtil} from "./render-validation";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {forgetPasswordSendEmailService} from "../../Core/Service/authentication-service";
import {ScreenName} from "../../Globals/constants";
import i18n from "i18n-js";
import {strings} from "../../Globals/Localization/string";

const ForgetPassword = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")

    // Control
    const handleEmailInput = (text) => {
        setEmail(text)
    }

    const handleSendEmailButton = () => {
        if (validateEmailUtil(email)) {
            setIsLoading(true)
            forgetPasswordSendEmailService(email)
                .then((response) => {
                    if (response.status === 200) {
                        Alert.alert(
                            'Send Email Successfully',
                            'Follow instruction on your email to reset your password.',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        props.navigation.replace(ScreenName.SignIn)
                                    }
                                }
                            ]
                        )
                    } else if (response.status === 400) {
                        Alert.alert(
                            'Error Sending Email',
                            'Email does not exist in the system.',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                    }
                                }
                            ]
                        )
                    } else {
                        Alert.alert(
                            'Error Sending Email',
                            'Please try again later.',
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
                        'Error Sending Email',
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

    return(
        <View style={styles(theme).container}>
            <View style={{alignItems: 'stretch', paddingTop: 20}}>
                {isLoading && <ActivityIndicator size='small' color={theme.emphasis}/>}
                <Text style={[styles(theme).text, {fontWeight:'bold', fontSize: 16}]}>{i18n.t(strings.forget_password_instruction)}</Text>
                <Input
                    placeholder={i18n.t(strings.registered_email)}
                    inputStyle={{color: theme.text}}
                    leftIcon={
                        <Icon type='ionicons'
                              name='mail-outline'
                              color={theme.emphasis}/>}
                    onChangeText={(text) => handleEmailInput(text)}
                    errorMessage={renderEmailValidation(email)}
                    errorStyle={{color: theme.danger}}/>
                <Button
                    type='outline'
                    buttonStyle={{borderColor: theme.primary}}
                    titleStyle={{color: theme.primary}}
                    title={i18n.t(strings.send_email_verification)}
                    containerStyle={{paddingLeft: 40, paddingRight: 40}}
                    onPress={handleSendEmailButton}/>
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
        text: {
            color: theme.emphasis,
            padding: 10,
            paddingLeft: 15
        },
    })
)

export default ForgetPassword;
