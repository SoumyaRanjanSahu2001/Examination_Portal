const mongoose = require('mongoose')

const DBCONN = async () => {
    try{
        const url = process.env.DB;
        const conn = mongoose.connect(url,{
            useUnifiedTopology : true,
            useNewUrlParser : true
        })
        console.log(`Mongo Db Connection Successful...`)

    }catch(err){
        console.log(`error: ${err.message}`)
    }
}

module.exports = DBCONN