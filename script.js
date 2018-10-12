const express = require('express');
  app = express();
  fs = require('fs');
  shell = require('shelljs');
  folderPath = './Responses/'; // Modify the folder path in which responses need to be stored
  fileExtension = '.json'; // Change the file extension
  bodyParser = require('body-parser'),
  path = require('path');

shell.mkdir('-p', folderPath);

app.use(bodyParser.json({limit: '50mb', extended: true})); // Change limit according to your response size
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));  // Change limit accordingly

app.get('/', (req, res) => res.send('Hello, I write data to file.'));

app.post('/write', (req, res) => {
  let filePath = `${path.join(folderPath, req.body.requestName)}${fileExtension}`;
  fs.writeFile(filePath, req.body.responseData, (err) => {
    if (err) {
      console.log(err);
      res.send('Error');
    }
    else {
      res.send('Success');
    }
  });
});

app.listen(3000, () => console.log('Postman-File App listening on port 3000!'))