import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Icon, Input, Overlay, SearchBar} from "react-native-elements";
import SearchResultTab from "../../Navigation/Search/search-result-tab";
import {authors, courses} from "../../../Data/data";

const SearchResult = (props) => {
    const [searchInput, setSearchInput] = useState('')

    const handleOnChangeText = (text) => {
        setSearchInput(text)
    }

    const handleSearch = () => {
        props.navigation.push('SearchResult')
    }

    const [isMapVisible, setIsMapVisible] = useState(false);

    const toggleMapOverlay = () => {
        setIsMapVisible(!isMapVisible)
    }

    const mapOverlay = () => {
        return (
            <Overlay
                fullScreen
                isVisible={isMapVisible}>
                <View style={{flex: 1}}>
                    <TouchableOpacity  style={{alignSelf: 'flex-start'}} onPress={toggleMapOverlay}>
                        <Icon type='ionicons' name='close'/>
                    </TouchableOpacity>
                    <Input placeholder='Enter Address'
                           leftIcon={
                               <Icon type='font-awesome-5'
                                     name='map-marker-alt'
                                     color='#021F59'/>
                           }
                    />
                    <Image style={{flex: 1, width: '100%', resizeMode: 'cover'}} source={require('../../../../assets/map.jpg')}/>
                </View>
            </Overlay>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                <SearchBar
                    placeholder="Search"
                    inputStyle={{color: '#011534'}}
                    containerStyle={{backgroundColor: '#F2F2F2', flex: 1}}
                    inputContainerStyle={{backgroundColor: '#FFFFFF'}}
                    lightTheme={true}
                    value={searchInput}
                    onChangeText={(text)=> handleOnChangeText(text)}
                    onKeyPress={handleSearch}
                />
                <TouchableOpacity onPress={toggleMapOverlay}>
                    <Icon type='font-awesome-5' name='map-marked-alt' color='#021F59'/>
                </TouchableOpacity>

                {mapOverlay()}
            </View>
            <SearchResultTab
                authors={authors}
                courses={courses}
                navigation={props.navigation}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
});

export default SearchResult;
