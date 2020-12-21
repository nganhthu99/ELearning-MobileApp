import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import VerticalAuthorListItem from "./vertical-author-list-item";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Core/Provider/theme-provider";

const VerticalAuthorList = (props) => {
    const {theme} = useContext(ThemeContext)

    // Control
    const handleOnClick = (item) => {
        props.navigation.navigate(ScreenName.AuthorDetail, {
            itemId: item.id
        })
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{height: 120}}>
                <VerticalAuthorListItem
                    type='search'
                    handleOnClick={handleOnClick}
                    item={item}/>
            </View>
        );
    };
    return(
        <View style={styles(theme).container}>
            <FlatList data={props.items}
                      renderItem={renderItem}
                      ItemSeparatorComponent={() => (
                          <View style={{
                              height: 1,
                              width: '100%',
                              backgroundColor: theme.primary,
                          }}/>
                      )}/>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
});


export default VerticalAuthorList;
