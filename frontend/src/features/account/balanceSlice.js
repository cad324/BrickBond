import { createSlice } from '@reduxjs/toolkit'

export const balanceSlice = createSlice({
    name: 'balance',
    initialState: {
        brickBalance: '0'
    },
    reducers: {
        setBalance: (state, action) => {
            state.brickBalance = action.payload
        }
    }
});

export const { setBalance } = balanceSlice.actions;

export default balanceSlice.reducer;