import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
import {ThemeContext} from "../../../Provider/theme-provider";

const SearchHistoryItem = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleOnClick = () => {
        props.handleOnClick(props.item)
    }

    const handleDeleteButton = () => {
        props.handleDeleteButton(props.item)
    }

    return (
        <TouchableOpacity style={styles(theme).container} onPress={handleOnClick}>
            <Text style={{fontSize: 18, color: theme.normalText}}>{props.item.content}</Text>
            <Button
                onPress={handleDeleteButton}
                type="clear"
                icon={{ type: 'font-awesome', name: 'times', color: theme.primaryEmphasis, size: 15}}
                iconRight/>
        </TouchableOpacity>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: theme.primaryEmphasis
    },
});

export default SearchHistoryItem;
