import React, {useContext} from 'react';
import {FlatList, View} from "react-native";
import VerticalCourseItem from "./vertical-course-item";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Core/Provider/theme-provider";

const VerticalCourseList = (props) => {
    const {theme} = useContext(ThemeContext)

    //Control
    const handleOnClick = (item) => {
        props.navigation.navigate(ScreenName.CourseDetail, {
            itemId: item.id
        })
    }

    const renderItem = ({ item }) => {
        return (
            <VerticalCourseItem
                handleOnClick={handleOnClick}
                key={item.id}
                item={item}/>
        );
    };

    return(
        <FlatList
            data={props.items}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <View style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: theme.primary,
              }}/>
            )}
            style={{padding: 5}}/>
    )
};

export default VerticalCourseList;
