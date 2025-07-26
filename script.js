let lightTheme = document.body.classList.contains("light");
const themeBtn = document.getElementById("theme-btn");
const itemForm = document.getElementById("item-form");
const formInput = document.getElementById("form-input");
const epmtyInputError = document.getElementById("epmty-input-error");
const itemsList = document.getElementById("items-list");
const clearBtn = document.getElementById("clear-btn");
const filterItem = document.getElementById("filter-item");

// Current Status Date , Time , Theme & checkUI
(function currentStatus() {
  // Current Theme
  if (localStorage.getItem("Light Theme") === "true") {
    // If Light Theme Existed on Local Stroge & Value is True Run It
    themeBtn.innerText = "☀️";
    document.body.classList.replace("dark", "light"); // Replace Body Class
    lightTheme = true;
  } else if (localStorage.getItem("Light Theme") === "false") {
    // Else If Light Theme Existed on Local Stroge & Value is False Run It
    themeBtn.innerText = "🌙";
    document.body.classList.replace("light", "dark"); // Replace Body Class
    lightTheme = false;
  }

  // Current Clock & Date
  setInterval(() => {
    document.getElementById("clock").innerText =
      new Date().toLocaleTimeString();
  }, 1000);
  document.getElementById("date").innerText = new Date().toLocaleDateString();

  // Run Check UI Function
  checkUI();
})();

// Change Theme Function
function toggleTheme() {
  if (lightTheme) {
    // If Light Theme is True Run It
    themeBtn.innerText = "🌙";
    document.body.classList.replace("light", "dark"); // Replace Body Class
    lightTheme = false;
  } else {
    // If Light Theme is False Run It
    themeBtn.innerText = "☀️";
    document.body.classList.replace("dark", "light"); // Replace Body Class
    lightTheme = true;
  }
  localStorage.setItem("Light Theme", `${lightTheme}`); // Add Light Theme Status to Local Stroge
}

// Display Items Function
function displayItems() {
  const itemFromLocalStorage = getItemFromLocalStorage();
  itemFromLocalStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

// Add Item Function
function addItem(e) {
  e.preventDefault(); // Change Default Button Click // Don't Refresh Page
  const newItem = formInput.value; // Get Input Value
  if (newItem === "") {
    epmtyInputError.classList.add("show-error"); // Add Class For Showing Empty Error
    return;
  } else {
    epmtyInputError.classList.remove("show-error"); // Remove Class For Showing Empty Error
  }
  addItemToDOM(newItem);
  addItemToLocalStorage(newItem);
  formInput.value = ""; // Set Empty Value For Input
  checkUI(); // Run Check UI Function
}

// Add Item To DOM Function
function addItemToDOM(item) {
  const li = document.createElement("li"); // Create li Element
  const span = document.createElement("span"); // Create span Element
  const div = document.createElement("div"); // Create div Element
  span.innerText = item; // Set newItem Value to span Element
  div.classList.add("remove-icon"); // Added Class to div Element
  li.classList.add("list-item"); // Added Class to li Element
  li.appendChild(span); // Append Child span Element to li Element
  li.appendChild(div); // Append Child div Element to li Element
  itemsList.appendChild(li); // Append li To ul For a Child
}

// Add Item To Local Storage Function
function addItemToLocalStorage(item) {
  const itemFromLocalStorage = getItemFromLocalStorage();
  itemFromLocalStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemFromLocalStorage));
}

function getItemFromLocalStorage() {
  let itemFromLocalStorage;
  if (localStorage.getItem("items") === null) {
    itemFromLocalStorage = [];
  } else {
    itemFromLocalStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemFromLocalStorage;
}

// On Click Action Function
function onClickItem(e) {
  const clickedItem = e.target; // Get Clicked Target
  if (clickedItem.classList.contains("remove-icon")) {
    // If Item Clicked Hace remove-icon Class Run It
    clickedItem.parentElement.remove(); // Remove Click Target Parent Element
  }
  checkUI(); // Run Check UI Function
}

// Clear Items Function
function clearItems() {
  itemsList.innerHTML = ""; // Set Empty innerHTML for Ul
  checkUI(); // Run Check UI Function
}

// Filret Items Function
function filretItems(e) {
  const items = itemsList.querySelectorAll("li span"); // Get span Tag From li In ul
  const inputText = e.target.value.toLowerCase(); // Get Lower Case Target Value

  // For E ach on span Tag List
  items.forEach((item) => {
    const itemName = item.textContent.toLowerCase(); // Get Text Content of span
    if (itemName.indexOf(inputText) !== -1) {
      // If IndexOf InputText Not Equal -1 Run It Thats Mean inputText Existed In span Text Cntent
      item.parentElement.style.display = "flex"; // Set Display Flex For Include Item
    } else {
      item.parentElement.style.display = "none"; // Set Display None For Not Include Item
    }
  });
}

// Check UI Function
function checkUI() {
  const items = itemsList.querySelectorAll("li"); // Get li Tags in ul
  if (items.length === 0) {
    // If Items Lenght Equal 0 Run It
    clearBtn.style.display = "none"; // Set Display none For Clear Button
    filterItem.style.display = "none"; // Set Display none For Filter Item Input
  } else {
    // If Items Lenght Not Equal 0 Run It
    clearBtn.style.display = "block"; // Set Display Block For Clear Button
    filterItem.style.display = "block"; // Set Display Block For Filter Item Input
  }
}

// Event Listeners
themeBtn.addEventListener("click", toggleTheme); // Add Click Event Listener to Theme Button
itemForm.addEventListener("submit", addItem); // Add Submit Event Listener to Add Item Form
itemsList.addEventListener("click", onClickItem); // Add Click Event Listener to ul
clearBtn.addEventListener("click", clearItems); // Add Click Event Listener to Clear Button
filterItem.addEventListener("input", filretItems); // Add input Event Listener to Filter Input
document.addEventListener("DOMContentLoaded", displayItems); // Add DOMContentLoaded Event Listener to document
