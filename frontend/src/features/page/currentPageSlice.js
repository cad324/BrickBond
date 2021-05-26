import { createSlice } from '@reduxjs/toolkit';

export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState: {
        currentPage: '/'
    },
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
});

export const { setPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;