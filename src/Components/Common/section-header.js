import React, {useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Button, Icon} from "react-native-elements";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {LanguageContext} from "../../Core/Provider/language-provider";

const SectionHeader = (props) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    const handleOnClick = () => {
        props.handleOnClick()
    }

    return(
        <View style={styles(theme).container}>
            <Text style={styles(theme).text}>{props.title}</Text>
            <Button
                onPress={handleOnClick}
                titleStyle={{fontSize: 12, paddingRight: 3, color: theme.primary}}
                buttonStyle={{borderColor: theme.primary}}
                type="clear"
                icon={props.type==='delete' ?
                    <Icon type='octicon'
                          name='trashcan'
                          color={theme.primary}
                          size={20}/> :
                    <Icon type='font-awesome'
                          name='angle-double-right'
                          color={theme.primary}
                          size={20}/>
                }
                iconRight
                title={props.type==='delete' ? language.delete_all : language.see_all}/>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
    },
    text: {
        color: theme.header,
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default SectionHeader;
