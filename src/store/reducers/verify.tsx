import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axios from 'axios'

export const VerifyHandler = createAsyncThunk('posts/verifyPostcall', async (data,thunkAPI) => {
    try {
        const payload =data ;
        const token = await AsyncStorage.getItem('Signuptoken');
        console.log(token,"token token token",payload)
        const headers={'Authorization':`Bearer ${token}` }
        let result = await axios.post(`${'https://api.grandealz.vytech.co'}/auth/verify-otp`, payload,{headers:headers});
        console.log("result inside the verification page",result.data)
        if (parseInt(result.data.status) === 200) {
            console.log({ responseData: result.data });
            return result.data
        } else if(parseInt(result.data.status)== 401 ){
            console.log({responseData: result.data})
        }else {
            console.log('Login Error', result);
            return result.data.message
        }
    } catch (error) {
        console.log('Login Catch Error', error);
    }

})

export const verifyHandleSlice = createSlice({
    name: 'registerHandle',
    initialState: {
        data: "No data",
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
       
        builder.addCase(VerifyHandler.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    },
})
export default verifyHandleSlice.reducer;


