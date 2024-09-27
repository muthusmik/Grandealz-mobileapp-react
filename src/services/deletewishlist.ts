import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-simple-toast';


export const RemovewishlistHandle = async (data: undefined) => {

    const token=await AsyncStorage.getItem('loginToken');
        const headers={'Authorization':`Bearer ${token}` }
    console.log("headers.data",data)
    return await axios.delete(`${'https://api.grandealz.vytech.co'}/wish-list/${data}`,{ headers:headers}).then(response => {
        console.log("Responce in delete api call",response.data);
         return response.data
    }).catch((err) => {
        console.log("catch error Api error.. wishli..", err);
        Toast.show(
            'Please try again later',
            Toast.SHORT,
        );
    })
}