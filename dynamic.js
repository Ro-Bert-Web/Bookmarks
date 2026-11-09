
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
select("square");

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
    }
  }
  else if (m == "add") {
    if (mode == "add") {
      closeMode();
    }
    else {
      closeMode();
      openModeAdd();
    }
  }
  else if (m == "remove") {
    if (mode == "remove") {
      closeMode();
    }
    else {
      closeMode();
      openModeRemove();
    }
  }
  else if (m == "edit") {
    if (mode == "edit") {
      closeMode();
    }
    else {
      closeMode();
      openModeEdit()
    }
  }
  else if (m == "move") {
    if (mode == "move") {
      closeMode();
    }
    else {
      closeMode();
      openModeMove()
    }
  }
  else if (m == "square") {
    square ^= true;
    if (square) {
      select("square");
    }
    else {
      unselect("square");
    }
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
      closeModeMove();
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
          closeMode();
          openModeMove(elem)
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



function select(m) {
  document.getElementById(`${m}-icon`).classList.add("selected");
}

function unselect(m) {
  document.getElementById(`${m}-icon`).classList.remove("selected");
}

function closeMode() {
  if (mode == "add") {
    closeModeAdd();
  }
  else if (mode == "edit") {
    closeModeEdit();
  }
  else if (mode == "remove") {
    closeModeRemove();
  }
  else if (mode == "move") {
    closeModeMove();
  }
}

function openModeAdd() {
  select("add");
  infoForm.style.display = "block";
  mode = "add";
}

function closeModeAdd() {
  unselect("add");
  closeInfoForm();
  mode = "default";
}

function openModeEdit() {
  select("edit");
  mode = "edit";
}

function closeModeEdit() {
  unselect("edit");
  hook = null;
  clearInterval(interval);
  closeInfoForm();
  mode = "default";
}

function openModeRemove() {
  select("remove");
  mode = "remove";
}

function closeModeRemove() {
  unselect("remove");
  mode = "default"
}

function openModeMove(elem = null) {
  select("move");
  mode = "move";

  if (elem != null) {
    hook = elem;
    interval = setInterval(move, 10);
  }
}

function closeModeMove() {
  unselect("move");
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
  }
  clearInterval(interval);
  mode = "default";
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
