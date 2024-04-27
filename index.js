const express=require("express");
const app=express();
const mongoose = require('mongoose');
const port=8080;
const path=require("path");
const Recipe = require("./models/recipe");
var methodOverride = require('method-override')

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.listen(port,()=>{
    console.log("listening");
});

// home route
app.get("/recipe",async (req,res) => {
    let allrecipe=await Recipe.find({});
    res.render("home.ejs", {allrecipe} );
});

// show route
app.get("/recipe/:id",async (req,res) => {
    let {id}=req.params;
    let recipe=await Recipe.findById(id);
    res.render("detail.ejs", {recipe} );
});

//UPDATE ROUTE
app.delete("/recipe/:id/", async (req,res) => {
    try {
        let {id}=req.params;
        let recipe=await Recipe.findByIdAndDelete(id);
        res.redirect("/recipe");
    } catch(err) {
        console.log(err);
    }
});

main(console.log("mongoose connected")).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/recipeApp');
}