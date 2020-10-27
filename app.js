const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');
const Post = require('./models/Post');
const bodyParser = require('body-parser');

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

app.use(bodyParser.json());

//middleware
// app.use("/page1",()=>{
//     console.log("middleware")
// })

// Routes

//get data from db
app.get("/page1",async (req,res) => {
    try{
        const posts = await Post.find(); // get all data from db
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
})

//get particular data from db

app.get("/page1/:postId", async(req,res)=> {
    try{const newPost = await Post.findById(req.params.postId);
    res.json(newPost);}catch(err){
        res.json({message:err});
    }
})

//post data onto the db
//soln1:
// app.post("/page1",(req,res) => {
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     })

//     post.save().then(data => {
//         res.json(data);
//     }).catch(err => {
//         res.json({ message: err});
//     })
// })

//soln2:

app.post("/page1",async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try{
        const savedPost = await post.save();
    res.json(savedPost);
    }catch(err){
        res.json({ message: err});
    }
    
    
})

//delete a specific post

app.delete('/page1/:postId',async (req,res) => {
    try{
        const newPost = await Post.deleteOne({_id:req.params.postId});
        res.json(newPost);
    }catch(err){
        res.json({message:err});
    }
})

//update a post

app.patch('/page1/:postId',async (req,res) => {
    try{
        const updatePost = await Post.updateOne({_id:req.params.postId},{$set:{title:req.body.title}})
        res.json(updatePost);
    }catch(err){
        res.json({message:err});
    }
})

//connect to db
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("connected to db");
})

//listens
app.listen(3000, console.log("Listening on port 3000"));