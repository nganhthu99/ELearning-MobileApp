import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import HorizontalAuthorItem from "./horizontal-author-item";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Provider/theme-provider";

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
            <View key={item.id} style={{
                height: 200, width: 150,
                padding: 10,
                paddingLeft: 5,
               }}>
                <HorizontalAuthorItem
                    handleOnClick={handleOnClick}
                    key={item.id}
                    item={item}/>
            </View>
        );
    };

    return (
        <View style={styles(theme).container}>
            <FlatList horizontal={true} data={props.items} renderItem={renderItem}/>
        </View>
    )
}

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
});

export default HorizontalAuthorList;
