import React, {useContext, useEffect} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Button, Icon} from "react-native-elements";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import UnauthenticationView from "../Common/unauthentication-view";
import ChangeUsername from "./change-username";
import ChangePhone from "./change-phone";
import ChangeEmail from "./change-email";
import ChangePassword from "./change-password";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";
import {clearAllStorage, removeStorageToken} from "../../Core/Service/async-storage-service";

const Account = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)

    // Control
    const handleSignOutButton = () => {
        clearAllStorage()
            .then(() => {
                authenticationContext.signOut()
            })
    }

    // View
    if(!authenticationContext.state.isAuthenticated) {
        return (
            <UnauthenticationView navigation={props.navigation}/>
        )
    } else {
        return (
            <ScrollView style={styles(theme).container}>
                {/*image container*/}
                <View style={styles(theme).avatarContainer}>
                    <Image style={styles(theme).image} source={{uri:'https://i.pinimg.com/originals/8a/f7/ed/8af7ed2daec49e34d1dbfeb52ba7a582.jpg'}}/>
                    <TouchableOpacity>
                        <Icon
                            type='font-awesome'
                            name='pencil-square-o'
                            color={theme.emphasis}
                            containerStyle={{alignSelf: 'flex-end'}}/>
                    </TouchableOpacity>
                </View>
                {/*info container*/}
                <View style={styles(theme).infoContainer}>
                    <ChangeUsername/>
                    <ChangeEmail/>
                    <ChangePhone/>
                    <ChangePassword/>
                </View>
                <Button
                    onPress={handleSignOutButton}
                    type="outline"
                    buttonStyle={{borderColor: theme.danger}}
                    containerStyle={{padding: 40}}
                    titleStyle={{color: theme.danger}}
                    icon={{ type: 'font-awesome', name: 'sign-out', color: theme.danger}}
                    iconLeft
                    title={i18n.t(strings.sign_out)}/>
            </ScrollView>
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
        borderColor: theme.emphasis,
        aspectRatio: 1
    },
    infoContainer: {
        alignItems: 'stretch',
        paddingTop: 30
    },
});

export default Account;
