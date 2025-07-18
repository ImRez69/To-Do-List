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

function itemAction() {
  // Items From Local Storage
  let localStorageItemsArray = [];
  let localStorageItems = [];
  if (localStorage.getItem("items") === null) {
  } else {
    localStorageItemsArray = JSON.parse(localStorage.getItem("items"));
    localStorageItems = localStorageItemsArray;
    if (localStorageItemsArray.length > 0) {
      for (let i = 0; i < localStorageItemsArray.length; i++) {
        const li = document.createElement("li");
        li.classList.add("list-item");

        const span = document.createElement("span");
        span.innerText = localStorageItemsArray[i];
        li.appendChild(span);

        const div = document.createElement("div");
        div.classList.add("remove-icon");
        div.addEventListener("click", (e) => e.target.parentElement.remove());
        li.appendChild(div);

        const itemsList = document.getElementById("items-list");
        itemsList.appendChild(li);
      }
    }
  }

  // Add Item
  const itemForm = document.getElementById("item-form");
  const formInput = document.getElementById("form-input");
  const addItem = (e) => {
    e.preventDefault();
    const newItem = formInput.value;

    // Empty Input Check
    if (newItem.trim() == "") {
      document.getElementById("epmty-input-error").classList.add("show-error");
      return;
    } else {
      document
        .getElementById("epmty-input-error")
        .classList.remove("show-error");
    }

    // Search Function
    const ItemSearch = (ItemSearch) => {
      const items = Array.from(document.querySelectorAll("li span")).map(
        (item) => item.innerText.toLowerCase()
      );
      const ItemFind = items.find((item) => item === ItemSearch.toLowerCase());
      return ItemFind;
    };

    // Duplicate Check
    if (ItemSearch(newItem)) {
      document.getElementById("duplicate-error").classList.add("show-error");
      return;
    } else {
      document.getElementById("duplicate-error").classList.remove("show-error");
    }

    const li = document.createElement("li");
    li.classList.add("list-item");

    const span = document.createElement("span");
    span.innerText = newItem;
    span.addEventListener("click", changeItem);
    li.appendChild(span);

    const div = document.createElement("div");
    div.classList.add("remove-icon");
    div.addEventListener("click", (e) => {
      e.target.parentElement.remove();

      // Remove Item From Local Storage & Update Local Storage
      const targetValue =
        e.target.parentElement.querySelector("span").innerText;
      const targetValueFind = localStorageItems.find(
        (value) => value === targetValue
      );
      const itemIndex = localStorageItems.indexOf(targetValueFind);
      localStorageItems.splice(itemIndex, 1);
      localStorage.setItem("items", JSON.stringify(localStorageItems));
    });

    li.appendChild(div);
    const itemsList = document.getElementById("items-list");
    itemsList.appendChild(li);
    formInput.value = "";

    // Add Item to Local Storage
    localStorageItems.push(newItem);
    localStorage.setItem("items", JSON.stringify(localStorageItems));

    checkUi();
  };
  itemForm.addEventListener("submit", addItem);

  // Remove Item
  document.querySelectorAll(".remove-icon").forEach((icon) =>
    icon.addEventListener("click", (e) => {
      checkUi();
      e.target.parentElement.remove();

      // Remove Item From Local Storage & Update Local Storage
      const targetValue =
        e.target.parentElement.querySelector("span").innerText;
      const targetValueFind = localStorageItems.find(
        (value) => value === targetValue
      );
      const itemIndex = localStorageItems.indexOf(targetValueFind);
      localStorageItems.splice(itemIndex, 1);
      localStorage.setItem("items", JSON.stringify(localStorageItems));
    })
  );

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

    // Change Item From Local Storage & Update Local Storage
    const targetValue = e.target.innerText;
    const targetValueFind = localStorageItems.find(
      (value) => value === targetValue
    );
    const itemIndex = localStorageItems.indexOf(targetValueFind);
    localStorageItems.splice(itemIndex, 1);

    const changeItemMode = (e) => {
      e.preventDefault();

      // Empty Input Check
      if (formInput.value.trim() == "") {
        document
          .getElementById("epmty-input-error")
          .classList.add("show-error");
        return;
      } else {
        document
          .getElementById("epmty-input-error")
          .classList.remove("show-error");
      }
      // Search Function
      const ItemSearch = (ItemSearch) => {
        const items = Array.from(document.querySelectorAll("li span")).map(
          (item) => item.innerText.toLowerCase()
        );
        const ItemFind = items.find(
          (item) => item === ItemSearch.toLowerCase()
        );
        return ItemFind;
      };
      // Duplicate Check
      if (ItemSearch(formInput.value)) {
        document.getElementById("duplicate-error").classList.add("show-error");
        return;
      } else {
        document
          .getElementById("duplicate-error")
          .classList.remove("show-error");
      }

      document
        .querySelectorAll("li")
        .forEach((li) => li.classList.remove("edit-mode"));
      document.getElementById("filter-item").classList.remove("edit-mode");
      document.getElementById("clear-btn").classList.remove("edit-mode");

      updateBtn.classList.add("update-item");
      updateBtn.style.backgroundColor = "#779eb9";
      updateBtn.innerHTML = addBtnInnerHTML;
      itemClicked.innerText = formInput.value;

      // Change Local Storage
      localStorageItems.splice(itemIndex, 0, formInput.value);
      localStorage.setItem("items", JSON.stringify(localStorageItems));

      formInput.value = "";
      document
        .getElementById("add-item-btn")
        .removeEventListener("click", changeItemMode);
      itemForm.addEventListener("submit", addItem);
    };

    itemForm.removeEventListener("submit", addItem);
    document
      .getElementById("add-item-btn")
      .addEventListener("click", changeItemMode);
  };
  document
    .querySelectorAll("li span")
    .forEach((icon) => icon.addEventListener("click", changeItem));

  //  --------------------------------------

  // Filter Item

  document.getElementById("filter-item").addEventListener("input", (e) => {
    const itemsList = document.getElementById("items-list");
    const items = itemsList.querySelectorAll("li");
    const inputEntry = e.target.value.toLowerCase();

    items.forEach((item) => {
      const itemText = item.firstChild.textContent.toLowerCase();
      if (itemText.indexOf(inputEntry) !== -1) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

  // Clear All
  document.getElementById("clear-btn").addEventListener("click", () => {
    document.querySelectorAll("li").forEach((li) => li.remove());
    localStorage.removeItem("items");
    localStorageItems = [];
    checkUi();
  });

  checkUi();
}

itemAction();
