
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const{dbConnection}= require('./database/config')


const app = express()

//Base de datos
dbConnection()

//CORS
app.use(cors());

app.use(express.static('public'))
app.use(express.json());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//lectura y parse del json





//Escuchar peticiones

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en puerto ${process.env.PORT}`)
})