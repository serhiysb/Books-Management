import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, removeBook } from "../../app/booksSlice";
import "./BooksList.css"
import { Link} from "react-router-dom";

const BooksList=()=>
{
    const dispatcher = useDispatch();
    useEffect(()=>
    {
        dispatcher(fetchBooks());
    },[dispatcher])
    const books = useSelector((state)=>state.books);

    const handleDelete = (_id)=>
    {
        dispatcher(removeBook(_id));
    }
    
    return(
    <div>

        <h1>Books list</h1>
        <div  className="container">
            <div className="row justify-content-center">

            {books.map((book)=>(
                <div key={book.ISBN} className="list-container col-3">
                <img src={book.img} alt={book.title} style={{"width":"100px", "marginTop":"10px"}}/>
                <p>Title: {book.title}</p>
                <p>Genre: {book.genre}</p>
                <p>Author: {book.author}</p>
                <p>Description {book.description}</p>
                <p>Price: {book.price}</p>
                <p>Year: {book.year}</p>
                <p>Pages: {book.pages}</p>
                <p>ISBN: {book.ISBN}</p>
                <p>Availability: {book.availability===true?"Available for sale":"Not available"}</p>
                <button className="btn btn-danger" style={{marginRight:"5px"}} onClick={()=>handleDelete(book._id)}>Delete</button>
                <Link className="btn btn-primary" to={`/updateBook/${book._id}`}>Update</Link>
                </div>
            ))}
            </div>
        </div>
    </div>
    )
}

export default BooksList;