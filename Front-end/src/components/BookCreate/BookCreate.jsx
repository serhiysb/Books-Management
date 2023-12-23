import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../app/booksSlice";
import Book from "../../app/Book";

const BookCreate=()=>
{
    const book = new Book();
    const dispatcher = useDispatch();
    const [newBook, setNewBook]=useState(book)
    var file;

    const handleChange=(e)=>
    {
        setNewBook({...newBook, [e.target.name]:e.target.value});
    }

    const handleImgChange=(e)=>
    {
        file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload=(e2)=>
        {
            const blobImg = e2.currentTarget.result;
            setNewBook({...newBook, img:blobImg});
        }
        fileReader.readAsDataURL(file);
    }

    const handleCheckBox=(e)=>
    {
        setNewBook({...newBook, availability:e.target.checked})
    }

    const handleAddBook=()=>
    {
        if(newBook.title.trim()!=="" && 
        newBook.author.trim()!=="" && 
        parseInt(newBook.year)>0 && 
        newBook.genre.trim()!=="" &&
        newBook.ISBN.trim()!=="" &&
        newBook.description.trim()!=="" &&
        newBook.img.trim()!=="" &&
        parseInt(newBook.pages)>0 &&
        parseFloat(newBook.price)>0)
        {
            dispatcher(addBook(newBook));
            setNewBook(new Book());
        }
        else
            alert("Input all fields!");
    }

    return (
        <div>
            <div className="container">
                <div className="row">

                    <h1>Add new Book</h1>
                    <div  className="col-6">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control" name="title" value={newBook.title} onChange={handleChange} placeholder="Harry Poter"/>
                    </div>
                    <div className="col-6">
                        <label for="author" class="form-label">Author</label>
                        <input type="text" name="author" class="form-control" value={newBook.author} onChange={handleChange} placeholder="Joe Doe"/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="year" className="form-label">Year</label>
                        <input type="number" name="year" class="form-control" value={newBook.year} onChange={handleChange} placeholder="2013"/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="genre" className="form-label">Genre</label>
                        <input type="text" name="genre" class="form-control" value={newBook.genre} onChange={handleChange} placeholder="Fantasy"/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea name="description" class="form-control" cols="30" rows="9" value={newBook.description} onChange={handleChange} placeholder="This film about..."></textarea>
                    </div>
                    <div className="col-6">

                        <div >
                            <label htmlFor="img" className="form-label">Image</label>
                            <input type="file" name="img" class="form-control" value={file} accept="image/*" onChange={handleImgChange}/>
                        </div>
                        <div>
                            <label htmlFor="pages" className="form-label">Pages</label>
                            <input type="number" name="pages" class="form-control" value={newBook.pages} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" name="price" class="form-control" value={newBook.price} onChange={handleChange}/>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <label htmlFor="ISBN" className="form-label">ISBN</label>
                                <input type="text" name="ISBN" class="form-control" value={newBook.ISBN} onChange={handleChange}/>
                            </div>
                            <div className="col-3" style={{marginTop:"40px"}}>
                                <input type="checkbox" name="availability"  value={newBook.availability} onChange={handleCheckBox}/>    
                                <label htmlFor="availability" className="form-label">Availability</label>
                            </div>
                        </div>
                    </div>
                        <div>
                            <button className="btn btn-primary" style={{marginTop:"5px"}} onClick={handleAddBook}>Add Book</button>
                        </div>
                    
                </div>
            </div>
        </div>
    )
}

export default BookCreate;