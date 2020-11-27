import React, {useContext} from 'react';
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../../Provider/theme-provider";

const SearchFilterList = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleOnClickItem = (item) => {
        // Function for click on an item
        props.handleOnClickItem(item)
    };

    const ItemView = ({item}) => {
        return (
            // Flat List Item
            <TouchableOpacity
                style={{height: 50, justifyContent: 'center'}}
                onPress={() => handleOnClickItem(item.title.toLowerCase())}>
                <Text style={{color: theme.normalText, fontSize: 18}}>
                    {item.title.toLowerCase()}
                </Text>
            </TouchableOpacity>
        );
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: theme.primaryEmphasis,
                }}
            />
        );
    };

    return (
        <FlatList
            keyboardShouldPersistTaps='handled'
            style={{padding: 15, paddingTop: 0}}
            data={props.filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            // ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
        />
    )
};

export default SearchFilterList;
