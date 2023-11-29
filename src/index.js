// require('dotenv').config({path:"./env"})
import dotenv from 'dotenv';
// const express = require('express');
import express from 'express';
const app = express();

import connectDB from './db/index.js';
const PORT = process.env.PORT || 5001;
dotenv.config({path:"./env"});

// console.log(process.env)

connectDB()
.then(() =>{
    app.listen(PORT, () =>{
        console.log(`server is listening on port : ${PORT}`)
    })
})
.catch((err) =>{
    console.log('connection failed',  err);
})


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