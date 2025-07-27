let lightTheme = document.body.classList.contains("light");
const themeBtn = document.getElementById("theme-btn");
const itemForm = document.getElementById("item-form");
const formInput = document.getElementById("form-input");
const epmtyInputError = document.getElementById("epmty-input-error");
const itemsList = document.getElementById("items-list");
const clearBtn = document.getElementById("clear-btn");
const filterItem = document.getElementById("filter-item");
const addItemBtn = document.getElementById("add-item-btn");

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
  const itemFromLocalStorage = getItemFromLocalStorage(); // Set Value From Return Value From Function
  itemFromLocalStorage.forEach((item) => addItemToDOM(item)); // Add Items in Local Storage to DOM
  checkUI(); // Run Check UI Function
}

// Add Item Function
function addItem(e) {
  e.preventDefault(); // Change Default Button Click // Don't Refresh Page
  const newItem = formInput.value; // Get Input Value

  // Validation Check
  if (newItem === "") {
    epmtyInputError.classList.add("show-error"); // Add Class For Showing Empty Error
    return;
  } else {
    epmtyInputError.classList.remove("show-error"); // Remove Class For Showing Empty Error
  }
  
  addItemToDOM(newItem); // Run Add Item To DOM Function
  addItemToLocalStorage(newItem); // Run Add Item To Local Storage Function
  formInput.value = ""; // Set Empty Value For Input
  checkUI(); // Run Check UI Function
}

// Add Item To DOM Function
function addItemToDOM(item) {
  const li = document.createElement("li"); // Create li Element
  const div = document.createElement("div"); // Create div Element
  li.innerText = item; // Set newItem Value to li Inner Text Element
  div.classList.add("remove-icon"); // Added Class to div Element
  li.classList.add("list-item"); // Added Class to li Element
  li.appendChild(div); // Append Child div Element to li Element
  itemsList.appendChild(li); // Append li To ul For a Child
}

// Add Item To Local Storage Function
function addItemToLocalStorage(item) {
  const itemFromLocalStorage = getItemFromLocalStorage(); // Set Value From Return Value From Function
  itemFromLocalStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemFromLocalStorage));
}

// Get Item From Local Storage Function
function getItemFromLocalStorage() {
  let itemFromLocalStorage;
  if (localStorage.getItem("items") === null) {
    // If Local Storage Is Empty Run It
    itemFromLocalStorage = []; // Set a Empty Array For Value
  } else {
    // If Local Storage Is Not Empty Run It
    itemFromLocalStorage = JSON.parse(localStorage.getItem("items")); // Set Value From Local Storage Item
  }
  return itemFromLocalStorage;
}

// On Click Action Function
function onClickItem(e) {
  if (e.target.classList.contains("remove-icon")) {
    // If Item Clicked Have remove-icon Class Run It
    removeItem(e.target.parentElement); // Run Remove Item Function
  } else {
    // If Item Clicked Dont Have remove-icon Class Run It
    setItemToEdit(e.target); // Run Set Item To Edit Function
  }
}

// Clear Items Function
function clearItems() {
  itemsList.innerHTML = ""; // Set Empty innerHTML for Ul
  localStorage.removeItem("items"); // Remove Items From Local Storage
  checkUI(); // Run Check UI Function
}

// Remove Item From Local Storage Function
function removeFromLoaclStorage(item) {
  let itemFromLocalStorage = getItemFromLocalStorage(); // Set Value From Return Value From Function
  itemFromLocalStorage = itemFromLocalStorage.filter((i) => i !== item); // Remove Item Equal to Item Clicked Text Content
  localStorage.setItem("items", JSON.stringify(itemFromLocalStorage)); // Set & Update Items In Local Storage
}

// Filret Items Function
function filretItems(e) {
  const items = itemsList.querySelectorAll("li"); // Get li Tag From In ul
  const inputText = e.target.value.toLowerCase(); // Get Lower Case Target Value

  // For Each on li Tag List
  items.forEach((item) => {
    const itemName = item.textContent.toLowerCase(); // Get Text Content of li
    if (itemName.indexOf(inputText) !== -1) {
      // If IndexOf InputText Not Equal -1 Run It Thats Mean inputText Existed In li Text Cntent
      item.style.display = "flex"; // Set Display Flex For Include Item
    } else {
      item.style.display = "none"; // Set Display None For Not Include Item
    }
  });
}

// Remove Item Function
function removeItem(item) {
  item.remove(); // Remove Click Target Parent Element
  removeFromLoaclStorage(item.textContent); // Run Remove Item From Local Storage Function
  checkUI(); // Run Check UI Function
}

// Set Item To Edit Function
function setItemToEdit(item) {
  itemsList.querySelectorAll("li").forEach((item) => item.classList.remove("edit-mode")); // Remove Edit Mode Class For All li In ul
  item.classList.add("edit-mode"); // Add Edite Mode Class to Target li
  formInput.value = item.textContent; // Set List Clicked Text Content to Input Value
  formInput.focus(); // Focus On Input
  addItemBtn.innerHTML = "✏️Update "; // Change Inner HTML To Edit mode
  addItemBtn.classList.add("edit-mode"); // Add Edit Mode Class To Button
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
