import React, {useContext, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from "react-native";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import {ScreenName} from "../../../Globals/constants";
import VerticalAuthorListItem from "./vertical-author-list-item";
import {getListInstructorsService} from "../../../Core/Service/instructor-service";
import NoDataView from "../../Common/no-data-view";
import i18n from 'i18n-js';
import {strings} from "../../../Globals/Localization/string";

const AuthorList = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const [authors, setAuthors] = useState(props.route.params.items)
    const [isRefreshing, setIsRefreshing] = useState(false)

    // Control
    const handleOnRefresh = () => {
        setIsRefreshing(true)
        getListInstructorsService()
            .then((response) => {
                if (response.status === 200) {
                    // setAuthors(response.data.payload)
                }
            })
            .finally(() => {
                setIsRefreshing(false)
            })
    }

    const handleOnClick = (item) => {
        props.navigation.navigate(ScreenName.AuthorDetail, {
            itemId: item.id
        })
    }

    const renderItem = ({ item }) => {
        return (
            <VerticalAuthorListItem
                handleOnClick={handleOnClick}
                item={item}/>
        );
    };

    if(authors.length === 0) {
        return (
            <NoDataView message={i18n.t(strings.no_data_view_no_author)}/>
        )
    }
    return(
        <FlatList data={authors}
                  renderItem={renderItem}
                  ItemSeparatorComponent={() => (
                      <View style={{
                          height: 1,
                          width: '100%',
                          backgroundColor: theme.primary,
                      }}/>
                  )}
                  refreshControl={
                      <RefreshControl refreshing={isRefreshing}
                                      onRefresh={handleOnRefresh}/>
                  }
                  style={{
                      backgroundColor: theme.background,
                      padding: 5,
                  }}/>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
});

export default AuthorList;
