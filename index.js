const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override")
app.use(methodOverride("_method"))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended : true}));

let posts = [
    {
        name:"sudarshan",
        content : "Hii I'm Sudarshan, currently I'm Learning RESTful APIs"

    },
    {
        name:"Uday",
        content : "Its me The Uday AKA TheDivineLucky - Former FreeFire Esports Player"

    },
    {
        name:"ApritDubey",
        content : "Hey guyss, I hope you guys are doing good"

    },
    {
        name:"Chandan",
        content : "Hey Guyss, Its me chandan a diploma student"

    }
]
app.get("/",(req,res) =>{
    res.redirect("/posts")
})
app.get("/posts",(req,res) =>{
    res.render("index.ejs",{posts})
})

app.post("/posts/new",(req,res) => {
    posts.splice(0,0,req.body);
    res.redirect("/posts")
})

app.delete("/posts/:index",(req,res) =>{
    const index = req.params.index;
    posts.splice(index,1);
    res.redirect("/posts")
})
app.get("/posts/new",(req,res) =>{
    res.render("new.ejs")
})
app.get("/posts/show",(req,res) =>{
    const query = req.query.q;
    let response = [];
    for(post of posts){
        if(post.name.toLowerCase() == query.toLowerCase().trim()){
            response.push(post)
        }
    }
    res.render("show.ejs",{response})
})
app.listen(port,() => {
    console.log(`server is live on port ${port}`)
})
