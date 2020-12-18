import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import HorizontalAuthorItem from "./horizontal-author-item";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Core/Provider/theme-provider";

const HorizontalAuthorList = (props) => {
    const {theme} = useContext(ThemeContext)

    // Control
    const handleOnClick = (item) => {
        props.navigation.navigate(ScreenName.AuthorDetail, {
            item: item
        })
    }

    const renderItem = ({ item }) => {
        return (
            <HorizontalAuthorItem
                handleOnClick={handleOnClick}
                key={item.id}
                item={item}/>
        );
    };

    return (
        <FlatList horizontal={true}
                  data={props.items}
                  renderItem={renderItem}
                  style={{
                      backgroundColor: theme.background,
                      paddingTop: 15,
                      paddingBottom: 10
                  }}/>
    )
}

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
});

export default HorizontalAuthorList;
