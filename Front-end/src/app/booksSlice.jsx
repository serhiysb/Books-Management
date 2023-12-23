import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getAllBooks, createBook, deleteBook, updateBook} from "../services/bookService";

export const fetchBooks=createAsyncThunk('books/fetchBooks', async()=>
{
    const books = await getAllBooks()
    return books
})

export const addBook = createAsyncThunk('books/post', async(book)=>
{
    return await createBook(book);
})

export const editBook=createAsyncThunk('books/editBook', async(book)=>
{
    // console.log(book)
    const {_id,...updatedBook}=book;
    await updateBook(_id,updatedBook);
    return {_id};
})

export const removeBook = createAsyncThunk('book/deleteBook', async(_id)=>
{
    await deleteBook(_id);
    return {_id};
})

const booksSlice = createSlice({
    name:"books",
    initialState:[],
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchBooks.fulfilled,(state,action)=>
        {
            return action.payload;
        })
        .addCase(addBook.fulfilled, (state,action)=>
        {
            state.push(action.payload);
            console.log(state);
        })
        .addCase(editBook.fulfilled, (state,action)=>
        {
            const index = state.findIndex(book=>book._id===action.payload._id);
            if(index!==-1)
            {
                state[index]=action.payload;
            }
        })
        .addCase(removeBook.fulfilled, (state,action)=>
        {
            return state.filter(b=>b._id!==action.payload._id);
        })
    }
})

export default booksSlice.reducer;