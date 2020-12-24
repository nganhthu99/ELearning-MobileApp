import React, {useContext, useState} from 'react';
import {TouchableOpacity, View} from "react-native";
import {Icon, Overlay, SearchBar} from "react-native-elements";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {SearchHistoryContext} from "../../Core/Provider/search-history-provider";
import {SearchInputContext} from "../../Core/Provider/search-input-provider";
import {ScreenName} from "../../Globals/constants";
import {searchService} from "../../Core/Service/course-service";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";

const SearchBarSection = (props) => {
    const [isMapVisible, setIsMapVisible] = useState(false);
    const {theme} = useContext(ThemeContext)
    const {searchInput, setSearchInput} = useContext(SearchInputContext)
    const {setSearchHistory} = useContext(SearchHistoryContext)

    const handleOnChangeText = (text) => {
        setSearchInput(text)
    }

    const handleSubmit = () => {
        if (searchInput) {
            setSearchHistory(preHistory => [...preHistory, {
                id: searchInput,
                content: searchInput
            }])
            searchService(searchInput)
                .then((response) => {
                    props.navigation.push(ScreenName.SearchResult, {
                        courses: response.data.payload.courses,
                        authors: response.data.payload.instructors
                    })
                })
        }
    }

    const toggleMapOverlay = () => {
        setIsMapVisible(!isMapVisible)
    }

    const mapOverlay = () => {
        return (
            <Overlay
                fullScreen
                isVisible={isMapVisible}>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={{alignSelf: 'flex-start', paddingTop: 15}}
                                      onPress={toggleMapOverlay}>
                        <Icon type='ionicons'
                              name='close'
                              color={theme.emphasis}/>
                    </TouchableOpacity>
                    {/*<Input placeholder='Enter Address'*/}
                    {/*       leftIcon={*/}
                    {/*           <Icon type='font-awesome-5'*/}
                    {/*                 name='map-marker-alt'*/}
                    {/*                 color={theme.emphasis}/>*/}
                    {/*       }*/}
                    {/*/>*/}
                    {/*<Image style={{flex: 1, width: '100%', resizeMode: 'cover'}} source={require('../../../assets/map.jpg')}/>*/}
                </View>
            </Overlay>
        )
    }

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 5, paddingTop: 25, backgroundColor: theme.secondary}}>
            <SearchBar
                placeholder={i18n.t(strings.search)}
                inputStyle={{color: '#011534', fontSize: 15}}
                containerStyle={{flex: 1, height: 40, padding: 0, marginRight: 5}}
                inputContainerStyle={{height: 40, backgroundColor: theme.background}}
                lightTheme={true}
                value={searchInput}
                onChangeText={(text)=> handleOnChangeText(text)}
                onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity onPress={toggleMapOverlay}>
                <Icon type='font-awesome-5'
                      name='globe-asia'
                      color={theme.emphasis}/>
            </TouchableOpacity>
            {mapOverlay()}
        </View>
    )
};

export default SearchBarSection;
