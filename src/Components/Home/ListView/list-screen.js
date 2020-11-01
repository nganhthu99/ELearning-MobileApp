import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import List from "./list";

const ListScreen = (props) => {
    const courses = [
        {
            id: 1,
            title: 'React Native',
            author: 'Hai Pham',
            level: 'Advanced',
            release: 'Sep 25, 2020',
            duration: '38 hours'
        },
        {
            id: 2,
            title: 'React',
            author: 'Huy Nguyen',
            level: 'Advanced',
            release: 'Oct 16, 2020',
            duration: '50 hours'
        },
        {
            id: 3,
            title: 'Design Pattern',
            author: 'Huy Nguyen',
            level: 'Advanced',
            release: 'Oct 1, 2020',
            duration: '33 hours'
        }
    ]

    const channels = [
        {
            id: 1,
            name: 'React Native',
            amount: 3,
        },
        {
            id: 2,
            name: 'React',
            amount: 2,
        },
        {
            id: 3,
            name: 'Java Programming',
            amount: 6,
        }
    ]

    return (
        <View style={styles.container}>
            <List items={courses} type='courses' title='My Favorites'/>
            {/*<SectionList items={channels} title='My Channel' type='channels'/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        paddingTop: 20
    },
});

export default ListScreen;
