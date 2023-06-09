var submitEl = document.getElementById("recipe-input");
var addButtonEl = document.getElementById("add-button");
var listEl = document.getElementById("ingredient-list");
var submitButtonEl = document.getElementById("submit-button");
var tableContEl = document.getElementById("table-cont");

var ingredientArray = [];
<<<<<<< HEAD
var recipeIDArray = [];
var recipeNameArray = [];
var youtubeIdArray = [];
var youtubeNameArray = [];

//api keys and variables
var apiKeyS = "afdf8f2bf9664ccc8956b99769aa5a3d";
var baseApiUrlS = "https://api.spoonacular.com/recipes";
var apiKeyY = "AIzaSyCB4Upb_QqH6PLaSdQ4HqzqvS9CpmKiz4c";
var baseApiUrlY = "https://www.googleapis.com/youtube/v3";
=======
var recipeIdArray = [];
 
// api keys 
var ytKey = 'AIzaSyAhHaPvriyLo4xcteaMEhm26w-riNA5URo';
var spoonKey = '1d2e11daf1094abfb02b3314c1211e45';
var ytUrl = 'https://youtube.googleapis.com/youtube/v3/';
var apiURL = "https://api.spoonacular.com/recipes/findByIngredients?";

>>>>>>> 18996e5cd32c09de483105df31af502b4cc77657

//creates list of ingredient user inputs
function getIngredient() {
  var ingredient = submitEl.value;
  ingredientArray.push(ingredient);
  var additionalIng = document.createElement("li");

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

<<<<<<< HEAD
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
      setTimeout(fetchRecipeInstructions, 3000);
    });
}

function fetchRecipeInstructions() {
  var instructionsArray = [];
  for (let i = 0; i < recipeIDArray.length; i++) {
    var apiUrlTemp = `${baseApiUrlS}/${recipeIDArray[i]}/analyzedInstructions?apiKey=${apiKeyS}`;
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
  //console.log(instructionsArray);
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
    //var videoContainerEl = document.createElement("td");
    var ingredListEl = document.createElement("ul");
    var instructListEl = document.createElement("ol");
    var recipeNameEl = document.createElement("strong");

    var instructionHolder = array[i];

    //append to parents
    tableContEl.appendChild(tableRowEl);
    tableRowEl.appendChild(recipeNameContEl);
    tableRowEl.appendChild(ingredListContEl);
    tableRowEl.appendChild(recipeInstructionsEl);
    //tableRowEl.appendChild(videoContainerEl);
    ingredListContEl.appendChild(ingredListEl);
    recipeNameContEl.appendChild(recipeNameEl);
    recipeInstructionsEl.appendChild(instructListEl);

    youtubeVideos(recipeNameArray[i], tableRowEl);

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
    saveToLS(recipeNameEl, recipeIngArray, instructionHolder);
  }
};
function youtubeVideos(recipeName, tableRow) {
  // for (let i = 0; i < recipeIDArray.length; i++)

  var ytApi = `${baseApiUrlY}/search?key=${apiKeyY}&part=snippet&q=${recipeName}recipe&maxResults=1`;

  fetch(ytApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.items && data.items.length > 0) {
        var videoId = data.items[0].id.videoId;
        var videoTitle = data.items[0].snippet.title;
        displayVideo(videoId, videoTitle, tableRow);
      }
    });
}

function displayVideo(videoId, videoTitle, tableRow) {
  console.log("hey");
  var videoPartEl = document.createElement("div");
  var videoContainerEl = document.createElement("td");
  tableRow.appendChild(videoContainerEl);

  videoPartEl.innerHTML = `<iframe width="120" height="120" src="https://www.youtube.com/embed/${videoId}"></iframe>
    <h3>${videoTitle}</h3>`;

  videoContainerEl.appendChild(videoPartEl);
}

function saveToLS(recipename, ingred, inst) {
  if (submitEl !== "") {
    var LocalStorageArr =
      JSON.parse(window.localStorage.getItem("recipes")) || [];

    var newRecipe = {
      name: recipename.textContent,
      ing: ingred,
      instruct: inst,
    };

    LocalStorageArr.push(newRecipe);
    window.localStorage.setItem("recipes", JSON.stringify(LocalStorageArr));
  }
}

//localStorage.removeItem("recipes");

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
=======
// 3. print recipes 
// array of used ingredients --> print to table 
// pass  recipe id's to get analyzed recipe instructions
// iterate thru array of instructions and print to table 
>>>>>>> 18996e5cd32c09de483105df31af502b4cc77657

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
