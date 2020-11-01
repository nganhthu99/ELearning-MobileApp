import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import ListItem from "./list-item";
import ChannelInfo from "../channel-info";

const List = (props) => {
    const renderListItems = (courses) => {
        return courses.map((item) => {
            return <ListItem key={item.id} item={item} type={props.type}/>
        })
    }

    return (
        <View style={styles.container}>
            {props.header !=='no_text' && <Text style={{padding: 5, fontSize: 30}}>{props.title}</Text>}
            <ScrollView>
                {renderListItems(props.items)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: 20,
        //backgroundColor: '#F2F2F2',

        // borderWidth: 10,
        // borderColor: '#AAAAAA',
    },
});

export default List;
