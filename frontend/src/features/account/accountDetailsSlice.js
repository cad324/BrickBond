import { createSlice } from '@reduxjs/toolkit'

export const accountDetailsSlice = createSlice({
    name: 'accountDetails',
    initialState: {
        details: {
            firstName: '',
            lastName: '',
            dob: '',
            issuer: false,
            address1: '',
            address2: '',
            city: '',
            province: '',
            zip: ''
        }
    },
    reducers: {
        accountDetailsSetter: (state, action) => {
            state = action.payload
        }
    }
})

export const { accountDetailsSetter } = accountDetailsSlice.actions;
export default accountDetailsSlice.reducer;