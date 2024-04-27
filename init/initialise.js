const mongoose=require("mongoose");
const recipe=require("../models/recipe.js");
const initdata=require("./data.js");

main().then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
});

async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/recipeApp');
}

const initialise=async ()=>{
    await recipe.deleteMany({});
    await recipe.insertMany(initdata.data);
    console.log("data was initialised");
}

initialise();

