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
import * as FileSystem from "expo-file-system";
import {DownloadedCoursesProvider} from "./src/Core/Provider/downloaded-courses-provider";
import {ContinueCoursesProvider} from "./src/Core/Provider/continue-courses-provider";
import {FavouriteCoursesProvider} from "./src/Core/Provider/favourite-courses-provider";
import {clearAllStorageKeys, getAllStorageKeys} from "./src/Core/Service/storage-service";

export default function App() {
    i18n.translations = {
        "en": english,
        "vi": vietnamese,
    };
    // Set the locale once at the beginning of your app.
    i18n.locale = Localization.locale;
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;

    // clearAllStorageKeys()
    //     .then(() => {
    //         console.log("CLEAR ALL STORAGE DONE!")
    //     })

    // FileSystem.deleteAsync(FileSystem.documentDirectory + "a4a4af67-c240-4ced-9884-868ffc0c95bd.mp4")
    //     .then(result => {
    //         console.log('delete directory: ', result)
    //     })
    //     .catch((error) => {
    //         console.log('delete directory error: ', error)
    //     })

    FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
        .then(result => {
            console.log('DOCUMENT DIRECTORY INFO: ', result)
        })
        .catch((error) => {
            console.log('DOCUMENT DIRECTORY error: ', error)
        })

    getAllStorageKeys()
        .then((value) => {
            console.log('ASYNC STORAGE KEYS: ', value)
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
