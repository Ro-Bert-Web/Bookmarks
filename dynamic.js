let cleanUp = document.getElementsByClassName("cleanUp");
for (let i = 0; i < cleanUp.length; i++) {
  cleanUp[i].remove();
}



let options = document.getElementById("menuOptions");

let infoForm = document.getElementById("infoForm");
let url = document.getElementById("url");

let iconType = document.getElementById("iconType");

let iconTextDiv = document.getElementById("iconText");
let iconText = document.getElementById("iconText").children[1];

let iconImageDiv = document.getElementById("iconImage");
let iconImage = document.getElementById("iconImage").children[1];


let mode = "default";
let square = true;

let mouseX;
let mouseY;
document.addEventListener("mousemove", e => {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

iconType.addEventListener(
  "change",
  (event) => {
    if (event.target.value == "text")
      iconTextDiv.hidden = false;
    else
      iconTextDiv.hidden = true;

    if (event.target.value == "image")
      iconImageDiv.hidden = false;
    else
      iconImageDiv.hidden = true;
  }
);


let hook = null;
let interval;



function menuClick(m) {
  if (m == "settings") {
    if (options.hidden == true) {
      options.hidden = false;
    }
    else {
      options.hidden = true;
      closeMode();
      mode = "default";
    }
  }
  else if (m == "add") {
    if (mode == "add") {
      closeAdd();
      mode = "default";
    }
    else {
      closeMode();
      mode = "add";
      infoForm.style.display = "block";
    }
  }
  else if (m == "remove") {
    if (mode == "remove") {
      mode = "default";
    }
    else {
      closeMode();
      mode = "remove";
    }
  }
  else if (m == "edit") {
    if (mode == "edit") {
      closeEdit();
      mode = "default";
    }
    else {
      closeMode();
      mode = "edit";
    }
  }
  else if (m == "move") {
    if (mode == "move") {
      closeMove();
      mode = "default";
    }
    else {
      closeMode();
      mode = "move";
    }
  }
  else if (m == "square") {
    square ^= true;
  }
}

function clicked(elem) {
  let parent = elem.parentElement;

  if (mode == "default") {
    let x = document.createElement("a");
    x.href = parent.dataset.url;
    x.click();
  }
  else if (mode == "remove") {
    post_remove(
      parent.dataset.id,
      (status) => {
        if (status == 200) {
          parent.remove();
        }
        else {
          alert("error");
        }
      }
    );
  }
  else if (mode == "edit") {
    if (hook == null) {
      hook = parent;
      infoForm.style.display = "block";
      url.value = hook.dataset.url;

      let iconElem = hook.querySelector(".icon");
      if (iconElem.tagName == "H1") {
        iconType.value = "text";
        iconTextDiv.hidden = false;
        iconText.value = iconElem.innerText;
      }
      else if (hook.querySelector(".icon").tagName == "IMG") {
        iconType.value = "image";
        iconImageDiv.hidden = false;
        iconImage.value = iconElem.src;
      }
    }
  }
  else if (mode == "move") {
    if (hook == null) {
      hook = parent;
      hook.classList.add("dragging")
      interval = setInterval(move, 10);
    }
    else if (parent == hook) {
      closeMove();
    }
  }
}



function submitInfo() {
  let icon;

  if (iconType.value == "") {
    alert("Please select icon type");
    return;
  }
  else if (iconType.value == "text") {
    icon = iconText.value;
  }
  else if (iconType.value == "image") {
    icon = iconImage.value;
  }

  if (mode == "add") {
    post_create(
      url.value,
      iconType.value,
      icon,
      (status, id) => {
        if (status == 200) {
          let elem = createElement(
            id,
            "",
            "",
            url.value,
            iconType.value,
            icon
          )
          closeAdd();
          mode = "move";
          hook = elem;
          interval = setInterval(move, 10);
        }
        else {
          alert("error");
        }
      }
    );
  }
  else if (mode == "edit") {
    post_update({
        "id": hook.dataset.id,
        "url": url.value,
        "iconType": iconType.value,
        "icon": icon
      },
      (status) => {
        if (status == 200) {
          hook.dataset.url = url.value;
          hook.replaceChild(
            createIcon(
              iconType.value,
              icon
            ),
            hook.querySelector(".icon")
          );
          hook = null;
          closeInfoForm();
        }
        else {
          alert("Failed to update");
        }
      }
    );
  }
}

function move() {
  let width = hook.firstElementChild.offsetWidth;
  let height = hook.firstElementChild.offsetHeight;
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;

  if (square) {
    x /= 40;
    y /= 40;

    x = Math.floor(x + 0.5);
    y = Math.floor(y + 0.5);

    x *= 40;
    y *= 40;
  }

  x = (x < 0) ? 0 : x;
  y = (y < 80) ? 80 : y;

  x = Math.floor(x);
  y = Math.floor(y);

  hook.style.left = x;
  hook.style.top = y;
}



function closeMode() {
  if (mode == "add") {
    closeAdd();
  }
  else if (mode == "edit") {
    closeEdit();
  }
  else if (mode == "move") {
    closeMove();
  }
}

function closeAdd() {
  closeInfoForm();
}

function closeEdit() {
  hook = null;
  clearInterval(interval);
  closeInfoForm();
}

function closeInfoForm() {
  infoForm.style.display = "none";
  url.value = "";

  iconType.value = "";

  iconTextDiv.hidden = true;
  iconText.value = "";

  iconImageDiv.hidden = true;
  iconImage.value = "";
}

function closeMove() {
  if (hook != null) {
    post_update({
        "id": hook.dataset.id,
        "x": parseInt(hook.style.left),
        "y": parseInt(hook.style.top)
      },
      (status) => {
        if (status != 200) {
          alert("Failed to update");
        }
      }
    );
    hook.classList.remove("dragging")
    hook = null;
    clearInterval(interval);
  }
}
