import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
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
import {clearAllStorage} from "../../Core/Service/async-storage-service";
import {ScreenName} from "../../Globals/constants";
import * as ImagePicker from 'expo-image-picker';
import {imgurUploadImageService} from "../../Core/Service/image-upload-service";
import {updateProfileService} from "../../Core/Service/authentication-service";

const Account = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const [isImageLoading, setIsImageLoading] = useState(false)
    // const [image, setImage] = useState(authenticationContext.state.userInfo.avatar);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    // Control
    const handleSignOutButton = () => {
        clearAllStorage()
            .then(() => {
                authenticationContext.signOut()
                props.navigation.replace(ScreenName.StartMenu)
            })
    }

    const handleUploadAvatarButton = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            imgurUpload(result.uri)
        }
    };

    const imgurUpload  = (image) => {
        setIsImageLoading(true)
        imgurUploadImageService(image)
            .then((response) => {
                updateProfileService(authenticationContext.state.userInfo.name, response.data.data.link,  authenticationContext.state.userInfo.phone, authenticationContext.state.token)
                    .then((response) => {
                        setIsImageLoading(false)
                        if (response.status === 200) {
                            authenticationContext.updateProfile(response)
                        } else if (response.status >= 400) {
                            Alert.alert(
                                'Error Updating Avatar',
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
            })
            .catch((error) => {
                console.log(error)
                Alert.alert(
                    'Error Upload Avatar',
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
                    {isImageLoading &&
                    <View style={{flex: 1}}>
                        <ActivityIndicator size='small'
                                           color={theme.emphasis}/>
                    </View>}
                    {!isImageLoading &&
                        <Image style={styles(theme).image} source={{uri: authenticationContext.state.userInfo.avatar}}/>
                    }
                    <TouchableOpacity onPress={handleUploadAvatarButton}>
                        <Icon
                            type='font-awesome'
                            color={theme.emphasis}
                            name='pencil-square-o'
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
        margin: 5
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 43.75,
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
