import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import ImageButton from "../Common/image-button";
import {courses} from "../../Data/data";

const HorizontalTopicList = (props) => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                {props.items.map((item) => {
                    return (
                        <View key={item.id} style={{height: 150, width: 200, paddingRight: 5}}>
                            <ImageButton
                                handleOnClick={() => {
                                    props.navigation.navigate('CourseList', {
                                    header: item.title,
                                    items: courses
                                })}}
                                key={item.id}
                                title={item.title}
                                image={require('../../../assets/course.jpg')}/>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});


export default HorizontalTopicList;
