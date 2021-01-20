import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Share, StyleSheet, Switch, Text, View} from "react-native";
import {Button, ButtonGroup} from "react-native-elements";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {themes} from "../../Globals/themes";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";
import { StatusBar } from 'react-native';
const Settings = () => {
    const {theme, setTheme} = useContext(ThemeContext)
    const [isLightMode, setIsLightMode] = (theme === themes.light) ? useState(true) : useState(false);
    const [selectedLanguageIndex, setSelectedLanguageIndex] = (i18n.locale.toString().includes("vi")) ? useState(0) : useState(1);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    console.log('LOCALE: ', i18n.locale)

    const toggleSwitch = () => {
        setIsLightMode(previousState => !previousState);
    }

    const updateIndex = (selectedIndex) => {
        setSelectedLanguageIndex(selectedIndex)
    }

    useEffect(() => {
        isLightMode ? setTheme(themes.light) : setTheme(themes.dark)
        if (!isLightMode) StatusBar.setBarStyle('light-content', true)
        else StatusBar.setBarStyle('default', true)
    }, [isLightMode])

    useEffect(() => {
        selectedLanguageIndex === 0 ? i18n.locale = 'vi' : i18n.locale = 'en'
        forceUpdate()
    }, [selectedLanguageIndex])

    const handleShareApplication = () => {
        Share.share({
            message: 'http://dev.letstudy.org/'
        });
    }

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
                    buttons={[i18n.t(strings.vietnamese), i18n.t(strings.english)]}
                />
            </View>
            <View style={{height: 130, borderBottomWidth: 0.5, borderBottomColor: theme.emphasis, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{fontSize: 18, color: theme.header, marginBottom: 10}}>{i18n.t(strings.about_us)}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{color: theme.text, marginBottom: 3}}>{i18n.t(strings.developer)}</Text>
                    <Text style={{color: theme.text, marginBottom: 5}}>Thu Anh Nguyen - 1712177</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{color: theme.text, marginBottom: 10}}>{i18n.t(strings.mentor)}</Text>
                    <Text style={{color: theme.text, marginBottom: 5}}>Hai Hoang Pham</Text>
                </View>
            </View>
            <View style={{height: 80, borderBottomWidth: 0.5, borderBottomColor: theme.emphasis, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: theme.header, marginBottom: 10}}>{i18n.t(strings.contact)}</Text>
                <Text style={{color: theme.text, marginBottom: 5, textDecorationLine: 'underline'}}>nganhthu99@gmail.com</Text>
            </View>
            <View style={{height: 80, borderBottomWidth: 0.5, borderBottomColor: theme.emphasis, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: theme.header}}>{i18n.t(strings.app_version)}</Text>
                <Text style={{color: theme.text}}>1.0</Text>
            </View>
            <View style={{height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: theme.header}}>{i18n.t(strings.release)}</Text>
                <Text style={{color: theme.text}}>01/21/2021</Text>
            </View>
            <Button
                onPress={handleShareApplication}
                type="outline"
                buttonStyle={{borderColor: theme.primary}}
                containerStyle={{padding: 40, paddingTop: 20, paddingBottom: 20}}
                titleStyle={{color: theme.primary}}
                title={i18n.t(strings.share_app)}/>
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
