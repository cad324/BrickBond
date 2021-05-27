import { createSlice } from '@reduxjs/toolkit'

export const accountDetailsSlice = createSlice({
    name: 'accountDetails',
    initialState: {
        details: {}
    },
    reducers: {
        accountDetailsSetter: (state, action) => {
            state.details = action.payload
        }
    }
})

export const { accountDetailsSetter } = accountDetailsSlice.actions;
export default accountDetailsSlice.reducer;