import { createSlice, createAsyncThunk,} from '@reduxjs/toolkit';
import axios from 'axios'
import { Toast } from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addressListHandler = createAsyncThunk('get/addresslistgetcall', async (data, thunkAPI) => {
    try {
        const token=await AsyncStorage.getItem('loginToken');
        const headers={'Authorization':`Bearer ${token}` }
        let result = await axios.get(`${'https://api.grandealz.vytech.co'}/addresses`,{headers:headers});
        console.log("resu", result.data.status)
        if (parseInt(result.data.status) === 200) {
             console.log("super", result.data.data);
            return result.data.data
        } else if (parseInt(result.data.status) == 404) {
            // console.log({responseData: result.data})
            return result.data.data
        } else {
            console.log('address Error', result);
            return result.data.message
        }
    } catch (error) {
        console.log('address Catch Error', error);
        Toast.show(
            'Please try again later',
            Toast.SHORT,
        );
    }
})

export const addressListHandlerSlice = createSlice({
    name: 'AddressHandle',
    initialState: {
        data: [],
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        console.log(addressListHandler, "search....too response")
        builder.addCase(addressListHandler.fulfilled, (state, action) => {
            state.data = action.payload;
            console.log("gggg", state.data)
        })
    },
})
export default addressListHandlerSlice.reducer;


