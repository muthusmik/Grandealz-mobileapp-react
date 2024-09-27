import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-simple-toast'
export const AddtoCartHandle = async (data) => {
    // const payload ={ "draw":data, "qty":1};
    const token=await AsyncStorage.getItem('loginToken');
        const headers={'Authorization':`Bearer ${token}`}
    // console.log("headers.data",headers,"aaaaa",payload)
    return await axios.post(`${'https://api.grandealz.vytech.co'}/cart`,data,{ headers:headers}).then(response => {
        console.log("Responce call on Add to cart",response.data);
        if(response.data.message== "Invalid Draw"){
            Toast.show(
                'Invalid Draw',
                Toast.SHORT,
            );
        }else{
         return response.data
        }
    }).catch((err) => {
        console.log("catch error Api error..", err);
        Toast.show(
            'Please try again later',
            Toast.LONG,
        );
    })
}