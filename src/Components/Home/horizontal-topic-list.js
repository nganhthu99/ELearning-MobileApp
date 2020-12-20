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
                             image={require('../../../assets/topic_background.jpg')}/>
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
