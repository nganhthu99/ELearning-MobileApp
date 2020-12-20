import AsyncStorage from '@react-native-async-storage/async-storage';

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
    return AsyncStorage.getItem('@search_history')
}

export const setStorageSearchHistory = (search) => {
    // getStorageSearchHistory()
    //     .then((value) => {
    //         return AsyncStorage.setItem('search_history', [...value, search])
    //     })
    return AsyncStorage.setItem(prevHis => [...prevHis, search])
}
