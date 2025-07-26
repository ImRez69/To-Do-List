let lightTheme = document.body.classList.contains("light");
const themeBtn = document.getElementById("theme-btn");
const itemForm = document.getElementById("item-form");
const addItemBtn = document.getElementById("add-item-btn");

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
    document.getElementById("clock").innerText =
      new Date().toLocaleTimeString();
  }, 1000);
  document.getElementById("date").innerText = new Date().toLocaleDateString();
})();

function toggleTheme(){
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
};

function addItem(e){
  e.preventDefault()
}

// function checkUi() {
//   if (document.querySelectorAll("ul li span").length <= 0) {
//     document.getElementById("clear-btn").style.display = "none";
//     document.getElementById("filter-item").style.display = "none";
//   } else {
//     document.getElementById("clear-btn").style.display = "";
//     document.getElementById("filter-item").style.display = "";
//   }
// }

// Event Listeners
themeBtn.addEventListener("click", toggleTheme);
itemForm.addEventListener("submit", addItem);