import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axios from 'axios'
import { Toast } from 'react-native-simple-toast';
import { Forget_Password_Url } from '../../services/constant';

export const forgotPasswordHandler = createAsyncThunk('posts/forgotpostcall', async (data, thunkAPI) => {

    // console.log("Inside the api call", data);

    // const payload = { "email": "cheranc7c7@gmail.com" };
    // const headers = { 'Content-Type': 'application/json', }
    // return await axios.post(Forget_Password_Url, payload, { headers: headers }).then(response => {
    //     console.log("Response", response);
    //     return response
    // }).catch((err) => {
    //     console.log(err)
    // })
    try {
        const payload = data;
        let result = await axios.post(`${'https://api.grandealz.vytech.co'}/auth/forgote-password`, payload);
        console.log("result inside the Forgot page", result.data.status)
        if (parseInt(result.data.status) === 200) {
            console.log({ responseData: result.data.data });
            return result.data.message
        } else if (parseInt(result.data.status) == 404) {
            // console.log({responseData: result.data})
            return result.data.message
        } else {
            console.log('Forgot Error', result);
            return result.data.message
        }
    } catch (error) {
        console.log('Forgot Catch Error', error);
       Toast.show(
            'Please try again later',
            Toast.SHORT,
            );
    }
})

export const forgetPasswordHandleSlice = createSlice({
    name: 'ForgorHandle',
    initialState: {
        data: "No data",
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        console.log(forgotPasswordHandler, "search response")
        builder.addCase(forgotPasswordHandler.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    },
})
export default forgetPasswordHandleSlice.reducer;


