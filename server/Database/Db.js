const mongoose = require('mongoose');


module.exports.connectDb= ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("the mongodb is successfully connected")
    })
    .catch((err)=>{
    console.log(`error in connecting mongodb ${err.message}`)
    })
}

