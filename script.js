const express = require('express'),
  app = express(),
  fs = require('fs'),
  shell = require('shelljs'),
  folderPath = './Responses/',	   // Modify the folder path in which responses need to be stored
  defaultFileExtension = 'json', // Change the default file extension
  bodyParser = require('body-parser'),
  DEFAULT_MODE = 'writeFile',
  path = require('path');

shell.mkdir('-p', folderPath);// Create the folder path in case it doesn't exist

 // Change the limits according to your response size
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => res.send('Hello, I write data to file. Submit all api responses here!'));

app.post('/write', (req, res) => {
	var currentdate = new Date();
  var datetime = "" + currentdate.getDate() + (currentdate.getMonth()+1) + currentdate.getFullYear() + "_"
                + currentdate.getHours()+ currentdate.getMinutes() + currentdate.getSeconds();
  let extension = req.body.fileExtension || defaultFileExtension,
    fsMode = req.body.mode || DEFAULT_MODE,
    uniqueIdentifier = Date.now(),
    filePath = `${path.join(folderPath, datetime)}.json`;

	// console.log('Logging the request : '); 	console.log(Date.now()); 	console.log(filePath);		console.log(req.body);
	console.log('Saved response in file :' + filePath);

  fs[fsMode](filePath, JSON.stringify(req.body), (err) => {
    if (err) {
      console.log(err);
      res.send('Error');
    }
    else {
      res.send('Successfully saved the submitted api response into a file.');
    }
  });
});

app.listen(3000, () => {
  console.log('ResponsesToFile App is listening now! Send them requests my way!');
  console.log(`Data is being stored at location: ${path.join(process.cwd(), folderPath)}`);
});
