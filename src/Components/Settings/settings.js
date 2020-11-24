import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {ButtonGroup, Icon} from "react-native-elements";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";
import {themes} from "../../Globals/themes";
import {languages} from "../../Globals/languages";

const Settings = (props) => {
    const {theme, setTheme} = useContext(ThemeContext)
    const {language, setLanguage} = useContext(LanguageContext)

    const [isBlueMode, setIsBlueMode] = (theme === themes.light) ? useState(true) : useState(false);
    const [selectedLanguageIndex, setSelectedLanguageIndex] = (language === language.english) ? useState(1) : useState(2);

    const toggleSwitch = () => {
        setIsBlueMode(previousState => !previousState);
    }

    const updateIndex = (selectedIndex) => {
        setSelectedLanguageIndex(selectedIndex)
    }

    useEffect(() => {
        if (isBlueMode) {
            setTheme(themes.light)
        } else {
            setTheme(themes.dark)
        }
    }, [isBlueMode])

    useEffect(() => {
        if (selectedLanguageIndex === 0) {
            setLanguage(languages.vietnamese)
        } else {
            setLanguage(languages.english)
        }
    }, [selectedLanguageIndex])

    return (
        <View style={styles(theme).container}>
            <View style={{height: 80, borderBottomWidth: 0.5, borderBottomColor: theme.primaryEmphasis, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: theme.normalText}}>{language.blueMode}</Text>
                <Switch
                    trackColor={{ false: '#021F59', true: '#AED3F2' }}
                    thumbColor={isBlueMode ? '#0E66EE' : '#0E66EE'}
                    ios_backgroundColor={'#021F59'}
                    onValueChange={toggleSwitch}
                    value={isBlueMode}
                />
            </View>
            <View style={{height: 80, borderBottomWidth: 0.5, borderBottomColor: theme.primaryEmphasis, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: theme.normalText}}>{language.language}</Text>
                <ButtonGroup
                    onPress={updateIndex}
                    selectedIndex={selectedLanguageIndex}
                    containerStyle={{width: 220}}
                    buttonStyle={{borderWidth: 2, borderColor: theme.primaryButton}}
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
