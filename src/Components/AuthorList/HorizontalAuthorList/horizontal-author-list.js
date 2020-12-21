import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import HorizontalAuthorItem from "./horizontal-author-item";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Core/Provider/theme-provider";

const HorizontalAuthorList = (props) => {
    const {theme} = useContext(ThemeContext)

    // Control
    const handleOnClick = (itemId) => {
        props.navigation.navigate(ScreenName.AuthorDetail, {
            itemId,
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
        <FlatList horizontal
                  data={props.items}
                  renderItem={renderItem}
                  style={{
                      backgroundColor: theme.background,
                      paddingTop: 15,
                      paddingBottom: 10
                  }}/>
    )
}

export default HorizontalAuthorList;
