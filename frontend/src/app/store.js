import { configureStore } from '@reduxjs/toolkit';
import {default as addresserReducer} from '../features/account/addresserSlice';
import {default as balanceReducer} from '../features/account/balanceSlice';
import {default as allPropertiesReducer} from '../features/property/allPropertiesSlice';
import {default as registeredPropertiesReducer} from '../features/property/registeredPropertiesSlice';
import {default as allBricksReducer} from '../features/brick/allBricksSlice';
import {default as accountDetailsReducer} from '../features/account/accountDetailsSlice';
import {default as currentPageReducer} from '../features/page/currentPageSlice';

export default configureStore({
  reducer: {
    addresser: addresserReducer,
    setBalance: balanceReducer,
    allPropertiesLoader: allPropertiesReducer,
    myPropertiesLoader: registeredPropertiesReducer,
    allBricksLoader: allBricksReducer,
    accountDetailsSetter: accountDetailsReducer,
    setPage: currentPageReducer
  },
})
