import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Register_Url } from "./constant";
import { Login_Url } from "./constant";
async function fetchJSONAsync() {
    let response = await AsyncStorage.getItem("loginToken");
    console.log("response data", response)
    return response;
}

export const registerPost = async () => {
    const payload = { "email": "cheranc7c7@gmail.com", "password": "Cheran@123" };
    const headers = { 'Content-Type': 'application/json', }
    return await axios.post(Register_Url, payload, { headers: headers }).then(response => {
        console.log("Response", response);
        return response
    }).catch((err) => {
        console.log(err)
    })

}


export const loginPost = async () => {
    const payload = { "email": "cheranc7c7@gmail.com", "password": "Cheran@123" };
    const headers = { 'Content-Type': 'application/json', }
    return await axios.post(Login_Url, payload, { headers: headers }).then(response => {
        console.log("Response", response);
        return response
    }).catch((err) => {
        console.log("Catch error Api Failed", err)
    })
}

export const drawGetCall = async () => {

    return await axios.get(`${'https://api.grandealz.vytech.co'}/draws?limit=20&skip=0&status=Publish`).then(response => {
        // console.log("Responce in Drawgetcall", response.data.data);
        return response.data
    }).catch((err) => {
        console.log("catch error Api error.. .. .. ..", err);
    })
}


export const ourprod = async () => {

    return await axios.get(`https://api.grandealz.vytech.co/draws`).then(response => {
        console.log("Response", response.data.data);
        return response.data.data
    }).catch((err) => {
        console.log("Catch error Api Failed", err)
    })
}

export const drawWinnerGet = async (data: string) => {

    return await axios.get(`${'https://api.grandealz.vytech.co'}/draws/${data}`).then(response => {
        //console.log("Responce in Drawgetcall",response.data.data);
        return response.data
    }).catch((err) => {
        console.log("catch error Api error... DRWIN", err);
    })
}

export const drawWinnerfilter = async (data: any) => {
    console.log(data, "inside the filter api")
    const skip = `skip=${data?.skip === 1 ? 1 : 0}`;
    const limit = `limit=${data?.skip === 1 ? 12 : 150}`;
    const filterSearch = data.search;
    const filterDate = data.date;
    const filterYear = data.year;
    let paramfilter = "";
    if (filterSearch) {
        paramfilter = `search=${filterSearch}`;
    }
    if (filterDate) {
        paramfilter = paramfilter + `&draw_date=${filterDate}`;
    }
    if (filterYear) {
        paramfilter = paramfilter + `&draw_year=${filterYear}`
    }
    // const api = `https://api.grandealz.vytech.co/draws/winners?limit=12&skip=0${paramfilter}`
    console.log("Param filter.............", paramfilter)
    console.log(`${'https://api.grandealz.vytech.co'}/draws/winners?${limit}&${skip}${paramfilter}`);

    return await axios.get(`${'https://api.grandealz.vytech.co'}/draws/winners?${limit}&${skip}&${paramfilter}`).then(response => {
        console.log("Responce in drawWinnerfilter", response.data);
        return response.data
    }).catch((err) => {
        console.log("catch error Api error DRAWFILT", err);
    })
}





export const drawCommingfilter = async (data: string) => {
    const value = data.searcher
    console.log("data sam", value)

    return await axios.get(`${'https://api.grandealz.vytech.co'}/draws??limit=12&skip=0&status=UpComming&search=${value}`).then(response => {
        //console.log("Responce in Drawgetcall",response.data.data);
        return response.data
    }).catch((err) => {
        console.log("catch error Api erro r commin", err);
    })
}
export const drawCommingGet = async (data: string) => {

    return await axios.get(`${'https://api.grandealz.vytech.co'}/draws?${data}`).then(response => {
        //console.log("Responce in Drawgetcall",response.data.data);
        return response.data
    }).catch((err) => {
        console.log("catch error Api error .. getcucu", err);
    })
}



export const ourCountry = async () => {
    const key = fetchJSONAsync()
    const headers = { 'Content-Type': 'Application/json', 'Authorization': "Bearer" + key }
    return await axios.get(`${'https://api.grandealz.vytech.co'}/draws`, { headers: headers }).then(response => {
        console.log("Response countryCode", response.data.data);
        return response.data.data
    }).catch((err) => {
        console.log("Catch error Api Failed", err)
    })
}