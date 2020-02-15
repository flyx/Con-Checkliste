let storedData = localStorage.getItem("data");
if (storedData == null) storedData = "{}";
const stored = JSON.parse(storedData);

function genItem(item) {
  const target = document.getElementById("item").content.cloneNode(true);
  target.querySelector("span").textContent = item;
  const input = target.querySelector("input");
  if (stored.hasOwnProperty(item)) {
    input.checked = stored[item];
  } else {
    stored[item] = false;
  }
  input.dataset.name = item;
  input.addEventListener("input", function() {
    stored[this.dataset.name] = this.checked;
    localStorage.setItem("data", JSON.stringify(stored));
  });
  return target;
}

fetch("items.txt", {method: "GET", cache: "no-store"}).then(async r => {
  const data = await r.text();
  const items = data.match(/[^\r\n]+/g);
  const list = document.querySelector("ul");
  for (const item of items) {
    if (item == "---") {
      const sep = document.createElement("li");
      sep.classList.add("separator");
      list.appendChild(sep);
    } else {
      list.appendChild(genItem(item));
    }
  }
});

document.querySelector("button").addEventListener("click", () => {
  for (const input of document.querySelectorAll("input")) {
    input.checked = false;
    stored[input.dataset.name] = false;
  }
  localStorage.setItem("data", JSON.stringify(stored));
});