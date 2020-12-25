import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from "expo-file-system";

export const getAllStorageKeys = () => {
    return AsyncStorage.getAllKeys()
}

export const clearAllStorage = () => {
    return AsyncStorage.clear()
}

export const getStorageToken = () => {
    return AsyncStorage.getItem('token')
}

export const setStorageToken = (token) => {
    return AsyncStorage.setItem('token', token)
}

export const getStorageTheme = () => {
    return AsyncStorage.getItem('theme')
}

export const setStorageTheme = (theme) => {
    return AsyncStorage.setItem('theme', theme)
}

export const getStorageSearchHistory = () => {
    return AsyncStorage.getItem('search_history')
}

export const setStorageSearchHistory = (search) => {
    getStorageSearchHistory()
        .then((value) => {
            return AsyncStorage.setItem('search_history', [...value, search])
        })
    // return AsyncStorage.setItem(prevHis => [...prevHis, search])
}

export const getStorageDownloadedVideo = () => {
    return AsyncStorage.getItem('downloaded_video')
}

export const setStorageDownloadedVideo = async (lesson) => {
    // return AsyncStorage.setItem(video => [...prevHis, search])
    // getStorageDownloadedVideo()
    //     .then((value) => {
    //         if (!value) {
    //             return AsyncStorage.setItem('downloaded_video', [])
    //         } else {
    //             return AsyncStorage.setItem('downloaded_video', value.concat(video))
    //         }
    //     })
    const value = await getStorageDownloadedVideo()
    return (value) ?
        AsyncStorage.setItem('downloaded_video', JSON.stringify(JSON.parse(value).concat(lesson))) :
        AsyncStorage.setItem('downloaded_video', JSON.stringify([]))
}
