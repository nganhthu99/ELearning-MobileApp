import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {Rating} from "react-native-elements";
const CourseInfo = (props) => {
    return(
        <View style={styles.container}>
            <Text style={{fontWeight:'bold'}}>{props.item.title}</Text>
            <Text>{props.item.author}</Text>
            <Text>{`${props.item.level} . ${props.item.release} . ${props.item.duration}`}</Text>
            <Rating
                startingValue={4.4}
                type='star'
                ratingCount={5}
                imageSize={24}
                readonly
                style={{alignItems: 'flex-start'}}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
});

export default CourseInfo;
