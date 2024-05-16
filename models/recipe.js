const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: String,
    photo: Array,
    video:String,
    ingredients: Array,
    instructions: Array,
});

module.exports = mongoose.model('Recipe', recipeSchema);
