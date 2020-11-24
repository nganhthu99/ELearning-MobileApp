import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import AuthorListItem from "./author-list-item";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Provider/theme-provider";

const VerticalAuthorList = (props) => {
    const {theme} = useContext(ThemeContext)

    // Control
    const handleOnClick = (item) => {
        props.navigation.navigate(ScreenName.AuthorDetail, {
            item: item
        })
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{height: 120}}>
                <AuthorListItem
                    handleOnClick={handleOnClick}
                    item={item}/>
            </View>
        );
    };
    return(
        <View style={styles(theme).container}>
            <FlatList data={props.items} renderItem={renderItem}/>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
});


export default VerticalAuthorList;
