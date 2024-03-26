var fetchDataInJSON = require("./couchdbConn");
var express = require("express");

const fetchData = express.Router();

fetchData.post("./extract-data",(req,res)=>{
    fetchDataInJSON()
    .then(jsonData => {
      console.log("Fetched data:", jsonData);
    })
    .catch(error => {
      res.status(500)
    });
})

  module.exports = fetchData;