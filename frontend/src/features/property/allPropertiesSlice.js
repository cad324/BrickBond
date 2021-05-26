import { createSlice } from '@reduxjs/toolkit'

export const allPropertiesSlice = createSlice({
    name: 'allProperties',
    initialState: {
        allProperties: []
    },
    reducers: {
        allPropertiesLoader: (state, action) => {
            state.allProperties = action.payload
        }
    }
});

export const { allPropertiesLoader } = allPropertiesSlice.actions;

export default allPropertiesSlice.reducer;