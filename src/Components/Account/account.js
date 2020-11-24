import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Button, Icon, Input} from "react-native-elements";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";
import {AuthenticationContext} from "../../Provider/authentication-provider";
import UnauthenticationView from "../Common/unauthentication-view";
import {EmailOverlay, PasswordOverlay, UserOverlay} from "./account-overlays";

const Account = (props) => {
    const [userOverLayVisible, setUserOverLayVisible] = useState(false);
    const [emailOverLayVisible, setEmailOverLayVisible] = useState(false);
    const [passwordOverLayVisible, setPasswordOverLayVisible] = useState(false);

    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)
    const {authentication, setAuthentication} = useContext(AuthenticationContext)

    const toggleUserOverlay = () => {
        setUserOverLayVisible(!userOverLayVisible);
    };

    const toggleEmailOverlay = () => {
        setEmailOverLayVisible(!emailOverLayVisible);
    };

    const togglePasswordOverlay = () => {
        setPasswordOverLayVisible(!passwordOverLayVisible);
    };

    const handleUpdateUsernameButton = (newUsername) => {
        setAuthentication({
            ...authentication,
            username: newUsername
        });
    }

    const handleUpdateEmailButton = (newEmail) => {
        setAuthentication({
            ...authentication,
            email: newEmail
        });
    }

    const handleUpdatePasswordButton = (currentPassword, newPassword) => {
        // do something
    }

    const handleSignOutButton = () => {
        setAuthentication(null)
        props.navigation.navigate(ScreenName.StartMenu)
    }

    if (authentication) {
        return (
            <ScrollView style={styles(theme).container}>
                {/*image container*/}
                <View style={styles(theme).avatarContainer}>
                    <Image style={styles(theme).image} source={{uri:'https://i.pinimg.com/originals/8a/f7/ed/8af7ed2daec49e34d1dbfeb52ba7a582.jpg'}}/>
                    <TouchableOpacity>
                        <Icon
                            type='font-awesome'
                            name='pencil-square-o'
                            color={theme.primaryEmphasis}
                            containerStyle={{alignSelf: 'flex-end'}}/>
                    </TouchableOpacity>
                </View>
                {/*info container*/}
                <View style={styles(theme).infoContainer}>
                    <Input
                        disabled
                        disabledInputStyle={{color: theme.normalText, fontWeight: 'bold'}}
                        value={authentication.username}
                        leftIcon={
                            <Icon
                                type='ionicons'
                                name='person'
                                color={theme.primaryEmphasis}
                            />
                        }
                        rightIcon={
                            <TouchableOpacity onPress={toggleUserOverlay}>
                                <Icon
                                    type='font-awesome'
                                    color={theme.primaryEmphasis}
                                    name='pencil-square-o'
                                />
                            </TouchableOpacity>
                        }
                    />
                    <UserOverlay
                        visible={userOverLayVisible}
                        handleUpdateButton={handleUpdateUsernameButton}
                        toggle={toggleUserOverlay}/>
                    <Input
                        disabled
                        disabledInputStyle={{color: theme.normalText, fontWeight: 'bold'}}
                        value={authentication.email}
                        leftIcon={
                            <Icon
                                type='ionicons'
                                name='mail'
                                color={theme.primaryEmphasis}
                            />
                        }
                        rightIcon={
                            <TouchableOpacity onPress={toggleEmailOverlay}>
                                <Icon
                                    type='font-awesome'
                                    color={theme.primaryEmphasis}
                                    name='pencil-square-o'
                                />
                            </TouchableOpacity>
                        }
                    />
                    <EmailOverlay
                        visible={emailOverLayVisible}
                        handleUpdateButton={handleUpdateEmailButton}
                        toggle={toggleEmailOverlay}/>
                    <Button
                        type="clear"
                        icon={
                            <Icon
                                type='ionicons'
                                name='lock'
                                color={theme.primaryEmphasis}
                            />
                        }
                        iconLeft
                        titleStyle={{paddingLeft: 6, color: theme.primaryButton}}
                        title={language.changePassword}
                        onPress={togglePasswordOverlay}/>
                    <PasswordOverlay
                        visible={passwordOverLayVisible}
                        handleUpdateButton={handleUpdatePasswordButton}
                        toggle={togglePasswordOverlay}/>
                </View>
                <Button
                    onPress={handleSignOutButton}
                    type="outline"
                    buttonStyle={{borderColor: theme.secondaryButton}}
                    containerStyle={{padding: 40}}
                    titleStyle={{color: theme.secondaryButton}}
                    icon={{ type: 'font-awesome', name: 'sign-out', color: theme.secondaryEmphasis}}
                    iconLeft
                    title={language.signOut}/>
            </ScrollView>
        )
    } else {
        return (
            <UnauthenticationView navigation={props.navigation}/>
        )
    }
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
    avatarContainer: {
        height: 374,
        width: 350,
        alignSelf: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        //borderRadius: 175,
        borderWidth: 2,
        borderColor: theme.primaryEmphasis,
        aspectRatio: 1
    },
    infoContainer: {
        alignItems: 'flex-start'
    },
});

export default Account;
