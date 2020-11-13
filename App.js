import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import StartStack from "./src/Components/Navigation/start-stack";

export default function App() {
    return (
        <NavigationContainer>
            <StartStack/>
        </NavigationContainer>
    );
}
