/*
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var MongoClient = require('mongodb').MongoClient;
var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoURL = "mongodb://" + mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort + "/" + mongoDBName;
var mongoDB= null;

var port = process.env.PORT || 7579;
var allPostData = require('./postData');

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
  res.render('postPage', {
    posts: allPostData,
  });
});

app.get('*', function(req, res){
  res.status(404).render('404');
});

app.get('/comments', function (req, res, next){
     var commentCollection = mongoDB.collection('Comments');
     
     commentCollection.find().toArray(function(err, comments){
      if(err){
         res.status(500).send("Error fetching comments from DB.");
      }else{
	 res.status(200).render('comment',{
	 	text: text,
	 	author: author
            });
      }
      });
    });
app.get('/comments/:text', function(req,res,next){
   var text = req.params.text.toLowerCase();
   var commentCollection = mongoDB.collection('Comments');
   commentCollection.find({text: text}).toArray(function(err, Comments){
      if(err){
	 res.status(500).send("Error fetching text from DB.");
      }else if (Comments.length>0){
	 res.status(200).render('comment', Comments[0]);
      }else{
	 next();
      }
   });
});

app.get('/posts/:index', function(req, res, next){
  var postData = allPostData[req.params.index];
  if(postData){
    res.render('postPage', {
      posts: [postData],

    });
  }else{
    next();
  }

});
MongoClient.connect(mongoURL, function (err,client){
   console.log("This is the output of mongoUrl: ", mongoURL);
   console.log("This is the output of mongoDB: ", mongoDB);
//  if(err){
  //  throw err;
 // }
  
  mongoDB=client.db(mongoDBName);
  app.listen(port, function(){
    console.log("==server connected to mongoDB.")
  });
});
*/
