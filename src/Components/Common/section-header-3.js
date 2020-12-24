import React, {useContext} from 'react';
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {StyleSheet, Text, View} from "react-native";

const SectionHeader3 = (props) => {
    const {theme} = useContext(ThemeContext)

    return(
        <View style={styles(theme).container}>
            <Text style={styles(theme).headerText}>{props.title}</Text>
            <Text style={styles(theme).numberText}>{`${props.number} results`}</Text>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    headerText: {
        color: theme.header,
        fontSize: 20,
        fontWeight: 'bold'
    },
    numberText: {
        color: theme.header,
        fontSize: 12
    }
});

export default SectionHeader3;
