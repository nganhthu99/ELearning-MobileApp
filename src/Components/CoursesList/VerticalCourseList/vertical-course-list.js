// import React from 'react';
// import {StyleSheet, View} from "react-native";
// import VerticalCourseItem from "./vertical-course-item";
// import SectionHeader2 from "./section-header-2";
// import SectionFooter from "./section-footer";
//
// const VerticalCourseList = (props) => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <SectionHeader2 title={props.header}/>
//             </View>
//             <View>
//                 {props.courses.map((item) => {
//                     return (
//                         <View key={item.id} style={{height: 140, paddingTop: 8}}>
//                             <VerticalCourseItem key={item.id} item={item}/>
//                         </View>
//                     )
//                 })}
//             </View>
//             <SectionFooter/>
//         </View>
//     )
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     header: {
//         paddingTop: 10,
//         paddingBottom: 10
//     }
// });
//
// export default VerticalCourseList;

import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import VerticalCourseItem from "./vertical-course-item";

const VerticalCourseList = (props) => {
    const renderItem = ({ item }) => {
        return (
            <View key={item.id} style={{height: 140, paddingTop: 15}}>
                <VerticalCourseItem
                    navigation={props.navigation}
                    key={item.id}
                    item={item}/>
            </View>
        );
    };
    return(
        <View style={styles.container}>
            <FlatList data={props.items} renderItem={renderItem}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
});

export default VerticalCourseList;
