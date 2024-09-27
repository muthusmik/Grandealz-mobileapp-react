import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  Toast from 'react-native-simple-toast';


export const EditAddressHandle = async (data: any) => {

    const token=await AsyncStorage.getItem('loginToken');
        const headers={'Authorization':`Bearer ${token}` }
    console.log("headers.data",data)
    return await axios.get(`${'https://api.grandealz.vytech.co'}/addresses/${data}`,{ headers:headers}).then(response => {
        console.log("Responce in delete api call",response.data.data);
         return response.data.data
    }).catch((err) => {
        console.log("catch error Api error...EDIT", err);
        Toast.show(
            'Please try again later',
            Toast.SHORT,
        );
    })
}