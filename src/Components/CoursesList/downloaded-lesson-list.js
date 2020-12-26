import React, {useContext, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {DownloadedCoursesContext} from "../../Core/Provider/downloaded-courses-provider";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import NoDataView from "../Common/no-data-view";

const DownloadedLessonList = (props) => {
    const {theme} = useContext(ThemeContext)
    const {downloadedCourses, setDownloadedCourses} = useContext(DownloadedCoursesContext)

    console.log("downloadedCourses", downloadedCourses)

    const handleOnClickItem = (item) => {
        props.navigation.navigate('DownloadedLessonDetail', {
            item: item
        })
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={item.id}
                              onPress={() => handleOnClickItem(item)}
                              style={{flexDirection: 'row', padding: 15, paddingBottom: 20, paddingLeft: 0}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 12, color: theme.text}}>
                        {index + 1}
                    </Text>
                </View>
                <View style={{flex: 6}}>
                    <Text style={{fontSize: 16, paddingBottom: 5 , color: theme.text}}>
                        {item.name}
                    </Text>
                    <Text style={{fontSize: 12 , color: theme.text}}>
                        {`${item.hours} hours`}
                    </Text>
                </View>
                <Text>
                    {item.videoUrl}
                </Text>
            </TouchableOpacity>
        )
    };

    if (downloadedCourses.length === 0) {
        return (
            <NoDataView message='You have no downloaded lessons.'/>
        )
    } else return(
        <FlatList
            data={downloadedCourses}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
                <View style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: theme.primary,
                }}/>
            )}
            keyExtractor={(item, index) => item.id}
            style={{padding: 5}}/>
    )
};

export default DownloadedLessonList;
