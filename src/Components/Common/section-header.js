import React, {useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Button, Icon} from "react-native-elements";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";

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
                titleStyle={{fontSize: 12, paddingRight: 3, color: theme.primaryButton}}
                buttonStyle={{borderColor: theme.primaryButton}}
                type="clear"
                icon={props.type==='delete' ?
                    <Icon type='octicon'
                          name='trashcan'
                          color={theme.primaryEmphasis}
                          size={20}/> :
                    <Icon type='font-awesome'
                          name='angle-double-right'
                          color={theme.primaryEmphasis}
                          size={20}/>
                }
                iconRight
                title={props.type==='delete' ? language.deleteAll : language.seeAll}/>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: theme.header,
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default SectionHeader;
