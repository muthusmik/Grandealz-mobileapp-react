import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axios from 'axios'
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";



export const changepasswordHandle  = createAsyncThunk('post/changepasswordpostcall', async (data, thunkAPI) => {
    try {
    const payload = data;
    const token=await AsyncStorage.getItem('loginToken');
        const headers={'Authorization':`Bearer ${token}`}
    console.log("headers.data",headers,"kkkk",data)

    let result = await axios.post(`${'https://api.grandealz.vytech.co'}/auth/change-password`,payload,{headers:headers})
    console.log("ram",result)
    if (parseInt(result.data.status) === 200) {
        console.log({ responseData: result.data.data });
         return result.data.message
    } else if (parseInt(result.data.status) == 404) {
         console.log({responseData: result.data})
         return result.data.message
    } else {
         return result.data.message

    }
} catch (err)  {
        console.log("catch error Api error.. changepasss", err);
        Toast.show(
            'Please try again later',
            Toast.SHORT,
        );
    }
})

export const changepasswordHandleSlice = createSlice({
    name: 'ChangepasswordHandle',
    initialState: {
        data: "No data",
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        console.log(changepasswordHandle, "search response")
        builder.addCase(changepasswordHandle.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    },
})
export default changepasswordHandleSlice.reducer;