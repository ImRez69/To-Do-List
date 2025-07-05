const themeBtn = document.getElementById("theme-btn");
let lightTheme = document.body.classList.contains("light");

if (localStorage.getItem("Light Theme") === "true") {
  themeBtn.innerText = "☀️";
  document.body.classList.replace("dark", "light");
  lightTheme = true;
} else if (localStorage.getItem("Light Theme") === "false") {
  themeBtn.innerText = "🌙";
  document.body.classList.replace("light", "dark");
  lightTheme = false;
}

const toggleTheme = () => {
  if (lightTheme) {
    themeBtn.innerText = "🌙";
    document.body.classList.replace("light", "dark");
    lightTheme = false;
    console.log("lighte theme is true");
  } else {
    themeBtn.innerText = "☀️";
    lightTheme = true;
    document.body.classList.replace("dark", "light");
    console.log("lighte theme is false");
  }
  localStorage.setItem("Light Theme", `${lightTheme}`);
};
themeBtn.addEventListener("click", toggleTheme);
