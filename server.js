const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv').config();
const PORT=process.env.PORT || 4000;
const DB_URI=process.env.DB_URI + process.env.DB_NAME || 'mongodb://127.0.0.1:27017/mern-crud-app';
const mongoose=require('mongoose');

//importing routes
const customerRoutes =require('./routes/customers');// express.Router();
const userRoutes =require('./routes/users');
const productRoutes =require('./routes/products');
app.use(cors());
app.use(bodyParser.json());

// database connection
mongoose.connect(DB_URI,{ useNewUrlParser:true, useCreateIndex: true });
connection=mongoose.connection;
connection.once('open',function(){
    console.log("database connected successfully");
});
//using routes
app.use('/customers', customerRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

if(process.env.APP_ENV === 'production'){
    app.use(express.static('/mern-crud-app/build'))
}

//app starts here
app.listen(PORT,function(){
    console.log("server is running on Port:"+PORT);
});