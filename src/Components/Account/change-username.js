import React, {useContext, useState} from "react";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import {renderUsernameValidation} from "../Start/render-validation";
import {updateProfileService} from "../../Core/Service/authentication-service";
import {ActivityIndicator, Alert, Text, TouchableOpacity, View} from "react-native";
import {Button, Icon, Input, Overlay} from "react-native-elements";
import {validateUsernameUtil} from "../../Core/Util/validate-input";

const ChangeUsername = (props) => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isOverLayVisible, setIsOverLayVisible] = useState(false);
    const [username, setUsername] = useState('')

    const toggleOverlay = () => {
        setIsOverLayVisible(!isOverLayVisible);
    };

    const handleOnChangeText = (text) => {
        setUsername(text)
    }

    const handleUpdateButton = () => {
        if (validateUsernameUtil(username)) {
            setIsLoading(true)
            updateProfileService(username, authenticationContext.state.userInfo.avatar, authenticationContext.state.userInfo.phone, authenticationContext.state.token)
                .then((response) => {
                    if (response.status === 200) {
                        authenticationContext.updateProfile(response)
                    }
                })
                .catch((error) => {
                    Alert.alert(
                        'Error Updating Username',
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
                    toggleOverlay()
                })
        }
    }

    return (
        <View style={{flex: 1}}>
            <Input
                disabled
                disabledInputStyle={{color: theme.text, fontWeight: 'bold', fontSize: 16}}
                value={authenticationContext.state.userInfo.name}
                leftIcon={
                    <Icon
                        type='ionicons'
                        name='person'
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
                        <Text style={{color: theme.emphasis,fontWeight:'bold', fontSize: 18}}>Change Username</Text>
                    </View>
                    {isLoading && <ActivityIndicator size='small' color={theme.emphasis}/>}
                    <Input placeholder='New Username'
                           leftIcon={
                               <Icon type='ionicons'
                                     name='person'
                                     color={theme.emphasis}/>
                           }
                           onChangeText={(text) => handleOnChangeText(text)}
                           errorMessage={renderUsernameValidation(username)}
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

export default ChangeUsername
