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
import {getAllStorageKeys} from "./src/Core/Service/async-storage-service";

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

    return (
        <ThemeProvider>
            <AuthenticationProvider>
                <NavigationContainer>
                    <StartStack/>
                </NavigationContainer>
            </AuthenticationProvider>
        </ThemeProvider>
    );
}
