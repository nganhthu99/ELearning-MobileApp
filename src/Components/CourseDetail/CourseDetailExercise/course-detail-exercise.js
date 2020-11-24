import React, {useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {ThemeContext} from "../../../Provider/theme-provider";

const CourseDetailExercise = (props) => {
    const {theme} = useContext(ThemeContext)

    return (
        <View style={styles(theme).container}>
            <Text style={{color: theme.normalText}}>
                Course Detail Exercise
            </Text>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
});

export default CourseDetailExercise;
