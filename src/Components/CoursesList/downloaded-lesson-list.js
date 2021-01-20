import React, {useContext} from 'react';
import {Animated, FlatList, Text, TouchableOpacity, View} from "react-native";
import {DownloadedCoursesContext} from "../../Core/Provider/downloaded-courses-provider";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import NoDataView from "../Common/no-data-view";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {Icon} from "react-native-elements";
import {deleteDownloadStorageUser} from "../../Core/Service/storage-service";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import * as FileSystem from "expo-file-system";
import {ScreenName} from "../../Globals/constants";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";

const DownloadedLessonList = (props) => {
    const {theme} = useContext(ThemeContext)
    const {downloadedCourses, setDownloadedCourses} = useContext(DownloadedCoursesContext)
    const authenticationContext = useContext(AuthenticationContext)

    const handleOnClickItem = (item) => {
        props.navigation.navigate(ScreenName.DownloadedLessonDetail, {
            item: item
        })
    }

    const handleOnDelete = (item) => {
        FileSystem.deleteAsync(FileSystem.documentDirectory + item.id + ".mp4")
            .then(result => {
                console.log('DELETE FILE: ', result)
                deleteDownloadStorageUser(authenticationContext.state.userInfo.email, item)
                    .then(() => {
                        setDownloadedCourses(prev => prev.filter(returnItem => returnItem.id !== item.id))
                    })
            })
            .catch((error) => {
                console.log('DELETE FILE error: ', error)
            })
    }

    const renderItem = ({ item, index }) => {
        const renderLeftActions = (progress, dragX, onPress) => {
            const trans = dragX.interpolate({
                inputRange: [0, 50, 100, 101],
                outputRange: [-20, 0, 0, 1],
            });
            return (
                <Animated.View style={{transform: [{translateX: trans}]}}>
                    <TouchableOpacity
                        onPress={onPress}
                        style={{width: 100, height: '100%', backgroundColor: theme.listDivider, justifyContent:'center', alignItems: 'center'}}>
                        <Text style={{color: '#A62103', paddingBottom: 10, fontSize: 12}}>DELETE</Text>
                        <Icon name='trash' type='font-awesome-5' color='#A62103' size={25}/>
                    </TouchableOpacity>
                </Animated.View>
            );
        };
        return (
            <Swipeable
                key={item.id}
                renderLeftActions={(progress, dragX) =>
                    renderLeftActions(progress, dragX, () => {
                        handleOnDelete(item)
                    })
                }>
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
            </Swipeable>
        )
    };

    if (downloadedCourses.length === 0) {
        return (
            <View style={{flex: 1, backgroundColor: theme.background}}>
                <NoDataView message={i18n.t(strings.no_data_view_no_download)}/>
            </View>
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
            style={{backgroundColor: theme.background, padding: 5}}/>
    )
};

export default DownloadedLessonList;
