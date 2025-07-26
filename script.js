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
  itemsList.appendChild(createItem(newItem)); // Append li return From createItem Function To ul For a Child
  formInput.value = ""; // Set Empty Value For Input
  checkUI(); // Run Check UI Function
}

// Add Item Function
function createItem(newItemValue) {
  const li = document.createElement("li"); // Create li Element
  const span = document.createElement("span"); // Create span Element
  const div = document.createElement("div"); // Create div Element
  span.innerText = newItemValue; // Set newItem Value to span Element
  div.classList.add("remove-icon"); // Added Class to div Element
  li.classList.add("list-item"); // Added Class to li Element
  li.appendChild(span); // Append Child span Element to li Element
  li.appendChild(div); // Append Child div Element to li Element
  return li; // return li Element
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

// Check UI Function
function checkUI() {
  const items = itemsList.querySelectorAll("li"); // Get li Tags in ul
  if (items.length === 0) {
    // If Items Lenght Equal 0 Run It
    clearBtn.style.display = "none"; // Set Display none For Clear Button
    filterItem.style.display = "none"; // Set Display none For Filter Item Input
  } else {
    // If Items Lenght Not Equal 0 Run It
    clearBtn.style.display = ""; // Remove Display Property For Clear Button
    filterItem.style.display = ""; // Remove Display Property For Filter Item Input
  }
}

// Event Listeners
themeBtn.addEventListener("click", toggleTheme); // Add Click Event Listener to Theme Button
itemForm.addEventListener("submit", addItem); // Add Submit Event Listener to Add Item Form
itemsList.addEventListener("click", onClickItem); // Add Click Event Listener to ul
clearBtn.addEventListener("click", clearItems); // Add Click Event Listener to Clear Button
