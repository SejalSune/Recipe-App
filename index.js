require('dotenv').config();
const express=require("express");
const app=express();
const mongoose = require('mongoose');
const port=8080;
const path=require("path");
const Recipe = require("./models/recipe");
var methodOverride = require('method-override');
const ExpressError=require("./ExpressError");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// home route
app.get("/recipe",async (req,res,next) => {
    try {
    let allrecipe=await Recipe.find({});
    res.render("home.ejs", {allrecipe} );
    } catch (err) {
        next(err);
    }
});

// new route
app.get("/recipe/new", (req,res,next) => {
    res.render("new.ejs");
});

//add route
app.post("/recipe", async (req,res,next)=>{
    try {
    let newRecipe=new Recipe(req.body.recipe);
    await newRecipe.save();
    res.redirect("/recipe");
    } catch (err) {
        next(err);
    }
});

//add route
app.put("/recipe/:id", async (req,res,next)=>{
    try {
    let {id}=req.params;
    let recipe=await Recipe.findByIdAndUpdate(id, {...req.body.recipe});
    res.redirect(`/recipe/${id}`);
    } catch (err) {
        next(err);
    }
});

// show route
app.get("/recipe/:id",async (req,res,next) => {
    try {
    let {id}=req.params;
    let recipe=await Recipe.findById(id);
    res.render("detail.ejs", {recipe} );
    } catch (err) {
        next(err);
    }
});

// edit route
app.get("/recipe/:id/edit", async (req,res,next) => {
    try {
        let {id}=req.params;
        let allrecipe=await Recipe.findById(id);
        res.render("edit.ejs", {allrecipe} );
    } catch (err) {
        next(err);
    }
    
});

//delete ROUTE
app.delete("/recipe/:id/", async (req,res,next) => {
    try {
        let {id}=req.params;
        let recipe=await Recipe.findByIdAndDelete(id);
        res.redirect("/recipe");
    } catch(err) {
        next(err);
    }
});

app.all("*", (req, res, next) => {
    res.render("pagenotfound.ejs");
});

app.use((err, req, res, next)=>{
    let {status=500, message="something went wrong"}=err;
    res.status(status).send(message);
});

app.listen(port,()=>{
    console.log("listening");
});

main(console.log("mongoose connected")).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.URL);
}