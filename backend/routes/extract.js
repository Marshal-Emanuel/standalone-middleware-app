
const fetchDataInJSON = require("../modules/couchdbConn");
const express = require("express");
const verifyDataWithSha256 = require("../public/javascripts/dataVerify");

const fetchData = express.Router();

fetchData.get("/", (req, res) => {
    fetchDataInJSON()
        .then(documents => {
            // Array to store documents that pass verification
            const validDocuments = [];

            // Iterate through each document
            documents.forEach(document => {
                // Verify if the fetched data has the sha256 key
                const hasSha256Key = verifyDataWithSha256(document);
                
                if (hasSha256Key) {
                    // Add the valid document to the list
                    validDocuments.push(document);
                }
            });

            // Send the array of valid documents in response
            res.json(validDocuments);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: "Internal Server Error" }); // Send error response with status code 500
        });
});

module.exports = fetchData;
