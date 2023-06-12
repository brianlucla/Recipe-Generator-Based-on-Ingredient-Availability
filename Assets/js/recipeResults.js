var customTableContEl = document.getElementById("customTable");
function printRecipe() {
  var LocalStorageArr =
    JSON.parse(window.localStorage.getItem("recipes")) || [];


  for (let i = 0; i < LocalStorageArr.length; i++) {
    // create html elements
    var tableContEl = document.getElementById("table-cont");
    var tableRowEl = document.createElement("tr");
    var ingredListContEl = document.createElement("td");
    var recipeNameContEl = document.createElement("td");
    var recipeInstructionsEl = document.createElement("td");
    var videoContainerEl = document.createElement("td");
    var ingredListEl = document.createElement("ul");
    var instructListEl = document.createElement("ol");
    var recipeNameEl = document.createElement("strong");

    //append to parents
    tableContEl.appendChild(tableRowEl);
    tableRowEl.appendChild(recipeNameContEl);
    tableRowEl.appendChild(ingredListContEl);
    tableRowEl.appendChild(recipeInstructionsEl);
    tableRowEl.appendChild(videoContainerEl);
    ingredListContEl.appendChild(ingredListEl);
    recipeNameContEl.appendChild(recipeNameEl);
    recipeInstructionsEl.appendChild(instructListEl);

    // set text content
    recipeNameEl.textContent = LocalStorageArr[i].name;

    for (let j = 0; j < LocalStorageArr[i].instruct.length; j++) {
      var instructBullet = document.createElement("li");
      instructBullet.textContent = LocalStorageArr[i].instruct[j].step;
      instructListEl.appendChild(instructBullet);

      var ingredBulletEl = document.createElement("li");
      ingredBulletEl.textContent = LocalStorageArr[i].ing[j];
      ingredListEl.appendChild(ingredBulletEl);
    }
  }
}

function printVideo() {
  var localStorageArr =
    JSON.parse(window.localStorage.getItem("videos")) || [];

    var tableRows = document.getElementsByTagName("tr");

  for (let i = 0; i < localStorageArr.length; i++) {
    var videoPartEl = document.createElement("div");
    var videoContainerEl = document.createElement("td");
    tableRows[i].appendChild(videoContainerEl);

    videoPartEl.innerHTML = `<iframe width="300" height="150" margin=0 auto src="https://www.youtube.com/embed/${localStorageArr[i].id}"></iframe>`;
    //<h3>${localStorageArr[i].title}</h3>`;

    videoContainerEl.appendChild(videoPartEl);
  }
}

function clearRecipe() {
  window.localStorage.removeItem("recipes");
  window.location.reload();
}

document.getElementById("clear").onclick = clearRecipe;
printRecipe();
printVideo();
