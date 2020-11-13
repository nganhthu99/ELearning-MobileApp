import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import CourseDetailTab from "../Navigation/CourseDetail/course-detail-tab";

const CourseDetail = (props) => {
    return(
        <View style={styles.container}>
            <View style={{borderWidth: 2, borderColor: '#000000', height: 220, alignItems: 'center', justifyContent: 'center'}}>
                <Text>VIDEO</Text>
            </View>
            <CourseDetailTab
                navigation={props.navigation}
                item={props.route.params.item}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
});

export default CourseDetail;
