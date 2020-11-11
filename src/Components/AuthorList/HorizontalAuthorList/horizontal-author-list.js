import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import HorizontalAuthorItem from "./horizontal-author-item";

const HorizontalAuthorList = (props) => {
    const renderItem = ({ item }) => {
        return (
            <View key={item.id} style={{
                height: 200, width: 150,
                padding: 10,
                paddingLeft: 5,
               }}>
                <HorizontalAuthorItem
                    navigation={props.navigation}
                    key={item.id}
                    item={item}/>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList horizontal={true} data={props.items} renderItem={renderItem}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    },
});

export default HorizontalAuthorList;
