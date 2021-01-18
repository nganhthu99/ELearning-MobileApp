import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllStorageKeys = async () => {
    try {
        const jsonValue = await AsyncStorage.getAllKeys()
        return jsonValue != null ? jsonValue : null
    } catch(e) {
        console.log('ERROR: ', e)
        return null
    }
}

export const clearAllStorageKeys = async () => {
    try {
        await AsyncStorage.clear()
    } catch(e) {
        console.log('ERROR: ', e)
    }
}

// Token
export const getStorageToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('token')
        return jsonValue
    } catch(e) {
        console.log('ERROR: ', e)
        return null
    }
}

export const setStorageToken = async (token) => {
    try {
        await AsyncStorage.setItem('token', token)
    } catch(e) {
        console.log('ERROR: ', e)
    }
}

export const removeStorageToken = async () => {
    try {
        await AsyncStorage.removeItem('token')
    } catch(e) {
        console.log('ERROR: ', e)
    }
}

// User
export const getStorageUser = async (email) => {
    try {
        const jsonValue = await AsyncStorage.getItem(email)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
        console.log('ERROR: ', e)
        return null
    }
}

export const initializeStorageUser = async (email) => {
    const initializedData = {
        theme: "light",
        language: "vi",
        download: []
    }
    try {
        const jsonValue = JSON.stringify(initializedData)
        await AsyncStorage.setItem(email, jsonValue)
    } catch(e) {
        console.log('ERROR: ', e)
    }
}

export const setThemeStorageUser = async (email, theme) => {
    const user = getStorageUser(email)
    user.theme = theme
    try {
        const jsonValue = JSON.stringify(user)
        await AsyncStorage.setItem(email, jsonValue)
    } catch(e) {
        console.log('ERROR: ', e)
    }
}

export const setLanguageStorageUser = async (email, language) => {
    const user = getStorageUser(email)
    user.language = language
    try {
        const jsonValue = JSON.stringify(user)
        await AsyncStorage.setItem(email, jsonValue)
    } catch(e) {
        console.log('ERROR: ', e)
    }
}

export const addDownloadStorageUser = async (email, lesson) => {
    // const user = getStorageUser(email)
    // user.download.push(lesson)
    // try {
    //     const jsonValue = JSON.stringify(user)
    //     await AsyncStorage.setItem(email, jsonValue)
    // } catch(e) {
    //     console.log('ERROR: ', e)
    // }
    const user = await getStorageUser(email)
    user.download.push(lesson)
    try {
        const jsonValue = JSON.stringify(user)
        await AsyncStorage.setItem(email, jsonValue)
    } catch(e) {
        console.log('ERROR: ', e)
    }
}
