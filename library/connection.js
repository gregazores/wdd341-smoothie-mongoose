const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;


let _db

async function initDb(){
    if (_db) {
        console.log('Db is already initialized!');
        return
      }
   
    

    try {
         // onnect to a local MongoDB instance using the mongoose.connect() function.
        mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true });
        // To make sure your connection was successful, 
        //add the following code right below your mongoose.connect().
        const _db = mongoose.connection;
        _db.on("error", console.error.bind(console, "connection error: "));
        _db.once("open", function () {
            console.log("Connected successfully");
            const app = require('../server');
            app.listen(port, () => {
                console.log(`Running on port ${port}`)
            })
          });

    } catch (e) {
        console.error(e);
    }
    // finally {
    //     await client.close();
    // }
}

module.exports = {initDb};