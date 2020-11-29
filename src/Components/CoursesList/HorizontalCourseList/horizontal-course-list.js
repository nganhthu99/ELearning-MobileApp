import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import HorizontalCourseItem from "./horizontal-course-item";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Provider/theme-provider";

const HorizontalCourseList = (props) => {
    const {theme} = useContext(ThemeContext)

    // Control
    const handleOnClick = (item) => {
        props.navigation.push(ScreenName.CourseDetail, {
            item: item
        })
    }

    const renderItem = ({ item }) => {
        return (
            <View key={item.id} style={{
                height: 250, width: 250,
                marginRight: 5,
                padding: 5,
                borderWidth: 1.5, borderColor: theme.primaryEmphasis, borderRadius: 3}}>
                <HorizontalCourseItem
                    handleOnClick={handleOnClick}
                    key={item.id}
                    item={item}/>
            </View>
        );
    };
    return (
        <View style={styles(theme).container}>
            <FlatList horizontal={true} data={props.items} renderItem={renderItem}/>
        </View>
    )
}

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
});


export default HorizontalCourseList;
