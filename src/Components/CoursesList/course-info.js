import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import StarRating from "react-native-star-rating";
import {Rating} from "react-native-elements";

const CourseInfo = (props) => {
    return(
        <View style={styles.container}>
            <Text numberOfLines={1} style={[styles.text, {fontWeight:'bold', fontSize: 16}]}>{props.item.title}</Text>
            <Text numberOfLines={1} style={styles.text}>{props.item.author}</Text>
            <Text numberOfLines={1} style={styles.text}>{`${props.item.level} . ${props.item.release} . ${props.item.duration}`}</Text>
            {/*<Rating*/}
            {/*    readonly*/}
            {/*    type='star'*/}
            {/*    imageSize={20}*/}
            {/*    ratingCount={5}*/}
            {/*    startingValue={4.4}*/}
            {/*    style={{alignItems: 'flex-start'}}*/}
            {/*/>*/}
            <StarRating
                disabled
                iconSet={'Ionicons'}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                maxStars={5}
                rating={4.5}
                starSize={18}
                fullStarColor={'#0E66EE'}
                buttonStyle={{margin: 0.5}}
                containerStyle={{justifyContent:'flex-start'}}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        color: '#011534'
    }
});

export default CourseInfo;
