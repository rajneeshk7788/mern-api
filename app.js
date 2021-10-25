const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(require('./router/auth '));

dotenv.config({path:'./config.env'});

const DB = process.env.DATABASE;
const User = require('./model/userSchema')


const PORT =process.env.PORT;


mongoose.connect(DB
    
    ).then(()=>{
    console.log(`connection Successful`);

}).catch((err)=>console.log(`No Connection`));



// middelware

const middleware = (req, res, next) =>{
    console.log(`hello my middleware`);
    next();
    
}



// app.get('/', (req, res)=>{
//     res.send(`Hello world from the server`);
// });

app.get('/about', middleware, (req, res)=>{
    res.send(`Hello world from the about`);
});

// app.get('/signup', (req, res)=>{
//     res.send(`Hello world from the signup`);
// });

app.listen(PORT,()=>{
    console.log(`server is running at port no. ${PORT}`);
})

console.log('successfully');