import React from 'react';
import AuthorListItem from "../AuthorSectionView/author-list-item";
import {ScrollView, StyleSheet, View} from "react-native";
import SectionListHeader from "../../Home/SectionView/section-list-header";
import ImageButton from "../../Common/image-button";

const CategoryList = (props) => {
    const renderListItems = (courses) => {
        return courses.map((item) => {
            return (
                <View style={{height: 150, width: 200, margin: 5}}>
                    <ImageButton key={item.id} title={item.title} image={require('../../../../assets/icon-logo.png')}/>
                </View>
            )
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


export default CategoryList;
