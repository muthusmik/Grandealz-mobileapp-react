import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

async function fetchJSONAsync() {
    let response = await AsyncStorage.getItem("Signuptoken");
    return response;
}

export const changeNumber = async (Data) => {
    const payload = Data
    const key = await fetchJSONAsync()
    const headers = { 'Authorization': `Bearer ${key}` }
    console.log(payload, "datataatataaa", headers)
    return await axios.post(`https://api.grandealz.vytech.co/auth/change-mobile-number`, payload, { headers: headers }).then
        (response => {
            return response.data
        }).catch((err) => {
            console.log("Catch error Api Failed", err)
        })
}

export const resendNum = async () => {
    const payload={}
    const key = await fetchJSONAsync()
    const headers = { 'Authorization': `Bearer ${key}` }
    console.log(headers,"headerssssss");
    return await axios.post(`https://api.grandealz.vytech.co/auth/resend-otp`,payload,{ headers: headers }).then
        (response => {
            console.log("response ",response.data);
            return response .data           
        }).catch((err) => {
            console.log("Catch error Api Failed", err)
        })
}