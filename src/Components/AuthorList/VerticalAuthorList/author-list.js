import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import SectionHeader2 from "../../Common/section-header-2";
import VerticalAuthorList from "./vertical-author-list";

const AuthorList = (props) => {
    return(
        <ScrollView style={styles.container}>
            <View style={styles.list}>
                <View style={styles.header}>
                    <SectionHeader2 title={props.route.params.header}/>
                </View>
                <VerticalAuthorList
                    // navigation={props.route.params.navigation}
                    navigation={props.navigation}
                    items={props.route.params.items}/>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    },
    list: {
        padding: 5
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10
    }
});


export default AuthorList;
