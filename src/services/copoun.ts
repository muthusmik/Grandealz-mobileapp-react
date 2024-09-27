import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

async function fetchJSONAsync() {
    let response = await AsyncStorage.getItem("loginToken");
    console.log("response data", response)
    return response;
}

export const couponPage = async () => {
    const key = await fetchJSONAsync()
    const headers = { 'Content-Type': 'Application/json', 'Authorization': "Bearer " + key }

    return await axios.get(`https://api.grandealz.vytech.co/coupon`, { headers: headers }).then(response => {
        console.log("Response coupon", response.data.data);
        return response.data.data
    }).catch((err) => {
        console.log("Catch error Api Failed", err)
    })
}

export const removeCoup = async () => {
    const key = await fetchJSONAsync()
    const headers = { 'Content-Type': 'Application/json', 'accept': '*/*','Authorization': "Bearer " + key }

    return await axios.put(`${'https://api.grandealz.vytech.co'}/cart/remove-coupon`,{},{ headers: headers }).then(response => {
        console.log("Response coupon", response.data);
        return response.data
    }).catch((err) => {
        console.log("Catch error Api Failed", err)
    })
}
