import React, {useContext, useEffect, useState} from 'react';
import {Image, View, StyleSheet, ActivityIndicator} from "react-native";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import {clearAllStorage, getStorageToken} from "../../Core/Service/async-storage-service";
import {getUserInfoService} from "../../Core/Service/authentication-service";

const SplashScreen = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
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
                        .catch(() => {
                            clearAllStorage()
                                .then(() => {
                                    props.navigation.navigate(ScreenName.StartMenu)
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
            props.navigation.navigate(ScreenName.MainTab)
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
