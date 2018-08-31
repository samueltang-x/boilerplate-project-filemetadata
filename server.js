'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');
var upload = multer( {dest: 'uploads/'} );

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log('File object in request is: ', JSON.stringify(req.file));
  
  var status = 200;
  var body = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
  
  res.status(status).type('application/json').send(body);
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
