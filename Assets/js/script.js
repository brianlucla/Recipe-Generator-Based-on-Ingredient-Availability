// pseudo code

// 1. take in user input store into an array
var submitEl = document.getElementById("recipe-input");
var addButtonEl = document.getElementById("add-button");
var listEl = document.getElementById("ingredient-list");
var submitButtonEl = document.getElementById("submit-button");
var tableContEl = document.getElementById("table-cont");

var ingredientArray = [];
var recipeIDArray = [];
var recipeNameArray = [];

//api keys and variables
var apiKeyS = "afdf8f2bf9664ccc8956b99769aa5a3d";
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
  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data, "fetch recipe data");
      for (let i = 0; i < data.length; i++) {
        recipeIDArray.push(data[i].id);
        recipeNameArray.push(data[i].title);
      }
      setTimeout(fetchRecipeInstructions, 3000, recipeIDArray);
    });
}

function fetchRecipeInstructions(array) {
  var instructionsArray = [];
  for (let i = 0; i < array.length; i++) {
    var apiUrlTemp = `${baseApiUrlS}/${array[i]}/analyzedInstructions?apiKey=${apiKeyS}`;
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
  console.log(instructionsArray);
  setTimeout(createRecipeTable, 3000, instructionsArray);
}

var createRecipeTable = function (array) {
  console.log(array.length);
  for (let i = 0; i < array.length; i++) {
    // create html elements

    var tableRowEl = document.createElement("tr");
    var ingredListContEl = document.createElement("td");
    var recipeNameContEl = document.createElement("td");
    var recipeInstructionsEl = document.createElement("td");
    var videoContainerEl = document.createElement("td");
    var ingredListEl = document.createElement("ul");
    var instructListEl = document.createElement("ol");
    var recipeNameEl = document.createElement("strong");

    var instructionHolder = array[i];

    //append to parents
    tableContEl.appendChild(tableRowEl);
    tableRowEl.appendChild(recipeNameContEl);
    tableRowEl.appendChild(ingredListContEl);
    tableRowEl.appendChild(recipeInstructionsEl);
    tableRowEl.appendChild(videoContainerEl);
    ingredListContEl.appendChild(ingredListEl);
    recipeNameContEl.appendChild(recipeNameEl);
    recipeInstructionsEl.appendChild(instructListEl);

    //ingredients array that resets after every recipe
    var recipeIngArray = [];

    // set text content
    recipeNameEl.textContent = recipeNameArray[i];

    for (let j = 0; j < instructionHolder.length; j++) {
      var instructBullet = document.createElement("li");
      instructBullet.textContent = instructionHolder[j].step;
      instructListEl.appendChild(instructBullet);

      for (let k = 0; k < instructionHolder[j].ingredients.length; k++) {
        if (
          recipeIngArray.includes(instructionHolder[j].ingredients[k].name) ===
          false
        ) {
          var ingredBulletEl = document.createElement("li");
          ingredBulletEl.textContent = instructionHolder[j].ingredients[k].name;
          ingredListEl.appendChild(ingredBulletEl);
          recipeIngArray.push(instructionHolder[j].ingredients[k].name);
        } else {
          continue;
        }
      }
    }
  }
};

// fetch youtube video

function fetchYoutubeVid() {}

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
