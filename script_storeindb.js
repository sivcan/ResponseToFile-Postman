const express = require("express"), app = express(), fs = require("fs"), sql = require("mssql"),
  // shell = require("shelljs"),   bodyParser = require("body-parser"),   path = require("path"),
  request = require("request");

var config = {
  server: "mssql_dbservername",
  database: "databasename",
  user: "sqluserid",
  password: "password@123",
  trustServerCertificate: true,
  port: 1433,
};

var options = {
  method: "GET",
  url: "api get URL",
  headers: { Authorization: 'Basic UHJpbmVjdDpQciFuZWN0MTg=' }, // authentication token assuming basic auth mode
};

setInterval( function(){
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    sql.connect(config, function (err) {
      if (err) throw new Error(err);
      var request = new sql.Request(); //JSON.stringify(req.body)
      let insertQ = `INSERT INTO tableName (columnName) VALUES('${response.body}')`;
      let rqlRes = request.query(insertQ);
      console.log(insertQ);
    });
  })}, 5000); // Call api every 5 seconds and store the response in the MSSQL db table

app.listen(3000, () => {
  console.log(
    "ResponsesToFile App is listening now! Send them requests to store in database!"
  );
});
