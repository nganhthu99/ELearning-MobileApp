import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import StartStack from "./src/Components/Navigation/start-stack";
import {ThemeProvider} from "./src/Core/Provider/theme-provider";
import {AuthenticationProvider} from "./src/Core/Provider/authentication-provider";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import english from './src/Globals/Localization/english.json'
import vietnamese from './src/Globals/Localization/vietnamese.json'
import {
    getAllStorageKeys,
    getStorageDownloadedVideo,
    setStorageDownloadedVideo
} from "./src/Core/Service/async-storage-service";
import * as FileSystem from "expo-file-system";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DownloadedCoursesProvider} from "./src/Core/Provider/downloaded-courses-provider";
import {ContinueCoursesProvider} from "./src/Core/Provider/continue-courses-provider";
import {FavouriteCoursesProvider} from "./src/Core/Provider/favourite-courses-provider";

export default function App() {
    i18n.translations = {
        "en": english,
        "vi": vietnamese,
    };
    // Set the locale once at the beginning of your app.
    i18n.locale = Localization.locale;
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;

    getAllStorageKeys()
        .then((value) => {
            console.log(value)
        })

    // console.log(FileSystem.documentDirectory + 'bluedu-app/downloaded-video/')
    // FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'bluedu-app/')
    //     .then(result => {
    //         console.log('make directory: ', result)
    //     })
    //     .catch((error) => {
    //         console.log('make directory error: ', error)
    //     })

    // FileSystem.readAsStringAsync(FileSystem.documentDirectory)
    //     .then(result => {
    //         console.log('read directory: ', result)
    //     })
    //     .catch((error) => {
    //         console.log('read directory error: ', error)
    //     })

    // FileSystem.getInfoAsync(FileSystem.documentDirectory + 'bluedu-app/')
    //     .then(result => {
    //         console.log('read directory: ', result)
    //     })
    //     .catch((error) => {
    //         console.log('read directory error: ', error)
    //     })

    // FileSystem.deleteAsync(FileSystem.documentDirectory + 'fa77a36e-bc91-4fe0-a2a4-4ce38f0b46bb.mov')
    //     .then(result => {
    //         console.log('delete directory: ', result)
    //     })
    //     .catch((error) => {
    //         console.log('delete directory error: ', error)
    //     })

    // getStorageDownloadedVideo()
    //     .then((value) => {
    //         if (!value) {
    //             AsyncStorage.setItem('downloaded_video', [])
    //                 .then(() => {console.log('hehehe')})
    //         } else {
    //             AsyncStorage.setItem('downloaded_video', value.concat(video))
    //                 .then(() => {console.log('huhuhu')})
    //         }
    //     })

    // AsyncStorage.getItem('downloaded_video')
    //     .then((value) => {
    //         if (!value)
    //             AsyncStorage.setItem('downloaded_video', JSON.stringify([]))
    //         else
    //             AsyncStorage.setItem('downloaded_video', JSON.stringify(value.concat(JSON.stringify({id: 1, title: 'hello'}))))
    //     })

    // AsyncStorage.removeItem('downloaded_video')

    FileSystem.getInfoAsync(FileSystem.documentDirectory)
        .then(result => {
            console.log('directory info: ', result)
        })
        .catch((error) => {
            console.log('directory error: ', error)
        })

    return (
        <ThemeProvider>
            <AuthenticationProvider>
                <DownloadedCoursesProvider>
                    <ContinueCoursesProvider>
                        <FavouriteCoursesProvider>
                            <NavigationContainer>
                                <StartStack/>
                            </NavigationContainer>
                        </FavouriteCoursesProvider>
                    </ContinueCoursesProvider>
                </DownloadedCoursesProvider>
            </AuthenticationProvider>
        </ThemeProvider>
    );
}
