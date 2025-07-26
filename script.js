let lightTheme = document.body.classList.contains("light");
const themeBtn = document.getElementById("theme-btn");
const itemForm = document.getElementById("item-form");
const formInput = document.getElementById("form-input");
const epmtyInputError = document.getElementById("epmty-input-error");
const itemsList = document.getElementById("items-list");
const clearBtn = document.getElementById("clear-btn");
const filterItem = document.getElementById("filter-item");

(function currentStatus() {
  // Current Theme
  if (localStorage.getItem("Light Theme") === "true") {
    themeBtn.innerText = "☀️";
    document.body.classList.replace("dark", "light");
    lightTheme = true;
  } else if (localStorage.getItem("Light Theme") === "false") {
    themeBtn.innerText = "🌙";
    document.body.classList.replace("light", "dark");
    lightTheme = false;
  }

  // Current Clock & Date
  setInterval(() => {
    document.getElementById("clock").innerText = new Date().toLocaleTimeString();
  }, 1000);
  document.getElementById("date").innerText = new Date().toLocaleDateString();
})();

function toggleTheme() {
  if (lightTheme) {
    themeBtn.innerText = "🌙";
    document.body.classList.replace("light", "dark");
    lightTheme = false;
  } else {
    themeBtn.innerText = "☀️";
    document.body.classList.replace("dark", "light");
    lightTheme = true;
  }
  localStorage.setItem("Light Theme", `${lightTheme}`);
}

function addItem(e) {
  e.preventDefault();
  const newItem = formInput.value;
  if (newItem === "") {
    epmtyInputError.classList.add("show-error");
    return;
  } else {
    epmtyInputError.classList.remove("show-error");
  }
  itemsList.appendChild(createItem(newItem));
  formInput.value = "";
  checkUI()
}

function createItem(newItemValue){
  const li = document.createElement("li")
  const span = document.createElement("span")
  const div = document.createElement("div")
  span.innerText = newItemValue;
  div.classList.add("remove-icon");
  li.classList.add("list-item");
  li.appendChild(span)
  li.appendChild(div)
  return li;  
}

function onClickItem(e){
  const clickedItem = e.target;
  if(clickedItem.classList.contains("remove-icon")){
    clickedItem.parentElement.remove()
  }
checkUI()
}

function clearItems(){
itemsList.innerHTML = "";
checkUI()
}

function checkUI() {
  const items = document.querySelectorAll("li")
  if (items.length === 0) {
    clearBtn.style.display = "none";
    filterItem.style.display = "none";
  } else {
    clearBtn.style.display = "";
    filterItem.style.display = "";
  }
}

// Event Listeners
themeBtn.addEventListener("click", toggleTheme);
itemForm.addEventListener("submit", addItem);
itemsList.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", clearItems);
checkUI()