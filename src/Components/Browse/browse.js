import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import SectionList from "../Home/SectionView/section-list";
import ImageButton from "../Common/image-button";
import AuthorList from "./AuthorSectionView/author-list";
import CategoryList from "./CategorySectionView/category-list";

const Browse = (props) => {
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

    const authors = [
        {
            id: 1,
            name: 'Huy Nguyen',
        },
        {
            id: 2,
            name: 'Hai Pham',
        },
        {
            id: 3,
            name: 'Hai Pham',
        },
    ]

    const categories=[
        {
            id: 1,
            title: 'REACT NATIVE',
        },
        {
            id: 2,
            title: 'REACT',
        },
        {
            id: 3,
            title: 'JAVA',
        },
        {
            id: 4,
            title: 'C/C++',
        },
        {
            id: 5,
            title: 'ALGORITHM',
        },
        {
            id: 6,
            title: 'DATA STRUCTURE',
        },
        {
            id: 7,
            title: 'LOGICAL THINKING',
        },
        {
            id: 8,
            title: 'OPERATING SYSTEM',
        },
    ]

    const skills=[
        {
            id: 1,
            title: 'REACT NATIVE',
        },
        {
            id: 2,
            title: 'REACT',
        },
        {
            id: 3,
            title: 'JAVA',
        },
        {
            id: 4,
            title: 'C/C++',
        },
        {
            id: 5,
            title: 'ALGORITHM',
        },
        {
            id: 6,
            title: 'DATA STRUCTURE',
        },
        {
            id: 7,
            title: 'LOGICAL THINKING',
        },
        {
            id: 8,
            title: 'OPERATING SYSTEM',
        },
    ]

    return (
        <ScrollView style={styles.container}>
            <View style={styles.buttonsContainer}>
                <ImageButton title='RECOMMENDED FOR YOU' image={require('../../../assets/background_1.jpg')}/>
                <ImageButton title='NEW RELEASE' image={require('../../../assets/background_2.jpg')}/>
            </View>
            <SectionList items={courses} title='Top Courses' type='courses'/>
            <AuthorList items={authors} title='Top Authors'/>
            <CategoryList items={categories} title='Hot Topics'/>
            <CategoryList items={categories} title='Skills'/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    buttonsContainer: {
        flex: 2,
        margin: 5,
        marginTop: 20
    }
});

export default Browse;
