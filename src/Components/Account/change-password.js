import React, {useContext, useState} from "react";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {ActivityIndicator, Alert, Text, View} from "react-native";
import {Button, Icon, Input, Overlay} from "react-native-elements";
import {renderPasswordValidation} from "../Start/render-validation";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import {updatePasswordService} from "../../Core/Service/authentication-service";
import {strings} from "../../Globals/Localization/string";
import {validatePasswordUtil} from "../../Core/Util/validate-input";
import i18n from 'i18n-js';

const ChangePassword = (props) => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isOverLayVisible, setIsOverLayVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const toggleOverlay = () => {
        setIsOverLayVisible(!isOverLayVisible);
    };

    const handleOnChangeCurrentPassword = (text) => {
        setCurrentPassword(text)
    }

    const handleOnChangeNewPassword = (text) => {
        setNewPassword(text)
    }

    const handleUpdateButton = () => {
        if (validatePasswordUtil(currentPassword) && validatePasswordUtil(newPassword)) {
            setIsLoading(true)
            updatePasswordService(authenticationContext.state.userInfo.id, currentPassword, newPassword, authenticationContext.state.token)
                .then((response) => {
                    if (response.status === 200) {
                        Alert.alert(
                            'Update Password Successfully',
                            '',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        toggleOverlay()
                                    }
                                }
                            ]
                        )
                    } else if (response.status === 400) {
                        Alert.alert(
                            'Error Updating Password',
                            'Incorrect current password',
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
                            'Error Updating Password',
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
                        'Error Updating Password',
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
        <View style={{flex: 1, alignSelf: 'flex-start'}}>
            <Button
                type="clear"
                icon={<Icon
                        type='ionicons'
                        name='lock'
                        color={theme.emphasis}/>}
                iconLeft
                titleStyle={{paddingLeft: 6, color: theme.primary}}
                title={i18n.t(strings.change_password)}
                onPress={toggleOverlay}/>
            <Overlay
                overlayStyle={{height: 330, width: '100%', justifyContent: 'center'}}
                isVisible={isOverLayVisible}
                onBackdropPress={toggleOverlay}>
                <View>
                    <View style={{paddingLeft: 15, paddingBottom: 20}}>
                        <Text style={{color: theme.emphasis,fontWeight:'bold', fontSize: 18}}>{i18n.t(strings.change_password)}</Text>
                    </View>
                    {isLoading && <ActivityIndicator size='small' color={theme.emphasis}/>}
                    <Input placeholder={i18n.t(strings.current_password)}
                           secureTextEntry
                           leftIcon={
                               <Icon type='ionicons'
                                     name='lock-outline'
                                     color={theme.emphasis}/>
                           }
                           onChangeText={(text) => handleOnChangeCurrentPassword(text)}
                           errorMessage={renderPasswordValidation(currentPassword)}
                           errorStyle={{color: theme.danger}}
                    />
                    <Input placeholder={i18n.t(strings.new_password)}
                           secureTextEntry
                           leftIcon={
                               <Icon type='ionicons'
                                     name='lock'
                                     color={theme.emphasis}/>
                           }
                           onChangeText={(text) => handleOnChangeNewPassword(text)}
                           errorMessage={renderPasswordValidation(newPassword)}
                           errorStyle={{color: theme.danger}}
                    />
                    <Button type='outline'
                            title={i18n.t(strings.update)}
                            containerStyle={{paddingLeft: 40, paddingRight: 40, paddingTop: 10}}
                            onPress={handleUpdateButton}/>
                </View>
            </Overlay>
        </View>
    )
}

export default ChangePassword
