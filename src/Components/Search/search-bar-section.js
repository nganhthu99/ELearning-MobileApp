import React, {useContext, useState} from 'react';
import {Image, TouchableOpacity, View} from "react-native";
import {Icon, Input, Overlay, SearchBar} from "react-native-elements";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";

const SearchBarSection = (props) => {
    const [isMapVisible, setIsMapVisible] = useState(false);
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    const handleOnChangeText = (text) => {
        props.handleOnChangeText(text)
    }

    const handleOnFocus = () => {
        props.handleOnFocus()
    }

    const handleOnBlur = () => {
        props.handleOnBlur()
    }

    const handleSubmit = () => {
        props.handleSubmit()
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
                    <TouchableOpacity  style={{alignSelf: 'flex-start'}} onPress={toggleMapOverlay}>
                        <Icon type='ionicons' name='close'/>
                    </TouchableOpacity>
                    <Input placeholder='Enter Address'
                           leftIcon={
                               <Icon type='font-awesome-5'
                                     name='map-marker-alt'
                                     color={theme.primaryEmphasis}/>
                           }
                    />
                    <Image style={{flex: 1, width: '100%', resizeMode: 'cover'}} source={require('../../../assets/map.jpg')}/>
                </View>
            </Overlay>
        )
    }

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 5, paddingTop: 20}}>
            <SearchBar
                placeholder={language.search}
                inputStyle={{color: '#011534'}}
                containerStyle={{flex: 1, backgroundColor: theme.background}}
                inputContainerStyle={{backgroundColor: '#FFFFFF'}}
                lightTheme={true}
                value={props.searchInput}
                onChangeText={(text)=> handleOnChangeText(text)}
                onSubmitEditing={handleSubmit}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
            />
            <TouchableOpacity onPress={toggleMapOverlay}>
                <Icon type='font-awesome-5' name='map-marked-alt' color={theme.primaryEmphasis}/>
            </TouchableOpacity>
            {mapOverlay()}
        </View>
    )
};

export default SearchBarSection;
