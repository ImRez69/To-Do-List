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
    if (newItem === "") {
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
    div.addEventListener("click", (e) => e.target.parentElement.remove());
    li.appendChild(div);

    const itemsList = document.getElementById("items-list");
    itemsList.appendChild(li);

    formInput.value = "";

    // Add Item to Local Storage
    localStorageItems.push(newItem);
    localStorage.setItem("items", JSON.stringify(localStorageItems));
  };
  itemForm.addEventListener("submit", addItem);

  // Remove Item
  document.querySelectorAll(".remove-icon").forEach((icon) =>
    icon.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      const targetValue =
        e.target.parentElement.querySelector("span").innerText;
      const targetValueFind = localStorageItems.find(
        (value) => value === targetValue
      );

      // Remove Item From Local Storage & Update Local Storage
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

        // Change Local Storage
        localStorageItems.splice(itemIndex, 0, formInput.value);
        localStorage.setItem("items", JSON.stringify(localStorageItems));

        formInput.value = "";
      },
      { once: true }
    );

    itemForm.addEventListener("submit", addItem);
  };
  document
    .querySelectorAll("li span")
    .forEach((icon) => icon.addEventListener("click", changeItem));

  //  --------------------------------------

  // Filter Item
  const filterItem = document.getElementById("filter-item");
  const ItemSearch = (e) => {
    const formData = new FormData(form);
    const filterInputEntries = formData.get("filter-input");
    console.log(filterInputEntries);
    const items = Array.from(document.querySelectorAll("li span")).map((item) => item.innerText.toLowerCase());
    console.log(items.includes(filterInputEntries.toLowerCase()));
    
    if(items.includes(filterInputEntries.toLowerCase())){
      console.log( items.find( (item) => item == filterInputEntries.toLowerCase() )); 
    }

    // for (let i = 0; i < items.length; i++) {
    //   const item = items[i];
    //   for (let letter = 0; letter < item.length; letter++) {
    //     const itemLetter = item[letter];
    //     console.log(itemLetter);
    //   }
    // }
  };

  filterItem.addEventListener("input", ItemSearch);

  //  --------------------------------------

  // Clear All
  document.getElementById("clear-btn").addEventListener("click", () => {
    document.querySelectorAll("li").forEach((li) => li.remove());
    localStorage.removeItem("items");
  });
}

itemAction();
