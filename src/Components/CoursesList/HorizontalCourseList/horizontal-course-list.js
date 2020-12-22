import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import HorizontalCourseItem from "./horizontal-course-item";

const HorizontalCourseList = (props) => {
    const {theme} = useContext(ThemeContext)

    // Control
    const handleOnClick = (item) => {
        props.navigation.push(ScreenName.CourseDetail, {
            itemId: item.id
        })
    }

    const renderItem = ({ item }) => {
        return (
            <View key={item.id} style={{
                height: 250, width: 250,
                marginRight: 5,
                padding: 5,
                borderWidth: 1.5, borderColor: theme.primary, borderRadius: 3}}>
                <HorizontalCourseItem handleOnClick={handleOnClick}
                                      key={item.id}
                                      item={item}/>
            </View>
        );
    };
    return (
        <FlatList horizontal={true}
                  data={props.items}
                  renderItem={renderItem}
                  style={{padding: 5}}/>
    )
}

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
});


export default HorizontalCourseList;
