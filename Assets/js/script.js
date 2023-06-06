// pseudo code

// 1. take in user input store into an array
var submitEl = document.getElementById("recipe-input");
var addButtonEl = document.getElementById("add-button");
var listEl = document.getElementById("ingredient-list");
var submitButtonEl = document.getElementById("submit-button");

var ingredientArray = [];
var recipeIDArray =[];

//api keys and variables
var apiKeyS = "f2608e507b2741e5a596dfffbe06566d";
var baseApiUrlS = "https://api.spoonacular.com/recipes";
var apiKeyY = "AIzaSyAVCRPJFLTjkhZaC1cnkLud0mCKnEZTbZQ";
var baseApiUrlY = "https://www.googleapis.com/youtube/v3";

function getIngredient() {
  var ingredient = submitEl.value.trim();
  submitEl.value = '';
  ingredientArray.push(ingredient);
  var additionalIng = document.createElement("li");
  additionalIng.textContent = ingredient;
  listEl.appendChild(additionalIng);
}

function fetchRecipeIDs(){
  // make sure input is lowercase and no whitespace
  var ingredientInput = (ingredientArray[0].toLowerCase()).replace(" ","");
  for(let i = 1; i < ingredientArray.length; i++){
    var lowerInput = (ingredientArray[i].toLowerCase()).replace(" ","");
    ingredientInput = `${ingredientInput},+${lowerInput}`;
  }
  apiURL = `${baseApiUrlS}/findByIngredients?apiKey=${apiKeyS}&ingredients=${ingredientInput}&number=5`;
  console.log(apiURL);
  fetch(apiURL)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      for(let i = 0; i < data.length; i++){
        recipeIDArray.push(data[i].id);
      }
      console.log(data);
    })
}



// event listeners
addButtonEl.addEventListener("click", getIngredient);
submitButtonEl.addEventListener("click", fetchRecipeIDs);

// 2. find by ingredient --> spoonacular api
// pass the array to find by ingredient
// store the recipes in an array

// 3. print recipes 
// array of used ingredients --> print to table
// pass recipe id's to get analyzed recipe instructions
// iterate thru array of instructions and print to table

// 4. search food videos --> includeIngredients tag 
// youtube api --> go fetch the video

// 5. display on the page 

// 6. user profiles with stored recipes
// event listener for each row video url --> for loop thru the parent container 
// map each video url to the array of recipes --> parent container --> array of 5 children elements
// whichever video they click, we save that recipe id