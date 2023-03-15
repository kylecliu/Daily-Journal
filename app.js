//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {

  res.render("home", {posts:posts});
});


app.get("/posts/:postTitle", function(req, res) {
  
  posts.forEach(function(element){
    
    let title = element.blogTitle;
    let postBody = element.blogBody;
    let parsedTitle = _.kebabCase(title)

    if (parsedTitle === _.kebabCase(req.params.postTitle)){
      console.log('match found');
      res.render("post", {title:title, postBody:postBody});
    } 
  });
  
});

app.post("/compose", function(req, res) {

  const blogPost = {
    blogTitle: req.body.title,
    blogBody: req.body.post
  }

  posts.push(blogPost);

  console.log(posts)

  res.redirect("/");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/compose", function(req, res) {
  res.render("compose");
});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
