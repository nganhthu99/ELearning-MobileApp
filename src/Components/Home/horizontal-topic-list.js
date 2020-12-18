import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
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
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                {props.items.map((item) => {
                    return (
                        <View key={item.id}
                              id={item.id}
                              style={{height: 150, width: 200, paddingRight: 5}}>
                            <ImageButton handleOnClick={() => handleTopicItemButton(item)}
                                         title={item.name}
                                         image={require('../../../assets/topic_background.jpg')}/>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        paddingBottom: 15,
        paddingTop: 10
    },
});

export default HorizontalTopicList;
