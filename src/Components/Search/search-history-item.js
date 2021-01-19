import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
import {ThemeContext} from "../../Core/Provider/theme-provider";

const SearchHistoryItem = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleOnClick = () => {
        props.handleOnClick(props.item)
    }

    const handleDelete= () => {
        props.handleDeleteButton(props.item)
    }

    return (
        <TouchableOpacity style={styles(theme).container} onPress={handleOnClick}>
            <Text style={{fontSize: 16, color: theme.text}}>{props.item.content}</Text>
            <Button
                onPress={handleDelete}
                type="clear"
                icon={{type: 'font-awesome', name: 'times', color: theme.emphasis, size: 14}}
                iconRight/>
        </TouchableOpacity>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: theme.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 5
    },
});

export default SearchHistoryItem;
