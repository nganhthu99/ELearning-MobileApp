import React, {useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import StarRating from "react-native-star-rating";

const CourseInfo2 = (props) => {
    const {theme} = useContext(ThemeContext)

    return(
        <View style={styles(theme).container}>
            <Text numberOfLines={1} style={styles(theme).titleText}>{props.item["courseTitle"]}</Text>
            <Text numberOfLines={1} style={styles(theme).authorText}>{props.item["instructorName"]}</Text>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 15
    },
    authorText: {
        fontSize: 16,
        color: theme.text,
    },
    titleText: {
        color: theme.text,
        fontSize: 18,
        fontWeight:'bold',
        paddingBottom: 10
    }
});

export default CourseInfo2;
