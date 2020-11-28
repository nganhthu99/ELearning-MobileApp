import React from 'react';
import {Linking, Modal, StyleSheet, View, Alert} from "react-native";
import CourseDetailTab from "../Navigation/CourseDetail/course-detail-tab";
import {Button} from "react-native-elements";

const CourseDetail = (props) => {
    return(
        <View style={styles.container}>
            <View style={{borderWidth: 2, borderColor: '#000000', height: 220, alignItems: 'center', justifyContent: 'center'}}>
                <Button
                    onPress={() => {
                        Linking
                            .openURL(props.route.params.item.youtube)
                    }}
                    type="clear"
                    title='Youtube Video'/>
            </View>
            <CourseDetailTab
                navigation={props.navigation}
                item={props.route.params.item}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
});

export default CourseDetail;
