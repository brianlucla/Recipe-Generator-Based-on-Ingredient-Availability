var submitEl = document.getElementById('recipe-input');
var addButtonEl = document.getElementById('add-button');
var listEl = document.getElementById('ingredient-list');
var submitButtonEl = document.getElementById('submit-button');

var ingredientArray = [];
var recipeIdArray = [];
 
// api keys 
var ytKey = 'AIzaSyAhHaPvriyLo4xcteaMEhm26w-riNA5URo';
var spoonKey = '1d2e11daf1094abfb02b3314c1211e45';
var ytUrl = 'https://youtube.googleapis.com/youtube/v3/';
var apiURL = "https://api.spoonacular.com/recipes/findByIngredients?";


function getIngredient() {
  var ingredient = submitEl.value;
  ingredientArray.push(ingredient);
  var additionalIng = document.createElement('li');
  additionalIng.textContent = ingredient;
  listEl.appendChild(additionalIng);
}

function fetchRecipes() {
  var ingredientInput = ingredientArray[0];
  for(let i = 1; i < ingredientArray.length; i++){
    ingredientArray[i].toLowerCase();
    ingreidentInput = `${ingreidentInput},+${ingreidentArray[i]}`;
  }
  apiURl = `${baseApiUrls}/findbyIngredient?ingredients=${ingredientInput}`;
  console.log(apiUrl);
}

addButtonEl.addEventListener('click', getIngredient);
submitButtonEl.addEventListener('click', fetchRecipes);
// psudeo code 

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
