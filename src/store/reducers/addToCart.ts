import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axios from 'axios'


export const addToCartHandler = createAsyncThunk('get/drawProductGetcall', async (data, thunkAPI) => {
    try {
        let key = await AsyncStorage.getItem("loginToken");

        const payload = { "draw": `${data}` };
        const headers = { "Authorization": `Bearer ${key}` }
        console.log("inside..... ", payload)
        let result = await axios.post(`${'https://api.grandealz.vytech.co'}/cart`, payload, { headers: headers });
        // console.log("result inside the login page.....",result.data.data)
        // if (parseInt(result.data.status) === 200) {
        //     console.log({ responseData: result.data.data });
        //     return result.data
        // } else if(parseInt(result.data.status)== 401 ){
        //     console.log({responseData: result.data})
        // }else {
        //     console.log('Login Error', result);
        return result.data
        // }

    } catch (error) {
        console.log('Login Catch Error', error);
    }
})

export const addToCartHandleSlice = createSlice({
    name: 'addToCartHandle',
    initialState: {
        data: "No data",
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        console.log(addToCartHandler, "search response")
        builder.addCase(addToCartHandler.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    },
})
export default addToCartHandleSlice.reducer;


