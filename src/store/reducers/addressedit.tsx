import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axios from 'axios';
// import {ToastAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Verify_Url } from '../../services/constant';

export const addressEditHandler = createAsyncThunk('posts/AddressEDitcall', async (data, thunkAPI) => {
    try {
        const token = await AsyncStorage.getItem('loginToken');
        const headers = { 'Authorization': `Bearer ${token}` };
        const id = data.id;
        const payload = data.payload;
        console.log("data in api", data);
        let result = await axios.put(`${'https://api.grandealz.vytech.co'}/addresses/${id}`, payload, { headers: headers });
        console.log("result inside the adrres edit", result.data.status)
        if (parseInt(result.data.status) === 200) {
            console.log({ responseData: result.data.data });
            return result.data
        } else if (parseInt(result.data.status) == 401) {
            console.log({ responseData: result.data })
        } else {
            console.log('Draw Error', result);
            return result.data.message
        }
    } catch (error) {
        Toast.show("Please again select country, state, and city", Toast.LONG, Toast.CENTER)
        console.log('Login Catch Error', error);
    }

})

export const addressEditHandleSlice = createSlice({
    name: 'addressEdit',
    initialState: {
        data: "No data",
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(addressEditHandler.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    },
})
export default addressEditHandleSlice.reducer;


