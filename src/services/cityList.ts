import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

async function fetchJSONAsync() {
    let response = await AsyncStorage.getItem("loginToken");
    console.log("response data", response)
    return response;
}

export const cityList = async (data) => {
    const key = await fetchJSONAsync()
    const headers = { 'Content-Type': 'Application/json', 'Authorization': "Bearer " + key }
    console.log(data.stateIso,"data of city and state",data)
    return await axios.get(`${'https://api.grandealz.vytech.co'}/location/get-cities-of-states/${data.countryValue}/${data.stateIso}`, { headers: headers }).then(response => {

        console.log("City List with codes", response.data.data);

        return response.data.data
    }).catch((err) => {
        console.log("Catch error Api Failed", err)
    })
}