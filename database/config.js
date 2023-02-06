
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
const dbConnection = async()=>{
     
     try{
       await mongoose.connect(process.env.DB_CNN);
     console.log('connection made')
     }catch(error){
        console.log(error);
        throw new Error('failed to initialize the DB')
     }
}

module.exports={
    dbConnection
}