import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post('/', async function(req, res){
    try{
        console.log(req.body, req.body.title, req.body.author, req.body.publishYear);
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }
        
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const book = await Book.create(newBook);

        return res.status(201).send(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

router.get('/', async function(req, res){
    try{
        const books = await Book.find({});
        return res.status(200).send({count: books.length, books: books});
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})


router.get('/:id', async function(req, res){
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).send("Book with the given id doesn't exist");
        }
        return res.status(200).send(book);
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

router.put('/:id', async function(req, res){
    try{
        console.log(req.body, req.body.title, req.body.author, req.body.publishYear);
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        if(!book){
            return res.status(404).send("Book with the given id doesn't exist");
        }
        return res.status(201).send("Book updated successfully!");
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

router.delete('/:id', async function(req, res){
    try{
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).send("Book with the given id doesn't exist");
        }
        return res.status(201).send("Book deleted successfully!");
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

export default router;