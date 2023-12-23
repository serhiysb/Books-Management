import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./booksSlice";

const reducer={
    books:bookReducer
}

const store=configureStore({
    reducer:reducer
})

export default store;