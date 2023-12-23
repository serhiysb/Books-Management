const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Schema = mongoose.Schema;
const jsonParser = express.json();

app.use((req,resp,next)=>
{
    resp.header('Access-Control-Allow-Origin', '*'); 
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 
    resp.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS'); 
    next();
});

const bookSchema = new Schema({
    title:String,
    author:String,
    year:Number,
    genre:String,
    ISBN:String,
    description:String,
    img:String,
    pages:Number,
    price:Number,
    availability:Boolean
});

const Book = mongoose.model("Book", bookSchema);
(async()=>
{
    await mongoose.connect("mongodb://localhost:27017/Books")
})();

app.get("/api/books", async(req,res)=>
{
    try{
        const data = await Book.find();
        res.send(data);
    }
    catch(ex)
    {
        res.sendStatus(500);
    }
})

app.post("/api/books", jsonParser, async(req,res)=>
{
    if(!req.body) res.sendStatus(400)
    const book = new Book({title: req.body.title,
    author:req.body.author,
    description:req.body.description, 
    year: req.body.year,
    genre: req.body.genre,
    ISBN: req.body.ISBN,
    img:req.body.img,
    pages:req.body.pages,
    price:req.body.price,
    availability:req.body.availability
    })
    try
    {
        await book.save()
        res.send(book);
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
})

app.put("/api/books/:id", jsonParser, async (req,res)=>
{
    if(!req.body) return res.sendStatus(400);
    try{
        const id = new mongoose.Types.ObjectId(req.params.id);
        const book = await Book.findOneAndUpdate(
            {_id:id},
            {$set: {title:req.body.title,
                author:req.body.author,
                description:req.body.description, 
                year: req.body.year,
                genre: req.body.genre,
                ISBN: req.body.ISBN,
                img:req.body.img,
                pages:req.body.pages,
                price:req.body.price,
                availability:req.body.availability}},
                {returnDocument: "after"}
        )
        if(book) res.sendStatus(200);
        else res.sendStatus(404);
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
})

app.delete("/api/books/:id", async(req,res)=>
{
    try{
        const paramId = req.params.id;
        if(mongoose.Types.ObjectId.isValid(paramId))
        {
            const id = new mongoose.Types.ObjectId(paramId);
            if(await Book.findOneAndDelete({_id:id}))
                res.sendStatus(200);
            else res.sendStatus(404);
        }
    }
    catch(ex)
    {
        res.sendStatus(500);
    }
})

app.listen(4000, ()=>console.log(`Listen on port ${4000}`));