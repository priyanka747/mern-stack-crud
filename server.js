const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv').config();
const PORT=process.env.PORT || 4000;
const DB_URI=process.env.MLAB_URI || 'mongodb://127.0.0.1:27017/mern-crud-app';
const mongoose=require('mongoose');

//importing routes
const customerRoutes =require('./routes/customers');// express.Router();
const userRoutes =require('./routes/users');
const productRoutes =require('./routes/products');
const path = require('path');
app.use(cors());
app.use(bodyParser.json());

// database connection
mongoose.connect(DB_URI,{ useNewUrlParser:true, useCreateIndex: true });
connection=mongoose.connection;
connection.once('open',function(){
    console.log("database connected successfully"+DB_URI);
});
//using routes
app.use('/api/customers', customerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// serve static assets if in production
if(process.env.APP_ENV === 'production'){
    app.use(express.static('mern-crud-app/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'mern-crud-app','build', 'index.html'))
    });
    app.post('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'mern-crud-app','build', 'index.html'))
    });
}

//app starts here
app.listen(PORT,function(){
    console.log("server is running on Port:"+PORT);
});