import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {ButtonGroup} from "react-native-elements";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {themes} from "../../Globals/themes";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";

const Settings = (props) => {
    const {theme, setTheme} = useContext(ThemeContext)
    const [isLightMode, setIsLightMode] = (theme === themes.light) ? useState(true) : useState(false);
    const [selectedLanguageIndex, setSelectedLanguageIndex] = (i18n.locale === 'vi') ? useState(0) : useState(1);

    console.log('SETTINGS SCREEN: ', i18n.locale)

    const toggleSwitch = () => {
        setIsLightMode(previousState => !previousState);
    }

    const updateIndex = (selectedIndex) => {
        setSelectedLanguageIndex(selectedIndex)
    }

    useEffect(() => {
        isLightMode ? setTheme(themes.light) : setTheme(themes.dark)
    }, [isLightMode])

    useEffect(() => {
        selectedLanguageIndex === 0 ? i18n.locale = 'vi' : i18n.locale = 'en'
    }, [selectedLanguageIndex])

    return (
        <ScrollView style={styles(theme).container}>
            <View style={{height: 80, borderBottomWidth: 0.5, borderBottomColor: theme.emphasis, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: theme.text}}>{i18n.t(strings.light_mode)}</Text>
                <Switch
                    trackColor={{ false: '#021F59', true: '#AED3F2' }}
                    thumbColor={isLightMode ? '#0E66EE' : '#0E66EE'}
                    ios_backgroundColor={'#021F59'}
                    onValueChange={toggleSwitch}
                    value={isLightMode}
                />
            </View>
            <View style={{height: 80, borderBottomWidth: 0.5, borderBottomColor: theme.emphasis, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: theme.text}}>{i18n.t(strings.language)}</Text>
                <ButtonGroup
                    onPress={updateIndex}
                    selectedIndex={selectedLanguageIndex}
                    containerStyle={{width: 220}}
                    buttonStyle={{borderWidth: 2, borderColor: theme.primary}}
                    textStyle={{color: theme.primary}}
                    buttons={['Vietnamese', 'English']}
                />
            </View>
            <View style={{height: 130, borderBottomWidth: 0.5, borderBottomColor: theme.emphasis, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{fontSize: 18, color: theme.header, marginBottom: 10}}>About us</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{color: theme.text, marginBottom: 3}}>Author</Text>
                    <Text style={{marginBottom: 5}}>Thu Anh Nguyen - 1712177</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{color: theme.text, marginBottom: 10}}>Instructor</Text>
                    <Text style={{marginBottom: 5}}>Hai Hoang Pham</Text>
                </View>
            </View>
            <View style={{height: 80, borderBottomWidth: 0.5, borderBottomColor: theme.emphasis, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: theme.header, marginBottom: 10}}>Contact</Text>
                <Text style={{marginBottom: 5}}>nganhthu99@gmail.com</Text>
            </View>
            <View style={{height: 80, borderBottomWidth: 0.5, borderBottomColor: theme.emphasis, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: theme.header}}>App version</Text>
                <Text>1.0</Text>
            </View>
            <View style={{height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: theme.header}}>Release</Text>
                <Text>01/21/2021</Text>
            </View>
        </ScrollView>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        paddingLeft: 5,
        paddingRight: 5
    }
});

export default Settings;
