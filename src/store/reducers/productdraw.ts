import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axios from 'axios'


export const productDrawHandler = createAsyncThunk('get/drawProductGetcall', async (data,thunkAPI) => {

    try {
        console.log("inside..... ")
        const payload = data;
        let result = await axios.get(`${'https://api.grandealz.vytech.co'}/draws?limit=200&skip=0&status=Publish`);
        console.log("result mmmm page.....",result.data.data)
        // if (parseInt(result.data.status) === 200) {
        //     console.log({ responseData: result.data.data });
        //     return result.data
        // } else if(parseInt(result.data.status)== 401 ){
        //     console.log({responseData: result.data})
        // }else {
        //     console.log('Login Error', result);
        //     return result.data.message
        // }
        return result.data.data
    } catch (error) {
        console.log('Login Catch Error', error);
    }

})

export const productDrawHandleSlice = createSlice({
    name: 'productDrawHandle',
    initialState: {
        data: "",
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
       
         console.log(productDrawHandler, "search response")
        builder.addCase(productDrawHandler.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    },
})
export default productDrawHandleSlice.reducer;


