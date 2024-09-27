import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function fetchJSONAsync() {
    let response = await AsyncStorage.getItem("loginToken");
    console.log("response data", response)
    return response;
}

export const orderlistHandle = async () => {

    const token = await AsyncStorage.getItem('loginToken');
    const headers = { 'Authorization': `Bearer ${token}` }
    console.log("headers.data", headers)
    return await axios.get(`${'https://api.grandealz.vytech.co'}/orders?limit=20&skip=0`, { headers: headers }).then(response => {
        console.log("Responce in orderlist call", response.data.message);
        return response.data

    }).catch((err) => {
        console.log("catch error order Api error", err);
    })
}

export const orderlistHandlefilter = async (data:any) => {
    const value=data;
    const token = await AsyncStorage.getItem('loginToken');
    const headers = { 'Authorization': `Bearer ${token}` }
    console.log("headers.data", headers)
    return await axios.get(`${'https://api.grandealz.vytech.co'}/orders?limit=20&skip=0&search=${value}`, { headers: headers }).then(response => {
        console.log("Responce in orderlist call", response.data);
        return response.data

    }).catch((err) => {
        console.log("catch error order Api error", err);
    })
}


//null and same date
//!null and same date
//null and diff date
export const orderFilterHandle = async (data, time) => {
    const token = await AsyncStorage.getItem('loginToken');
    const headers = { 'Authorization': `Bearer ${token}` }
    console.log(data.value, "headers.data", time.end, "start", time.start)
    if (data.value === null) {
        if (time.start === time.end) {
            console.log("if part")
            return await axios.get(`${'https://api.grandealz.vytech.co'}/orders?limit=20&skip=0`, { headers: headers }).then(response => {
                console.log("Responce in orderlist call", response.data.status);
                return response.data
            }).catch((err) => {
                console.log("catch error order Api error", err);
            })
        }
        else {
            console.log("else part")
            return await axios.get(`${'https://api.grandealz.vytech.co'}/orders?limit=20&skip=0&start_date=${time.end}&end_date=${time.start}`, { headers: headers }).then(response => {
                console.log("Responce in orderlist call", response.data.status);
                return response.data
            }).catch((err) => {
                console.log("catch error order Api error", err);
            })
        }
    }
    else if (data.value) {
        if (time.start === time.end) {
            return await axios.get(`${'https://api.grandealz.vytech.co'}/orders?limit=20&skip=0&status=${data.value}`, { headers: headers }).then(response => {
                console.log("Responce in orderlist call", response.data.status);
                return response.data
            }).catch((err) => {
                console.log("catch error order Api error", err);
            })
        }
        else {
            return await axios.get(`${'https://api.grandealz.vytech.co'}/orders?limit=20&skip=0&status=${data.value}&start_date=${time.start}&end_date=${time.end}`, { headers: headers }).then(response => {
                console.log("Responce in orderlist call", response.data.status);
                return response.data
            }).catch((err) => {
                console.log("catch error order Api error", err);
            })
        }
    }
}