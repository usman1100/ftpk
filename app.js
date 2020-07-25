const express = require("express");
const morgan = require('morgan')
const mongoose = require("mongoose")
const Post = require("./posts")


const app = express();
const port = 4400

// Connecting to database
const dbURI = "mongodb+srv://user1:1234@cluster0.z2tve.mongodb.net/database0?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("Connected to DB")
        app.listen(port, () => {
            console.log(`Listening on 192.168.0.105:${port}`);
        })
    })
    .catch(err => console.log("Error: ", err))



// Setting View Engine
app.set("view engine", "ejs");

// Morgan Logger Midddleware
app.use(morgan('dev'));


// Static Middleware
app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }))





// Post Requests

app.post("/posts", (req, res) => {
    let post = new Post(req.body)
    post.save().
        then(() => {
            res.redirect("/success")
            console.log("Data Sent")
        })
        .catch(err => {
            console.log("Error Occurred")
        })
})





// Get Requests
app.get("/", (req, res) => {
    res.render("index", { title: "FreeThoughts.pk" });

})




app.get("/posts/:id", (req, res) => {
    let id = req.params.id.toString();

    Post.findById(id)
        .then(result => {
            res.render("details",  {title: "Details" , post: result })
        })
        .catch(err => console.log("ErrorWas", err))
})



app.get("/posts", (req, res) => {
    Post.find()
    .then(results=>{
        res.render("posts", { title: "Post", posts: results })
    })
    .catch(err => {
        res.redirect("/notFound")
        console.log(err)
    })
})



app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
})

app.get("/create", (req, res) => {
    res.render("create", { title: "Create New post" });
})

app.get("/success", (req, res) => {

    res.render("success", { title: "Success" });

})





// Response for 404
app.use((req, res) => {
    res.status(404).render("notFound", { title: "Not Found" });
})

