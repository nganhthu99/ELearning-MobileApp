import React, {useContext} from 'react';
import {StyleSheet, View, Text} from "react-native";
import StarRating from "react-native-star-rating";
import {ThemeContext} from "../../Core/Provider/theme-provider";

const CourseInfo = (props) => {
    const {theme} = useContext(ThemeContext)
    const author = (props.item["name"]) ? (props.item["name"]) : props.item["instructor.user.name"] ? props.item["instructor.user.name"] : props.item["instructorName"]
    const price = (props.item["price"] && parseInt(props.item["price"]) > 0) ? `${props.item["price"]} vnđ` : 'Free'
    const date = (props.item["createdAt"]) ? props.item["createdAt"] : props.item["updatedAt"]
    const totalHours = Number(props.item.totalHours.toFixed(2))

    return(
        <View style={styles(theme).container}>
            <Text numberOfLines={1} style={[styles(theme).text, {fontWeight:'bold', fontSize: 18}]}>{props.item.title}</Text>
            <Text numberOfLines={1} style={styles(theme).authorText}>{author}</Text>
            <Text numberOfLines={1} style={styles(theme).text}>{`${price}  |  ${date.substring(0, 10)}  |  ${totalHours} hours`}</Text>
            <StarRating
                disabled
                iconSet={'Ionicons'}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                maxStars={5}
                rating={props.item["ratedNumber"]}
                starSize={18}
                fullStarColor={theme.bright}
                buttonStyle={{margin: 0.5}}
                containerStyle={{justifyContent:'flex-start'}}/>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
    },
    authorText: {
        fontSize: 16,
        color: theme.text
    },
    text: {
        color: theme.text,
        fontSize: 13
    }
});

export default CourseInfo;
