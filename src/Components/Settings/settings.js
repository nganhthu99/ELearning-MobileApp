import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Switch, Text, View} from "react-native";
import {ButtonGroup} from "react-native-elements";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {themes} from "../../Globals/themes";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";

const Settings = (props) => {
    const {theme, setTheme} = useContext(ThemeContext)
    const [isBlueMode, setIsBlueMode] = (theme === themes.light) ? useState(true) : useState(false);
    const [selectedLanguageIndex, setSelectedLanguageIndex] = (i18n.locale === 'vi') ? useState(0) : useState(1);

    const toggleSwitch = () => {
        setIsBlueMode(previousState => !previousState);
    }

    const updateIndex = (selectedIndex) => {
        setSelectedLanguageIndex(selectedIndex)
    }

    useEffect(() => {
        isBlueMode ? setTheme(themes.light) : setTheme(themes.dark)
    }, [isBlueMode])

    useEffect(() => {
        selectedLanguageIndex === 0 ? i18n.locale = 'vi' : i18n.locale = 'en'
    }, [selectedLanguageIndex])

    return (
        <View style={styles(theme).container}>
            <View style={{height: 80, borderBottomWidth: 0.5, borderBottomColor: theme.emphasis, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: theme.text}}>{i18n.t(strings.light_mode)}</Text>
                <Switch
                    trackColor={{ false: '#021F59', true: '#AED3F2' }}
                    thumbColor={isBlueMode ? '#0E66EE' : '#0E66EE'}
                    ios_backgroundColor={'#021F59'}
                    onValueChange={toggleSwitch}
                    value={isBlueMode}
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
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        padding: 5,
    }
});

export default Settings;
