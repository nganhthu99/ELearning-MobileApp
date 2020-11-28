import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import StartStack from "./src/Components/Navigation/start-stack";
import {ThemeProvider} from "./src/Provider/theme-provider";
import {LanguageProvider} from "./src/Provider/language-provider";
import {AuthenticationProvider} from "./src/Provider/authentication-provider";

export default function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AuthenticationProvider>
                    <NavigationContainer>
                        <StartStack/>
                    </NavigationContainer>
                </AuthenticationProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
