import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import SectionHeader2 from "../../Common/section-header-2";
import VerticalAuthorList from "./vertical-author-list";
import {ThemeContext} from "../../../Provider/theme-provider";

const AuthorList = (props) => {
    const {theme} = useContext(ThemeContext)

    return(
        <ScrollView style={styles(theme).container}>
            <View style={styles(theme).list}>
                <View style={styles(theme).header}>
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

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
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
