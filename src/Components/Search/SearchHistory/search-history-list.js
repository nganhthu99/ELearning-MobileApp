import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import SearchHistoryItem from "./search-history-item";
import SectionHeader from "../../Common/section-header";

const SearchHistoryList = (props) => {
    const handleDeleteAll = () => {

    }

    return (
        <ScrollView style={styles.container}>
            <View style={{padding: 5, paddingTop: 20}}>
                <SectionHeader handleOnClick={handleDeleteAll} title='Recent Searches' type='delete'/>
            </View>
            {
                props.history.map((item) => {
                    return (
                        <View
                            key={item.id}
                            style={{height: 65,padding: 5,}}>
                            <SearchHistoryItem key={item.id} item={item}/>
                        </View>
                    )
                })
            }
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    },
});

export default SearchHistoryList;
