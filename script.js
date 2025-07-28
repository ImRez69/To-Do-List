let lightTheme = document.body.classList.contains("light");
const themeBtn = document.getElementById("theme-btn");
const itemForm = document.getElementById("item-form");
const formInput = document.getElementById("form-input");
const epmtyInputError = document.getElementById("epmty-input-error");
const duplicateError = document.getElementById("duplicate-error");
const itemsList = document.getElementById("items-list");
const clearBtn = document.getElementById("clear-btn");
const filterItem = document.getElementById("filter-item");
const addItemBtn = document.getElementById("add-item-btn");
const errors = document.querySelectorAll(".error");
let isEditMode = false;

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
  const itemsFromLocalStorage = getItemFromLocalStorage(); // Set Value From Return Value From Function
  itemsFromLocalStorage.forEach((item) => addItemToDOM(item)); // Add Items in Local Storage to DOM
  checkUI(); // Run Check UI Function
}

// Add Item Function
function addItem(e) {
  e.preventDefault(); // Change Default Button Click // Don't Refresh Page
  const newItem = formInput.value; // Get Input Value
  if (validationCheck(newItem)) {
    // Validation Check Function Run It & If Return a Value Run It This Block
    return;
  } else {
    // If Input Value Is Not Exiested & Not Empty Run It
    errors.forEach((error) => error.classList.remove("show-error"));
  }

  // Edit Mode Action
  if (isEditMode) {
    itemForm.addEventListener("submit", addItem); // Add Submit Event Listener to Add Item Form
    const itemToEdit = itemsList.querySelector(".edit-mode");
    removeFromLoaclStorage(itemToEdit.textContent); // Remove Item From Local Storage
    itemToEdit.remove(); // Remvoe Item From DOM
    const plusIcon = `<svg class="icon" id="add-item-btn-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero" /> </svg>`; // Plus Icon SV
    itemToEdit.classList.remove("edit-mode"); // Add Edite Mode Class to Target li
    addItemBtn.innerHTML = `${plusIcon} Add Item`; // Change Inner HTML To Add Item Mode
    addItemBtn.classList.remove("edit-mode"); // Add Edit Mode Class To Button
    isEditMode = false; // Set Is Edit Mode Let To False
  }

  addItemToDOM(newItem); // Run Add Item To DOM Function
  addItemToLocalStorage(newItem); // Run Add Item To Local Storage Function
  formInput.value = ""; // Set Empty Value For Input
  checkUI(); // Run Check UI Function
}
// Validatin Ckeck Function
function validationCheck(newItem) {
  switch (true) {
    // Run Always
    case newItem === "" || newItem.trim() === "":
      // If Input Value Is Empty Run It
      errors.forEach((error) => error.classList.remove("show-error")); // Remove All show-error Class From errors
      epmtyInputError.classList.add("show-error"); // Add Class For Showing Duplicate Error
      return true; // Return newItem & Break Function

    case checkItemExisted(newItem) === true:
      // If Input Value Is Existed Run It
      errors.forEach((error) => error.classList.remove("show-error")); // Remove All show-error Class From errors
      duplicateError.classList.add("show-error"); // Add Class For Showing Duplicate Error
      return true; // Return newItem & Break Function

    default:
      return false;
  }
}

// Check Existed Item Function
function checkItemExisted(item) {
  const itemsFromLocalStorage = getItemFromLocalStorage(); // Set Value From Local Storage Function

  // let itemInCheck = item;
  // if(itemInCheck[0] === " "){
  //   console.log("test");
  //   console.log(itemInCheck[0]);
  // }

  return itemsFromLocalStorage.includes(item); // Return True or Fars & Break Function
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
  const itemsFromLocalStorage = getItemFromLocalStorage(); // Set Value From Return Value From Function
  itemsFromLocalStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromLocalStorage));
}

// Get Item From Local Storage Function
function getItemFromLocalStorage() {
  let itemsFromLocalStorage;
  if (localStorage.getItem("items") === null) {
    // If Local Storage Is Empty Run It
    itemsFromLocalStorage = []; // Set a Empty Array For Value
  } else {
    // If Local Storage Is Not Empty Run It
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items")); // Set Value From Local Storage Item
  }
  return itemsFromLocalStorage; // Return Items In Local Storage & Break Function
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
  let itemsFromLocalStorage = getItemFromLocalStorage(); // Set Value From Return Value From Function
  itemsFromLocalStorage = itemsFromLocalStorage.filter((i) => i !== item); // Remove Item Equal to Item Clicked Text Content
  localStorage.setItem("items", JSON.stringify(itemsFromLocalStorage)); // Set & Update Items In Local Storage
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
  isEditMode = true;
  itemsList
    .querySelectorAll("li")
    .forEach((item) => item.classList.remove("edit-mode")); // Remove Edit Mode Class For All li In ul
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
