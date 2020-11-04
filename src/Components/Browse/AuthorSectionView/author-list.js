import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import AuthorListItem from "./author-list-item";
import SectionListHeader from "../../Home/SectionView/section-list-header";

const AuthorList = (props) => {
    const renderListItems = (courses) => {
        return courses.map((item) => {
            return <AuthorListItem key={item.id} item={item}/>
        })
    }

    return (
        <View style={styles.container}>
            <SectionListHeader title={props.title}/>
            <ScrollView horizontal={true}>
                {renderListItems(props.items)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
        //backgroundColor: '#F2F2F2',

        // borderWidth: 10,
        // borderColor: '#AAAAAA',
    },
});

export default AuthorList;
