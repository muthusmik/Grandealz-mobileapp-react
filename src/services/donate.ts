import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DonateHandle = async (donateid: string,toggle:boolean) => {

    const payload = { "is_donate":toggle}
    console.log("Re",toggle);
    const token = await AsyncStorage.getItem('loginToken');
    const headers = { 'Authorization': `Bearer ${token}`,"Content-Type":"application/json" }
    return await axios.put(`${'https://api.grandealz.vytech.co'}/cart/donate-toggle/${donateid}`,payload,{headers:headers}).then(response => {
        console.log("Respon...ggg",response.data);
        return response.data
    }).catch((err) => {
        console.log("catch error Api error... don..", err);
    })
}