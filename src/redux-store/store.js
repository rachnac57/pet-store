import { dataStoreReducer } from "./index-reducer";
import thunk from "redux-thunk";
import {configureStore} from '@reduxjs/toolkit';

const reducer = {dataSource: dataStoreReducer};

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
