import React, {useContext, useEffect, useState} from 'react';
import {Image, View, StyleSheet, ActivityIndicator} from "react-native";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import {getUserInfoService} from "../../Core/Service/authentication-service";
import {getStorageToken, removeStorageToken} from "../../Core/Service/storage-service";

const SplashScreen = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getStorageToken()
            .then((storageToken) => {
                if(storageToken) {
                    getUserInfoService(storageToken)
                        .then((response) => {
                            if (response.status === 200) {
                                authenticationContext.signIn({
                                    data: {
                                        token: storageToken,
                                        userInfo: response.data.payload
                                    }
                                })
                            }
                        })
                        .catch((error) => {
                            removeStorageToken()
                                .then(() => {
                                    props.navigation.replace(ScreenName.StartMenu)
                                })
                        })
                        .finally(() => {
                            setIsLoading(false)
                        })
                } else {
                    props.navigation.replace(ScreenName.StartMenu)
                }
            })
    }, [])

    useEffect(() => {
        if (authenticationContext.state.isAuthenticated) {
            props.navigation.replace(ScreenName.MainTab)
        }
    }, [authenticationContext.state.isAuthenticated])

    // View
    return (
        <View style={styles(theme).container}>
            <Image style={styles(theme).iconLogo}
                   source={require('../../../assets/icon-logo.png')}/>
            {isLoading && <ActivityIndicator size="small"
                                             color={theme.emphasis}/>}
            <Image style={styles(theme).textLogo}
                   source={require('../../../assets/text-logo.png')}/>
        </View>
    )
};

const styles = (theme) => (
    StyleSheet.create({
        container: {
            flex:1,
            alignItems: 'center',
            backgroundColor: theme.background,
        },
        iconLogo: {
            flex: 7,
            width: 450,
            resizeMode: 'contain',
        },
        textLogo: {
            flex: 1,
            width: 200,
            resizeMode: 'contain',
            marginBottom: 20,
        }
    })
)

export default SplashScreen;
