import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import HorizontalCourseItem from "../../CoursesList/HorizontalCourseList/horizontal-course-item";
import AuthorListItem from "./author-list-item";
import VerticalCourseItem from "../../CoursesList/VerticalCourseList/vertical-course-item";

const VerticalAuthorList = (props) => {
    const renderItem = ({ item }) => {
        return (
            <View style={{height: 120}}>
                <AuthorListItem
                    navigation={props.navigation}
                    item={item}/>
            </View>
        );
    };
    return(
        <View style={styles.container}>
            <FlatList data={props.items} renderItem={renderItem}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    },
});


export default VerticalAuthorList;
