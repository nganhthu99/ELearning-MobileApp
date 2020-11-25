import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import VerticalCourseList from "./vertical-course-list";
import SectionHeader2 from "../../Common/section-header-2";
import {ThemeContext} from "../../../Provider/theme-provider";

const CourseList = (props) => {
    const {theme} = useContext(ThemeContext)

    return(
        <ScrollView style={styles(theme).container}>
            <View style={styles(theme).list}>
                <View style={styles(theme).header}>
                    <SectionHeader2 title={props.route.params.header}/>
                </View>
                <View>
                    <VerticalCourseList
                        header={props.route.params.header}
                        navigation={props.navigation}
                        items={props.route.params.items}/>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
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
