const themeBtn = document.getElementById("theme-btn");
let lightTheme = document.body.classList.contains("light");
themeBtn.addEventListener(
  "click",
  (toggleTheme = () => {
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
  })
);

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

function itemAction() {
  const itemForm = document.getElementById("item-form");
  const formInput = document.getElementById("form-input");
  const addItem = (e) => {
    e.preventDefault();
    const newItem = formInput.value;
    if (newItem === "") {
      document.getElementById("epmty-input-error").classList.add("show-error")
      return
    }
    else{
      document.getElementById("epmty-input-error").classList.remove("show-error")
    }

    const li = document.createElement("li");
    li.classList.add("list-item");

    const span = document.createElement("span");
    span.innerText = newItem;
    li.appendChild(span);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("icon");
    svg.classList.add("add-icon");
    svg.setAttribute("clip-rule", "evenodd");
    svg.setAttribute("fill-rule", "evenodd");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("stroke-miterlimit", "2");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.innerHTML =
      '<path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/>';
    li.appendChild(svg);

    const itemsList = document.getElementById("items-list");
    itemsList.appendChild(li);
  };
  itemForm.addEventListener("submit", addItem);
}
itemAction();
