
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios' //this is like fetch

const initialState = {

    token: "", 
    error: "", 
    isLoading: false

}

const SIGN_UP = "SIGN_UP" //action types
const SIGN_IN = "SIGN_IN" //action types
const CHECK_TOKEN = "CHECK_TOKEN" //action types


// pending, fullfilled, rejected

// {formData: }

export const signUp = createAsyncThunk(SIGN_UP, async (params, thunkAPI)=>{

    console.log(params.formData);

    let response = await axios.post('/registration', params.formData)

    console.log(response);
    let jwt = response.data.token

    console.log(jwt);

    return jwt

})

export const signIn = createAsyncThunk(SIGN_IN, async (params, thunkAPI)=>{


    let response = await axios.post('/login', params.formData)

    let token = response.data.token 

    return token
})

export const checkToken = createAsyncThunk(CHECK_TOKEN, async (params, thunkAPI)=>{


    if(localStorage.token){
        // api call to check if token is valid

        let response = await axios.get('/protected', {
            headers: {
                'authorization': localStorage.token
            }
        })

        return response.data  //{isValid: true}
    }

    return {isValid: false}
})


let authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {

        signOut: (state, action)=>{

            state.token = ""

            localStorage.removeItem('token')
        }
    },
    extraReducers: {

        [signUp.pending] : (state, action)=>{

            state.isLoading = true;

        },
        [signUp.fulfilled] : (state, {payload})=>{  //action.payload

            state.isLoading = false

            state.token = payload

            localStorage.setItem('token', payload)
        },
        [signUp.rejected] : (state, action)=>{

            state.isLoading = false; 
            state.error = "Couldn't fetch data"
        },



        [signIn.pending] : (state, action)=>{

            state.isLoading = true;

        },
        [signIn.fulfilled] : (state, {payload})=>{  //action.payload

            state.isLoading = false

            state.token = payload

            localStorage.setItem('token', payload)
        },
        [signIn.rejected] : (state, action)=>{

            state.isLoading = false; 
            state.error = "Couldn't fetch data"
        },



        [checkToken.pending] : (state, action)=>{

            state.isLoading = true;

        },
        [checkToken.fulfilled] : (state, {payload})=>{  //action.payload {action.payload.isValid}

            state.isLoading = false

            if(payload.isValid){
                state.token = localStorage.token
                // state.error = "Credentials not valid"
            }

            
        },
        [checkToken.rejected] : (state, action)=>{

            state.isLoading = false; 
            state.error = "Couldn't fetch data"
        },
    }
})


export const {signOut} = authSlice.actions

export default authSlice.reducer
