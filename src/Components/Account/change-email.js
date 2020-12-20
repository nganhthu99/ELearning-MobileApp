import React, {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import {renderEmailValidation, validateUsernameUtil} from "../Start/render-validation";
import {ActivityIndicator, Alert, Text, TouchableOpacity, View} from "react-native";
import {Button, Icon, Input, Overlay} from "react-native-elements";
import {updateEmailService} from "../../Core/Service/authentication-service";

const ChangeEmail = (props) => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isOverLayVisible, setIsOverLayVisible] = useState(false);
    const [email, setEmail] = useState('')

    // Listen
    useEffect(() => {
        if (!authenticationContext.state.isAuthenticated) {
            props.navigation.popToTop()
        }
    }, [authenticationContext.state.isAuthenticated])

    // Control
    const handleOnChangeText = (text) => {
        setEmail(text)
    }

    const toggleOverlay = () => {
        setIsOverLayVisible(!isOverLayVisible);
    };

    const handleUpdateButton = () => {
        if (validateUsernameUtil(email)) {
            setIsLoading(true)
            updateEmailService(email, authenticationContext.state.token)
                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        Alert.alert(
                            'Update Email Successfully',
                            'Follow instruction on your email to activate your account with new email',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        authenticationContext.signOut()
                                    }
                                }
                            ]
                        )
                    } else if (response.status === 400) {
                        Alert.alert(
                            'Error Updating Email',
                            'Email has already existed in the system',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        toggleOverlay()
                                    }
                                }
                            ]
                        )
                    } else {
                        Alert.alert(
                            'Error Updating Email',
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
                        'Error Updating Email',
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

    return (
        <View style={{flex: 1}}>
            <Input
                disabled
                disabledInputStyle={{color: theme.text, fontWeight: 'bold', fontSize: 16}}
                value={authenticationContext.state.userInfo.email}
                leftIcon={
                    <Icon
                        type='ionicons'
                        name='mail'
                        color={theme.emphasis}
                    />
                }
                rightIcon={
                    <TouchableOpacity onPress={toggleOverlay}>
                        <Icon
                            type='font-awesome'
                            color={theme.emphasis}
                            name='pencil-square-o'
                        />
                    </TouchableOpacity>
                }
            />
            <Overlay
                overlayStyle={{height: 250, width: '100%', justifyContent: 'center'}}
                isVisible={isOverLayVisible}
                onBackdropPress={toggleOverlay}>
                <View>
                    <View style={{paddingLeft: 15, paddingBottom: 20}}>
                        <Text style={{color: theme.emphasis,fontWeight:'bold', fontSize: 18}}>Change Email</Text>
                    </View>
                    {isLoading && <ActivityIndicator size='small' color={theme.emphasis}/>}
                    <Input placeholder='New Email'
                           leftIcon={
                               <Icon type='ionicons'
                                     name='mail'
                                     color={theme.emphasis}/>
                           }
                           onChangeText={(text) => handleOnChangeText(text)}
                           errorMessage={renderEmailValidation(email)}
                           errorStyle={{color: theme.danger}}
                    />
                    <Button type='outline'
                            title='Update'
                            containerStyle={{paddingLeft: 40, paddingRight: 40, paddingTop: 10}}
                            onPress={handleUpdateButton}/>
                </View>
            </Overlay>
        </View>
    )
}

export default ChangeEmail
