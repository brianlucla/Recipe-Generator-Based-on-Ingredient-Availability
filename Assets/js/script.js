var submitEl = document.getElementById("recipe-input");
var addButtonEl = document.getElementById("add-button");
var listEl = document.getElementById("ingredient-list");
var submitButtonEl = document.getElementById("submit-button");

var ingredientArray = [];
var recipeIDArray = [];
var instructionsArray = [];

//api keys and variables
var apiKeyS = "f2608e507b2741e5a596dfffbe06566d";
var baseApiUrlS = "https://api.spoonacular.com/recipes";
var apiKeyY = "AIzaSyAVCRPJFLTjkhZaC1cnkLud0mCKnEZTbZQ";
var baseApiUrlY = "https://www.googleapis.com/youtube/v3";

function getIngredient() {
  var ingredient = submitEl.value.trim();
  submitEl.value = "";
  ingredientArray.push(ingredient);
  var additionalIng = document.createElement("li");

  additionalIng.textContent = ingredient;
  listEl.appendChild(additionalIng);
}

// 2. find by ingredient --> spoonacular api
// pass the array to find by ingredient
// store the recipes in an array

function fetchRecipeIDs() {
  // make sure input is lowercase and no whitespace
  var ingredientInput = ingredientArray[0].toLowerCase().replace(" ", "");
  for (let i = 1; i < ingredientArray.length; i++) {
    var lowerInput = ingredientArray[i].toLowerCase().replace(" ", "");
    ingredientInput = `${ingredientInput},+${lowerInput}`;
  }
  var apiURL = `${baseApiUrlS}/findByIngredients?apiKey=${apiKeyS}&ingredients=${ingredientInput}&number=5`;
  console.log(apiURL);
  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        recipeIDArray.push(data[i].id);
      }
      console.log(data);
      console.log(recipeIDArray);
      fetchRecipeInstructions();
    });
}

function fetchRecipeInstructions() {
  console.log(recipeIDArray.length);
  for (let i = 0; i < recipeIDArray.length; i++) {
    var apiUrlTemp = `${baseApiUrlS}/${recipeIDArray[i]}/analyzedInstructions?apiKey=${apiKeyS}`;
    console.log(apiUrlTemp);
    fetch(apiUrlTemp)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          var instruction = [];
          for (let j = 0; j < data[i].steps.length; j++) {
            instruction.push(data[i].steps[j]);
          }
          instructionsArray.push(instruction);
        }
      });
  }
}

function printRecipes() {}

function fetchYoutubeVid() {}

function fetchIngredients(ingredArray) {}

//
function getInstructionsFromLS(recipe) {}

function getIngredientsFromLS(recipe) {}

function saveToLS(recipeObjects) {
  var recipes = localStorage.getItem("recipes");
  if (recipes) {
    return JSON.parse(recipes);
  } else {
    recipes = [];
  }

  return recipes;
}

// event listeners
addButtonEl.addEventListener("click", getIngredient);
submitButtonEl.addEventListener("click", fetchRecipeIDs);
submitEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getIngredient();
  }
});

// 1. take in user input store into an array

// 2. find by ingreditent --> spoonacular api
// pass the array to find by ingredient
// store the recipe in an array

// 3. print recipes
// array of used ingredients --> print to table
// pass  recipe id's to get analyzed recipe instructions
// iterate thru array of instructions and print to table

// 4. search food videos --> includeIngredients tag
// youtube api --> go fetch the video

// 5. display on the page

// 6. user profiles with stored recipes
// evnent listener for eacvh row video url
// take sibling and estract ecipe id into user object
// map each video url to the array of recipes
// whichever video they click, we save the recipe id

// variables for light mode
/*const modeSwitcher = document.querySelector('theme');
const container = document.querySelector('container');

// default
const mode = 'dark';

// event listener 

modeSwitcher.addEventListener('click', function(){
  if(mode === 'dark'); {
    mode = 'light';
    container.setAttribute('class', 'light');
  }
  else {
    mode = 'dark';
    container.setAttribute;('class', 'dark');
  }
}) */
