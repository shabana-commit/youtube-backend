// require('dotenv').config({path:"./env"})
import dotenv from 'dotenv';
// const express = require('express');
// const app = express();
import connectDB from './db/index.js';

dotenv.config({path:"./env"});

// console.log(process.env)

connectDB();


/*
(async ()=>{
    try{
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) =>{
            console.error(error)
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`app is listening on port : ${process.env.PORT}`)
        })

    }catch(error){
        console.error('ERROR :', error);
        throw err
    }
})()

*/