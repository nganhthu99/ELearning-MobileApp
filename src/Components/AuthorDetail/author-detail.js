import React, {useContext, useState, useEffect} from 'react';
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import VerticalCourseList from "../CoursesList/VerticalCourseList/vertical-course-list";
import SectionHeader2 from "../Common/section-header-2";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {getIntructorInfo} from "../../Core/Service/instructor-service";
import {Icon} from "react-native-elements";
import AuthorDetailNoCourses from "../Common/NoDataView/author-detail-no-courses";

const AuthorDetail = (props) => {
    const {theme} = useContext(ThemeContext)
    const [isLoading, setIsLoading] = useState(true)
    const [detail, setDetail] = useState({})
    useEffect(() => {
        getIntructorInfo(props.route.params.itemId)
            .then((response) => {
                if (response.status === 200) {
                    setDetail(response.data.payload)
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <View style={{marginTop: 20}}>
                <ActivityIndicator size='small'
                                   color={theme.emphasis}/>
            </View>
        )
    } else return(
        <ScrollView style={styles(theme).container}>
            {/*image container*/}
            <View style={styles(theme).avatarContainer}>
                <Image style={styles(theme).image} source={{uri: detail.avatar}}/>
            </View>

            {/*general info container*/}
            <View style={styles(theme).generalInfoContainer}>
                <Text style={{color: theme.emphasis, fontWeight:'bold', fontSize: 22}}>{detail.name}</Text>
                <Text style={{color: theme.emphasis, fontSize: 18}}>{detail.major}</Text>
            </View>

            {/*detail info container*/}
            <View style={styles(theme).detailInfoContainer}>
                <Text style={[styles(theme).text, {fontWeight:'bold', fontSize: 14, paddingBottom: 15}]}>{detail.intro}</Text>
                <Text style={[styles(theme).text, {fontWeight:'bold', fontSize: 14}]}>Skills</Text>
                <View>
                    {detail["skills"] && detail["skills"].map(skill => {
                        return (
                            <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 5}}>
                                <Icon type='octicon'
                                      name='check'
                                      color={theme.emphasis}/>
                                <Text style={[styles(theme).text, {marginLeft: 20}]}>
                                    {skill}
                                </Text>
                            </View>
                        )
                    })}
                </View>
            </View>

            {/*courses container*/}
            <View style={styles(theme).coursesContainer}>
                <SectionHeader2 title={`${detail.name}'s courses`}/>
                {detail.courses &&
                <VerticalCourseList navigation={props.navigation}
                                    items={detail.courses}/>}
                {detail.courses && detail.courses.length === 0 &&
                <AuthorDetailNoCourses/>}
            </View>
        </ScrollView>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
    avatarContainer: {
        height: 350,
        width: 350,
        alignSelf: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: theme.emphasis,
        aspectRatio: 1
    },
    generalInfoContainer: {
        alignItems: 'center',
        padding: 10,
    },
    detailInfoContainer: {
        padding: 10,
    },
    text: {
        color: theme.text,
        fontSize: 15,
    },
    header: {
        paddingTop: 15,
        paddingBottom: 10
    },
    coursesContainer: {
        padding: 5,
    }
});


export default AuthorDetail;
