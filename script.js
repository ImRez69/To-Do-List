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
  // Add Item
  const itemForm = document.getElementById("item-form");
  const formInput = document.getElementById("form-input");
  const addItem = (e) => {
    e.preventDefault();
    const newItem = formInput.value;
    if (newItem === "") {
      document.getElementById("epmty-input-error").classList.add("show-error");
      return;
    } else {
      document
        .getElementById("epmty-input-error")
        .classList.remove("show-error");
    }

    const li = document.createElement("li");
    li.classList.add("list-item");

    const span = document.createElement("span");
    span.innerText = newItem;
    li.appendChild(span);

    const div = document.createElement("div");
    div.classList.add("remove-icon");
    div.addEventListener("click", (e) => e.target.parentElement.remove());
    li.appendChild(div);

    const itemsList = document.getElementById("items-list");
    itemsList.appendChild(li);
  };
  itemForm.addEventListener("submit", addItem);

  // Remove Item
    document.querySelectorAll(".remove-icon").forEach((icon) => icon.addEventListener("click", (e) => e.target.parentElement.remove()));
}
itemAction();

// const test = ["ali","arash","mehdi","mamad"]
// localStorage.setItem("names",JSON.stringify(test));
