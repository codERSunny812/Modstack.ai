const express = require('express')
const app = express();
const notesRoute = require('./routes/notes.route.js')
const cors = require('cors');
const { connectDb } = require('./Database/Db.js');
require('dotenv').config()

console.log(process.env)


connectDb();


const PORT = process.env.PORT || 4001;
const uri = process.env.FRONTEND_URI;
//middle ware
app.use(express.json())
app.use(cors({
    origin:uri
}))



// routes middle ware
app.use('/create',notesRoute)



app.get('/',(req,res)=>{
    res.status(200).json({
        message:"the server is running"
    })
})


app.listen(PORT,()=>{
    console.log(`the server is running at ${PORT}`)
})
