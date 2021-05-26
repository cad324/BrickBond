import { createSlice } from '@reduxjs/toolkit';

export const registerPropertiesSlice = createSlice({
  name: 'myProperties',
  initialState: {
    properties: []
  },
  reducers: {
    myPropertiesLoader: (state, action) => {
      state.properties = action.payload
    }
  }
});

export const { myPropertiesLoader } = registerPropertiesSlice.actions;
export default registerPropertiesSlice.reducer;
