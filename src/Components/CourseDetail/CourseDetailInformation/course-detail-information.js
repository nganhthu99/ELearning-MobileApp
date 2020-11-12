import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import StarRating from "react-native-star-rating";
import {Icon} from "react-native-elements";
import HorizontalCourseList from "../../CoursesList/HorizontalCourseList/horizontal-course-list";
import {courses} from "../../../Data/data";
import CourseInfo from "../../CoursesList/course-info";
import SectionHeader2 from "../../Common/section-header-2";

const CourseDetailInformation = (props) => {
    return (
        <ScrollView style={styles.container}>
            <View style={{padding: 5}}>
                <CourseInfo item={props.route.params.item}/>
            </View>
            <View style={{flexDirection: 'row', padding: 5}}>
                <Text>Rating</Text>
                <StarRating
                    disabled
                    iconSet={'Ionicons'}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    maxStars={5}
                    rating={4.5}
                    starSize={18}
                    fullStarColor={'#0E66EE'}
                    containerStyle={{justifyContent:'flex-start'}}
                />
            </View>
            <View style={{flexDirection: "row", justifyContent:'space-evenly', padding: 5}}>
                <TouchableOpacity style={{flex: 1, borderColor:'#AED3F2', borderWidth: 2}}>
                    <Icon type='octicon' name='heart' size={35} color='#AED3F2'/>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, borderColor:'#AED3F2', borderWidth: 2}}>
                    <Icon type='octicon' name='pencil' size={35} color='#AED3F2'/>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, borderColor:'#AED3F2', borderWidth: 2}}>
                    <Icon type='ionicons' name='cloud-download' size={35} color='#AED3F2'/>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, borderColor:'#AED3F2', borderWidth: 2}}>
                    <Icon type='ionicons' name='share' size={35} color='#AED3F2'/>
                </TouchableOpacity>
            </View>
            <View style={{borderWidth: 2, borderColor: '#000000', height: 500, alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                    Course Information
                </Text>
            </View>
            <View style={{padding: 5}}>
                <View style={{paddingTop: 20, paddingBottom: 10}}>
                    <SectionHeader2 title='Related Courses'/>
                </View>
                <HorizontalCourseList
                    navigation={props.navigation}
                    items={courses}/>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    },
});

export default CourseDetailInformation;
