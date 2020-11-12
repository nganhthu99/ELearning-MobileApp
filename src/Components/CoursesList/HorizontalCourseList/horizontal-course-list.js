import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import HorizontalCourseItem from "./horizontal-course-item";

const HorizontalCourseList = (props) => {
    const renderItem = ({ item }) => {
        return (
            <View key={item.id} style={{
                height: 230, width: 250,
                padding: 5,
                borderRightWidth: 2, borderRightColor: '#A9CCE3',}}>
                <HorizontalCourseItem
                    navigation={props.navigation}
                    key={item.id}
                    item={item}/>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            {/*<ScrollView horizontal={true}>*/}
            {/*    {*/}
            {/*        props.items.map((item) => {*/}
            {/*            return (*/}
            {/*                <View key={item.id} style={{*/}
            {/*                    height: 230, width: 250,*/}
            {/*                    padding: 5,*/}
            {/*                    borderRightWidth: 2, borderRightColor: '#A9CCE3',}}>*/}
            {/*                    <HorizontalCourseItem*/}
            {/*                        navigation={props.navigation}*/}
            {/*                        key={item.id}*/}
            {/*                        item={item}/>*/}
            {/*                </View>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</ScrollView>*/}
            <FlatList horizontal={true} data={props.items} renderItem={renderItem}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    },
});


export default HorizontalCourseList;
