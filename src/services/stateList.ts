import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

async function fetchJSONAsync() {
    let response = await AsyncStorage.getItem("loginToken");
    console.log("response data", response)
    return response;
}

export const stateList = async (data) => {
    const key = await fetchJSONAsync()
    const headers = { 'Content-Type': 'Application/json', 'Authorization': "Bearer " + key }
    console.log(data,"........................................");
    
    return await axios.get(`${'https://api.grandealz.vytech.co'}/location/get-states-of-country/${data}`, { headers: headers }).then(response => {

        // console.log("Country List with codes", response.data.data);

        return response.data.data
    }).catch((err) => {
        console.log("Catch error Api Failed", err)
    })
}