const themeBtn = document.getElementById("theme-btn");
let lightTheme = document.body.classList.contains("light");
const toggleTheme = () => {
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
themeBtn.addEventListener("click", toggleTheme);

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

function checkUi() {
  if (document.querySelectorAll("ul li span").length <= 0) {
    document.getElementById("clear-btn").style.display = "none";
    document.getElementById("filter-item").style.display = "none";
  } else {
    document.getElementById("clear-btn").style.display = "";
    document.getElementById("filter-item").style.display = "";
  }
}
