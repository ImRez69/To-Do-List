const themeBtn = document.getElementById("theme-btn");
let lightTheme = document.body.classList.contains("light");

(function currentTheme() {
  if (localStorage.getItem("Light Theme") === "true") {
    themeBtn.innerText = "☀️";
    document.body.classList.replace("dark", "light");
    lightTheme = true;
  } else if (localStorage.getItem("Light Theme") === "false") {
    themeBtn.innerText = "🌙";
    document.body.classList.replace("light", "dark");
    lightTheme = false;
  }
})();

themeBtn.addEventListener("click", toggleTheme = () => {
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
});
