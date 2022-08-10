import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../modules/home/reducer/postSlice";

const store = configureStore({
    reducer:{
        posts:postSlice
    }
})
export default store;