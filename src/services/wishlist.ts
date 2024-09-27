import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const wishlistHandle = async () => {
    const token=await AsyncStorage.getItem('loginToken');
        const headers={'Authorization':`Bearer ${token}` }
    console.log("headers.data",headers)
    return await axios.get(`${'https://api.grandealz.vytech.co'}/wish-list?limit=200&skip=0`,{ headers:headers}).then(response => {
        console.log("Responce in active ticket call",response.data.data);
         return response.data.data
    }).catch((err) => {
        console.log("catch error Api error ... wishli", err);
    })

}



export const addToWishlistHandle = async (data:string) => {
    const token=await AsyncStorage.getItem('loginToken');
        const headers={'Authorization':`Bearer ${token}` }
        const payload={"draw":data};
    console.log("headers.data",headers)
    return await axios.post(`https://api.grandealz.vytech.co/wish-list`,payload,{headers:headers}).then(response => {
        console.log("Responce in active ticket call",response);
         return response
    }).catch((err) => {
        console.log("catch error Api error... addwishli", err);
    })

}