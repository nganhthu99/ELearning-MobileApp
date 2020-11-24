import React, {useContext, useState} from 'react';
import {Button, Input, Icon} from "react-native-elements";
import {StyleSheet, Text, View, TouchableOpacity, Alert} from "react-native";
import {ScreenName} from "../../Globals/constants";
import {signInService} from "../../Core/Service/authentication-service";
import {renderPasswordValidation, renderUsernameValidation} from "./render-validation";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";
import {AuthenticationContext} from "../../Provider/authentication-provider";

const SignIn = (props) => {
    // State
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [seePassword, setSeePassword] = useState(false)
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)
    const {setAuthentication} = useContext(AuthenticationContext)

    // Control
    const handleSeePasswordIcon = () => {
        setSeePassword(!seePassword);
    }

    const handleUsernameInput = (text) => {
        setUserName(text)
    }

    const handlePasswordInput = (text) => {
        setPassword(text)
    }

    const handleSignInButton = () => {
        if (username.length >= 6 && password.length >= 8) {
             const signInResult = signInService(username, password)
            if (signInResult.status === 200) {
                setAuthentication(signInResult.user)
                props.navigation.navigate(ScreenName.MainTab)
            } else {
                Alert.alert(
                    'Authentication Error',
                    'Wrong username or password!',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                        }
                    ]
                );
            }
        }
    }

    const handleGoogleButton = () => {
        // do something more
    }

    const handleForgetPasswordButton = () => {
        props.navigation.navigate(ScreenName.ForgetPassword)
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
                <Input placeholder={language.passwordInput}
                       inputStyle={{color: theme.normalText}}
                       secureTextEntry={!seePassword}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='lock-outline'
                                 color={theme.primaryEmphasis}/>
                       }
                       rightIcon={
                           <Icon
                               type='font-awesome-5'
                               name={(seePassword) ? 'eye' : 'eye-slash'}
                               color={theme.primaryEmphasis}
                               size={22}
                               onPress={handleSeePasswordIcon}
                           />
                       }
                       onChangeText={(text) => handlePasswordInput(text)}
                />
                {renderPasswordValidation(password)}
                <TouchableOpacity
                    style={{alignSelf: 'flex-end', paddingRight: 10, marginBottom: 20}}
                    onPress={handleForgetPasswordButton}>
                    <Text style={{color: theme.primaryButton,  textDecorationLine:'underline'}}>{language.forgetPwButton}</Text>
                </TouchableOpacity>
                <Button type='outline'
                        title={language.signIn}
                        containerStyle={{paddingLeft: 40, paddingRight: 40}}
                        buttonStyle={{borderColor: theme.primaryButton, marginBottom: 10}}
                        titleStyle={{color: theme.primaryButton}}
                        onPress={handleSignInButton}/>
                <Text style={{alignSelf: 'center', marginBottom: 10, color: theme.normalText}}>{language.or}</Text>
                <Button
                    type="outline"
                    title={language.googleSignIn}
                    containerStyle={{paddingLeft: 40, paddingRight: 40}}
                    buttonStyle={{borderColor: theme.secondaryButton}}
                    titleStyle={{color: theme.secondaryButton}}
                    icon={{ type: 'font-awesome-5', name: 'google', color: theme.secondaryEmphasis}}
                    iconLeft
                    onPress={handleGoogleButton}/>
            </View>
        </View>
    )
};

const styles = (theme) => (
    StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: theme.background
        },
        inputContainer: {
            flex: 5,
            paddingTop: 50
        }
    })
)
export default SignIn;
