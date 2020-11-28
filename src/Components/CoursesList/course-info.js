import React, {useContext} from 'react';
import {StyleSheet, View, Text} from "react-native";
import StarRating from "react-native-star-rating";
import {ThemeContext} from "../../Provider/theme-provider";

const CourseInfo = (props) => {
    const {theme} = useContext(ThemeContext)

    return(
        <View style={styles(theme).container}>
            <Text numberOfLines={1} style={[styles(theme).text, {fontWeight:'bold', fontSize: 16}]}>{props.item.title}</Text>
            <Text numberOfLines={1} style={styles(theme).text}>{props.item.author}</Text>
            <Text numberOfLines={1} style={styles(theme).text}>{`${props.item.level} . ${props.item.release} . ${props.item.duration}`}</Text>
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
                rating={props.item.rating}
                starSize={18}
                fullStarColor={theme.star}
                buttonStyle={{margin: 0.5}}
                containerStyle={{justifyContent:'flex-start'}}
            />
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        color: theme.normalText
    }
});

export default CourseInfo;
