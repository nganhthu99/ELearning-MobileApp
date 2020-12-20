import React, {useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Button, Icon} from "react-native-elements";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";
import buttonLikeRoles from "react-native-web/dist/modules/AccessibilityUtil/buttonLikeRoles";

const SectionHeader = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleOnClick = () => {
        props.handleOnClick()
    }

    return(
        <View style={styles(theme).container}>
            <Text style={styles(theme).titleStyle}>{props.title}</Text>
            <Button
                type="clear"
                title={props.type==='delete' ? i18n.t(strings.delete_all) : i18n.t(strings.see_all)}
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
                titleStyle={styles(theme).buttonTitleStyle}
                onPress={handleOnClick}/>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        paddingRight: 0
    },
    titleStyle: {
        color: theme.header,
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonTitleStyle: {
        fontSize: 12,
        paddingRight: 3,
        color: theme.primary
    }
});

export default SectionHeader;
