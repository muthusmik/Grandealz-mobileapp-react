import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axios from 'axios'
import { Register_Url } from '../../services/constant';

export const registerHandler = createAsyncThunk('posts/loginPostcall', async (data,thunkAPI) => {

    try {
        const payload = data;
        let result = await axios.post(`${'https://api.grandealz.vytech.co'}/auth/register`, payload);
        //console.log("result inside the login page",result.data.status)
        if (parseInt(result.data.status) === 200) {
            console.log({ responseData: result.data.data });
            return result.data
        } else if(parseInt(result.data.status)== 401 ){
            console.log({responseData: result.data})
            return result.data
        }else {
            console.log('Login Error', result);
            return result.data
        }
    } catch (error) {
        console.log('Login Catch Error', error);
        return 404;
    }

})

export const registerHandleSlice = createSlice({
    name: 'registerHandle',
    initialState: {
        data: "No data",
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
       
         console.log(registerHandler, "search response")
        builder.addCase(registerHandler.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    },
})
export default registerHandleSlice.reducer;


