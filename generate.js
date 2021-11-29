function createIcon(iconType, icon) {
  let iconElem;
  if (iconType == "text") {
    iconElem = document.createElement("h1");
    iconElem.innerText = icon;
  }
  else {
    iconElem = document.createElement("img");
    iconElem.src = icon;
  }

  iconElem.classList.add("icon");
  iconElem.onclick = () => {
    clicked(iconElem);
  };
  return iconElem;
}

function createElement(id, x, y, url, iconType, icon) {
  let div = document.createElement("div");
  div.style.position = "absolute";

  if (x == "" || y == "") {
    div.style.left = "80%";
    div.style.top = "0";
  }
  else {
    div.style.left = x;
    div.style.top = y;
  }

  div.dataset.id = id;
  div.dataset.url = url;

  let iconElem = createIcon(iconType, icon);
  div.appendChild(iconElem);
  document.body.appendChild(div);

  return div;
}
