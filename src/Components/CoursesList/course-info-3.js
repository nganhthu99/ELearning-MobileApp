import React, {useContext} from 'react';
import {StyleSheet, View, Text} from "react-native";
import StarRating from "react-native-star-rating";
import {ThemeContext} from "../../Core/Provider/theme-provider";

const CourseInfo3 = (props) => {
    const {theme} = useContext(ThemeContext)
    const price = (props.course["price"] && parseInt(props.course["price"]) > 0) ? `${props.course["price"]} vnđ` : 'Free'
    let date = (props.course["createdAt"]) ? props.course["createdAt"] : props.course["updatedAt"]

    return(
        <View style={styles(theme).container}>
            <Text style={styles(theme).titleText}>{props.course.title}</Text>
            <Text numberOfLines={1} style={styles(theme).authorText}>{props.author.name}</Text>
            <Text numberOfLines={1} style={styles(theme).text}>{`${price} . ${date.substring(0, 10)} . ${props.course.totalHours} hours`}</Text>
            <StarRating
                disabled
                iconSet={'Ionicons'}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                maxStars={5}
                rating={props.course["ratedNumber"]}
                starSize={25}
                fullStarColor={theme.bright}
                buttonStyle={{margin: 0.5}}
                containerStyle={{justifyContent:'flex-start'}}
            />
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        color: theme.emphasis,
        fontWeight:'bold',
        fontSize: 24,
        paddingBottom: 2
    },
    authorText: {
        fontSize: 20,
        color: theme.text,
        paddingBottom: 2
    },
    text: {
        color: theme.text,
        fontSize: 15,
        paddingBottom: 2
    }
});

export default CourseInfo3;
