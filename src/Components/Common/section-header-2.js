import React, {useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {ThemeContext} from "../../Core/Provider/theme-provider";

const SectionHeader2 = (props) => {
    const {theme} = useContext(ThemeContext)

    return(
        <View style={styles(theme).container}>
            <Text style={styles(theme).text}>{props.title}</Text>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    text: {
        color: theme.header,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default SectionHeader2;
