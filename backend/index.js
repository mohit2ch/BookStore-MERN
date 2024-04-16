import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBUrl } from "./config.js";
import { Book } from "./models/bookModel.js";
const app = express();
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'
app.use(express.json());

app.use(cors());

app.get('/', function(req, res){
    res.send("<h1>Hello, World!</h1>")
})

app.use('/books', booksRoute);

mongoose.connect(mongoDBUrl).then(function(){
    console.log("connected to mongodb");
    app.listen(PORT, function(){
        console.log(`App is running on port ${PORT}`);
    })
}).catch(function(error){
    console.log(error);
})



