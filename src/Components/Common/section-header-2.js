import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Button, Icon} from "react-native-elements";

const SectionHeader2 = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        color: '#155FBF',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default SectionHeader2;
