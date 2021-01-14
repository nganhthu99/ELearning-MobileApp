import axios from "axios";
import * as FileSystem from "expo-file-system";

export const imgurUploadImageService = async (image) => {
    const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
    return axios.post("https://api.imgur.com/3/upload", {
        image: base64,
        type: 'base64'
    }, {
        headers: {
            Authorization: 'Client-ID ' + '71c54a406b19b36'
        }
    })
}
