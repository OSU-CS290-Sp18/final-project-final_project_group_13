var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

var port = process.env.PORT || 3000;
var allPostData = require('./postData');

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
  res.render('postPage', {
    posts: allPostData,
  });
});

app.get('*', function(req, res){
  res.status(404).render('404');
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

app.listen(port, function(){

  console.log("==Server is listening on port: ", port);
});
