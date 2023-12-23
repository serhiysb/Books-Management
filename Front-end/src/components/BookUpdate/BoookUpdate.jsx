import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBook, fetchBooks } from "../../app/booksSlice";
import { useParams } from "react-router-dom";
import Book from "../../app/Book";

const BookUpdate=()=>
{
    const dispatcher = useDispatch();
    const params= useParams();
    const books = useSelector(state=>state.books);
    const [bookForUpdate, setBookForUpdate]=useState(books.find(b=>b._id===params.id));
    var file;
    useEffect(()=>
    {
        dispatcher(fetchBooks());
    },[dispatcher])

    const handleChange=(e)=>
    {
        setBookForUpdate({...bookForUpdate, [e.target.name]:e.target.value});
    }

    const handleImgChange=(e)=>
    {
        file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload=(e2)=>
        {
            const blobImg = e2.currentTarget.result;
            setBookForUpdate({...bookForUpdate, img:blobImg});
        }
        fileReader.readAsDataURL(file);
    }

    const handleUpdateBook=()=>
    {
        if(bookForUpdate.title.trim()!=="" && bookForUpdate.author.trim()!=="" && bookForUpdate.year!=="")
        {
            dispatcher(editBook(bookForUpdate));
            setBookForUpdate(new Book());
        }
        else
            alert("Input all fields!");
    }

    const handleCheckBox=(e)=>
    {
        setBookForUpdate({...bookForUpdate, availability:e.target.checked})
    }

    return(
        <div>
            <div className="container">
                <div className="row">
                    <h1>Update Book</h1>
                    <div  className="col-6">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control" name="title" value={bookForUpdate.title} onChange={handleChange} placeholder="Harry Poter"/>
                    </div>
                    <div className="col-6">
                        <label for="author" class="form-label">Author</label>
                        <input type="text" name="author" class="form-control" value={bookForUpdate.author} onChange={handleChange} placeholder="Joe Doe"/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="year" className="form-label">Year</label>
                        <input type="number" name="year" class="form-control" value={bookForUpdate.year} onChange={handleChange} placeholder="2013"/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="genre" className="form-label">Genre</label>
                        <input type="text" name="genre" class="form-control" value={bookForUpdate.genre} onChange={handleChange} placeholder="Fantasy"/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea name="description" class="form-control" cols="30" rows="10" value={bookForUpdate.description} onChange={handleChange} placeholder="This film about..."></textarea>
                    </div>
                    <div className="col-6">

                        <div >
                            <label htmlFor="img" className="form-label">Image</label>
                            <input type="file" name="img" class="form-control" value={file} accept="image/*" onChange={handleImgChange}/>
                        </div>
                        <div>
                            <label htmlFor="pages" className="form-label">Pages</label>
                            <input type="number" name="pages" class="form-control" value={bookForUpdate.pages} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" name="price" class="form-control" value={bookForUpdate.price} onChange={handleChange}/>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <label htmlFor="ISBN" className="form-label">ISBN</label>
                                <input type="text" name="ISBN" class="form-control" value={bookForUpdate.ISBN} onChange={handleChange}/>
                            </div>
                            <div className="col-3" style={{marginTop:"40px"}}>
                                <input type="checkbox" name="availability"  checked={bookForUpdate.availability} onChange={handleCheckBox}/>    
                                <label htmlFor="availability" className="form-label">Availability</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary" style={{marginTop:"5px"}} onClick={handleUpdateBook}>Update Book</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default BookUpdate;