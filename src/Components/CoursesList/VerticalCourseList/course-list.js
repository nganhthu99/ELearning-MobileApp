import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import VerticalCourseList from "./vertical-course-list";
import {courses} from "../../../Data/data";
import SectionHeader2 from "../../Common/section-header-2";

const CourseList = (props) => {
    return(
        <ScrollView style={styles.container}>
            <View style={styles.list}>
                <View style={styles.header}>
                    <SectionHeader2 title={props.route.params.header}/>
                </View>
                <View>
                    <VerticalCourseList
                        navigation={props.navigation}
                        items={props.route.params.items}/>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    },
    list: {
        padding: 5
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10
    }
});

export default CourseList;
