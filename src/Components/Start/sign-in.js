import React, {useContext, useEffect, useState} from 'react';
import {Button, Input, Icon} from "react-native-elements";
import {StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import {ScreenName} from "../../Globals/constants";
import {
    renderEmailValidation, renderPasswordValidation,
    validateEmailUtil, validatePasswordUtil,
} from "./render-validation";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import {signInService, signInWithGoogleService} from "../../Core/Service/authentication-service";
import * as Google from 'expo-google-app-auth';
import i18n from "i18n-js";
import {strings} from "../../Globals/Localization/string";
import {getStorageUser, initializeStorageUser, setStorageToken} from "../../Core/Service/storage-service";

const SignIn = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [seePassword, setSeePassword] = useState(false)

    // Listen
    useEffect(() => {
        if (authenticationContext.state.isAuthenticated) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: ScreenName.MainTab }],
            });
        }
    }, [authenticationContext.state.isAuthenticated])

    // Control
    const handleEmailInput = (text) => {
        setEmail(text)
    }

    const handlePasswordInput = (text) => {
        setPassword(text)
    }

    const handleSeePasswordIcon = () => {
        setSeePassword(!seePassword);
    }

    const handleForgetPasswordButton = () => {
        props.navigation.navigate(ScreenName.ForgetPassword)
    }

    const handleSignInButton = () => {
        if (validateEmailUtil(email) && validatePasswordUtil(password)) {
            setIsLoading(true)
            signInService(email, password)
                .then((response) => {
                    if (response.status === 200) {
                        console.log('hello')
                        // setStorageToken(response.data.token)
                        //     .then(() => {
                        //         authenticationContext.signIn(response)
                        //     })
                        //
                        getStorageUser(email)
                            .then((value) => {
                                if (!value) {
                                    initializeStorageUser(email)
                                        .then(() => {
                                            console.log('INITIALIZE USER: ', email)
                                            // setStorageToken(response.data.token)
                                            //     .then(() => {
                                            //         authenticationContext.signIn(response)
                                            //     })
                                        })
                                }
                            })
                        setStorageToken(response.data.token)
                            .then(() => {
                                authenticationContext.signIn(response)
                            })
                        //
                    } else if (response.status === 400) {
                        Alert.alert(
                            'Error Signing In',
                            'Wrong email or password',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                    }
                                }
                            ]
                        )
                    } else if (response.status === 403) {
                        Alert.alert(
                            'Error Signing In',
                            'Account has not been activated',
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
                            'Error Signing In',
                            'Please try again later',
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
                        'Error Signing In',
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

    const handleGoogleButton = async () => {
        const { type, user } = await Google.logInAsync({
            iosClientId: "373788081790-rqnoie3idj1i5b99u0qiovpmedvhjmp5.apps.googleusercontent.com",
            androidClientId: "373788081790-rd6nsepnibjmm4ejc67vt1b2dd1hmolb.apps.googleusercontent.com"
        });
        if (type === "success") {
            setIsLoading(true);
            signInWithGoogleService(user.email, user.id)
                .then((response) => {
                    if (response.status === 200) {
                        setStorageToken(response.data.token)
                            .then(() => {
                                authenticationContext.signIn(response)
                            })
                        //

                        //
                    } else {
                        Alert.alert(
                            'Error Signing In With Google',
                            'Please try again later',
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
                        'Error Signing In With Google',
                        'Please try again later',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                }
                            }
                        ]
                    )
                    console.log(error)
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
                {isLoading && <ActivityIndicator size='small'
                                                 color={theme.emphasis}/>}
                <Input placeholder={i18n.t(strings.email)}
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
                <Input placeholder={i18n.t(strings.password)}
                       inputStyle={{color: theme.text}}
                       secureTextEntry={!seePassword}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='lock-outline'
                                 color={theme.emphasis}/>
                       }
                       rightIcon={
                           <Icon
                               type='font-awesome-5'
                               name={(seePassword) ? 'eye' : 'eye-slash'}
                               color={theme.emphasis}
                               size={22}
                               onPress={handleSeePasswordIcon}/>
                       }
                       onChangeText={(text) => handlePasswordInput(text)}
                       errorMessage={renderPasswordValidation(password)}
                       errorStyle={{color: theme.danger}}
                />
                <TouchableOpacity
                    style={{alignSelf: 'flex-end', paddingRight: 10, marginBottom: 20}}
                    onPress={handleForgetPasswordButton}>
                    <Text style={{color: theme.primary, textDecorationLine: 'underline'}}>
                        {i18n.t('forget_password')}
                    </Text>
                </TouchableOpacity>
                <Button type='outline'
                        title={i18n.t(strings.sign_in)}
                        containerStyle={{paddingLeft: 40, paddingRight: 40}}
                        buttonStyle={{borderColor: theme.primary, marginBottom: 10}}
                        titleStyle={{color: theme.primary}}
                        onPress={handleSignInButton}/>
                <Text style={{alignSelf: 'center', marginBottom: 10, color: theme.text}}>
                    {i18n.t(strings.or)}
                </Text>
                <Button
                    type="outline"
                    title={i18n.t(strings.sign_in_with_google)}
                    icon={{ type: 'font-awesome-5', name: 'google', color: theme.danger}}
                    iconLeft
                    containerStyle={{paddingLeft: 40, paddingRight: 40}}
                    buttonStyle={{borderColor: theme.danger}}
                    titleStyle={{color: theme.danger}}
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
            paddingTop: 20
        }
    })
)

export default SignIn;
