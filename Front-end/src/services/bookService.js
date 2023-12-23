import http from "./http_common";

export const getAllBooks=async()=>
{
    const response = await http.get("/api/books");
    return response.data;
}

export const createBook = async(book)=>
{
    const response = await http.post("/api/books", book);
    console.log(response.data);
    return response.data;
}

export const updateBook= async (_id,book)=>
{
    const response = await http.put(`/api/books/${_id}`,book);
    return response.data;
}

export const deleteBook = async(_id)=>
{
    await http.delete(`/api/books/${_id}`);
}