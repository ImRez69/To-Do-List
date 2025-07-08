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

    const ItemSearch = (ItemSearch) => {
      const items = Array.from(document.querySelectorAll("li span")).map(
        (item) => item.innerText
      );
      const ItemFind = items.find((item) => item === ItemSearch);
      return ItemFind;
    };

    if (ItemSearch(newItem)) {
      console.log("Item Existed");
      document.getElementById("duplicate-error").classList.add("show-error");
      return;
    } else {
      console.log("Item Not Existed");
      document.getElementById("duplicate-error").classList.remove("show-error");
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
  document.querySelectorAll(".remove-icon").forEach((icon) =>icon.addEventListener("click", (e) => e.target.parentElement.remove()));

  // Change Item
  const changeItem = (e) => {
    const itemClicked = e.target;
    document
      .querySelectorAll("li")
      .forEach((li) => li.classList.add("edit-mode"));
    document.getElementById("filter-item").classList.add("edit-mode");
    document.getElementById("clear-btn").classList.add("edit-mode");

    const updateBtn = document.getElementById("add-item-btn");
    const addBtnInnerHTML = updateBtn.innerHTML;
    updateBtn.style.backgroundColor = "#779eb9";
    updateBtn.innerText = "✏️ Update";

    const formInput = document.getElementById("form-input");
    formInput.value = itemClicked.innerText;
    formInput.focus();

    itemForm.removeEventListener("submit", addItem);

    document.getElementById("add-item-btn").addEventListener(
      "click",
      (e) => {
        e.preventDefault();

        document
          .querySelectorAll("li")
          .forEach((li) => li.classList.remove("edit-mode"));
        document.getElementById("filter-item").classList.remove("edit-mode");
        document.getElementById("clear-btn").classList.remove("edit-mode");

        updateBtn.classList.add("update-item");
        updateBtn.style.backgroundColor = "#779eb9";
        updateBtn.innerHTML = addBtnInnerHTML;
        itemClicked.innerText = formInput.value;

        formInput.value = "";
      },
      { once: true }
    );

    itemForm.addEventListener("submit", addItem);

    //   const addItem = (e) => {
    //   e.preventDefault();
    //   const newItem = formInput.value;
    // };
  };
  document.querySelectorAll("li span").forEach((icon) => icon.addEventListener("click", changeItem));

  // Filter Item
  const filterInput = document.getElementById("filter-item")
  const filterItem = filterInput.value;
  const ItemSearch = (e) => {
      const items = Array.from(document.querySelectorAll("li span")).map(
        (item) => item.innerText
      );
      const ItemFind = items.find((item) => item === e.terget.entries());
      console.log(e.target.entries());
      
      // return ItemFind;
  };

  filterInput.addEventListener("keypress",ItemSearch)

  // Clear All
  // const clearAll = document.getElementById("clear-btn");
  // clearAll.addEventListener("click");
}
itemAction();
