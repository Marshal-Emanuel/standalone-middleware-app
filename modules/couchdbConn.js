//connection couchdb
const nano = require("nano");

// Define the URL to your CouchDB instance
const url = "http://localhost:5984";

// Create a Nano instance with the URL
const nanoInstance = nano(url);

// Connect to the specified database
const connectCouch = async () => {
    try {
        const dbName = "couchdb";

        const db = nanoInstance.db.use(dbName);
        console.log("connected successfully");
        //querry the data 
        db.list({include_docs : true},(err,body)=>{
            if(err){
                console.error("Error in fetching the data",err);
                return;
            }
            const jsonData = body.rows.map(row => row.doc);
            console.log('Json data: ' ,jsonData);
        })

        return db;
    } catch (error) {
        // Handle any errors that occur during connection
        console.error("Error connecting to CouchDB:", error);
        throw error; // Propagate the error to the caller
    }
};

module.exports = connectCouch;


