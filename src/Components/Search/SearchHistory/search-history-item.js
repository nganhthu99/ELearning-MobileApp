import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button} from "react-native-elements";

const SearchHistoryItem = (props) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={{fontSize: 18}}>{props.item.content}</Text>
            <Button
                type="clear"
                icon={{ type: 'font-awesome', name: 'times', color: '#021F59', size: 15}}
                iconRight/>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#021F59'
    },
});

export default SearchHistoryItem;
