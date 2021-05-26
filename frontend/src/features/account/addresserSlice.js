import { createSlice } from '@reduxjs/toolkit'

export const addresserSlice = createSlice({
    name: 'address',
    initialState: {
        address: '0'
    },
    reducers: {
        addresser: (state, action) => {
            state.address = action.payload
        }
    }
});

export const { addresser } = addresserSlice.actions;

export default addresserSlice.reducer;