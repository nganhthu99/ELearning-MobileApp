import {Button, Icon, Input, Overlay} from "react-native-elements";
import {Text, View} from "react-native";
import React, {useContext, useState} from "react";
import {ThemeContext} from "../../Provider/theme-provider";
import {renderEmailValidation, renderPasswordValidation, renderUsernameValidation} from "../Start/render-validation";

export const UserOverlay = (props) => {
    const {theme} = useContext(ThemeContext)
    const [username, setUsername] = useState('')

    const handleOnChangeText = (text) => {
        setUsername(text)
    }

    const handleUpdateButton = () => {
        props.handleUpdateButton(username)
        props.toggle()
    }

    return (
        <Overlay
            overlayStyle={{height: 250, width: '100%', justifyContent: 'center'}}
            isVisible={props.visible}
            onBackdropPress={() => props.toggle()}>
            <View>
                <View style={{paddingLeft: 15, paddingTop: 10, paddingBottom: 10}}>
                    <Text style={{color: theme.primaryEmphasis,fontWeight:'bold', fontSize: 18}}>Change Username</Text>
                </View>
                <Input placeholder='New Username'
                       leftIcon={
                           <Icon type='ionicons'
                                 name='person'
                                 color={theme.primaryEmphasis}/>
                       }
                       onChangeText={(text) => handleOnChangeText(text)}
                       errorMessage={renderUsernameValidation(username)}
                       errorStyle={{color: theme.secondaryButton}}
                />
                <Button type='outline'
                        title='Update'
                        containerStyle={{paddingLeft: 40, paddingRight: 40}}
                        onPress={handleUpdateButton}/>
            </View>
        </Overlay>
    )
}

export const EmailOverlay = (props) => {
    const {theme} = useContext(ThemeContext)
    const [email, setEmail] = useState('')

    const handleOnChangeText = (text) => {
        setEmail(text)
    }

    const handleUpdateButton = () => {
        props.handleUpdateButton(email)
        props.toggle()
    }

    return (
        <Overlay
            overlayStyle={{height: 250, width: '100%', justifyContent: 'center'}}
            isVisible={props.visible}
            onBackdropPress={() => props.toggle()}>
            <View>
                <View style={{paddingLeft: 15, paddingTop: 10, paddingBottom: 10}}>
                    <Text style={{color: theme.primaryEmphasis,fontWeight:'bold', fontSize: 18}}>Change Email</Text>
                </View>
                <Input placeholder='New Email'
                       leftIcon={
                           <Icon type='ionicons'
                                 name='mail'
                                 color={theme.primaryEmphasis}/>
                       }
                       onChangeText={(text) => handleOnChangeText(text)}
                       errorMessage={renderEmailValidation(email)}
                       errorStyle={{color: theme.secondaryButton}}
                />
                <Button type='outline'
                        title='Update'
                        containerStyle={{paddingLeft: 40, paddingRight: 40}}
                        onPress={handleUpdateButton}/>
            </View>
        </Overlay>
    )
}

export const PasswordOverlay = (props) => {
    const {theme} = useContext(ThemeContext)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const handleOnChangeCurrentPassword = (text) => {
        setCurrentPassword(text)
    }

    const handleOnChangeNewPassword = (text) => {
        setNewPassword(text)
    }

    const handleUpdateButton = () => {
        props.handleUpdateButton(currentPassword, newPassword)
        props.toggle()
    }

    return (
        <Overlay
            overlayStyle={{height: 300, width: '100%', justifyContent: 'center'}}
            isVisible={props.visible}
            onBackdropPress={() => props.toggle()}>
            <View>
                <View style={{paddingLeft: 15, paddingTop: 10, paddingBottom: 10}}>
                    <Text style={{color: theme.primaryEmphasis,fontWeight:'bold', fontSize: 18}}>Change Password</Text>
                </View>
                <Input placeholder='Current Password'
                       secureTextEntry
                       leftIcon={
                           <Icon type='ionicons'
                                 name='lock-outline'
                                 color={theme.primaryEmphasis}/>
                       }
                       onChangeText={(text) => handleOnChangeCurrentPassword(text)}
                       errorMessage={renderPasswordValidation(currentPassword)}
                       errorStyle={{color: theme.secondaryButton}}
                />
                <Input placeholder='New Password'
                       secureTextEntry
                       leftIcon={
                           <Icon type='ionicons'
                                 name='lock'
                                 color={theme.primaryEmphasis}/>
                       }
                       onChangeText={(text) => handleOnChangeNewPassword(text)}
                       errorMessage={renderPasswordValidation(newPassword)}
                       errorStyle={{color: theme.secondaryButton}}
                />
                <Button type='outline'
                        title='Update'
                        containerStyle={{paddingLeft: 40, paddingRight: 40}}
                        onPress={handleUpdateButton}/>
            </View>
        </Overlay>
    )
}
