import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from "react-native";
import ImageButton from "../Common/image-button";
import {ScreenName} from "../../Globals/constants";

const HorizontalTopicList = (props) => {
    const handleTopicItemButton = (item) => {
        props.navigation.navigate(ScreenName.CourseList, {
            header: item.name,
            category: item.id,
            items: [],
        })
    }

    const renderItem = ({item}) => {
        return (
            <View key={item.id}
                  id={item.id}
                  style={{height: 150, width: 200, paddingRight: 3}}>
                <ImageButton handleOnClick={() => handleTopicItemButton(item)}
                             title={item.name}
                             image={{uri: 'https://images.pexels.com/photos/4210784/pexels-photo-4210784.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}}/>
            </View>
        )
    }

    return (
        <FlatList horizontal
                  data={props.items}
                  renderItem={renderItem}
                  style={{padding: 5, paddingBottom: 15, paddingTop: 10}}/>
    )
}

export default HorizontalTopicList;
