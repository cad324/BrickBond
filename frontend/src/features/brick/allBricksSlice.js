import { createSlice } from '@reduxjs/toolkit';

export const allBricksSlice = createSlice({
    name: 'allBricks',
    initialState: {
        bricks: []
    },
    reducers: {
        allBricksLoader: (state, action) => {
            state.bricks = action.payload
        }
    }
});

export const { allBricksLoader } = allBricksSlice.actions;

export default allBricksSlice.reducer;