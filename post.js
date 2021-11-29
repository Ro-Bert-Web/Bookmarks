function post_create(url, iconType, icon, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "create.php", true);
  xhr.onload = () => {
    callback(xhr.status, parseInt(xhr.response));
  };

  let data = new FormData();
  data.append("url", url);
  data.append("iconType", iconType);
  data.append("icon", icon);

  xhr.send(data);
}

function post_remove(id, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "remove.php", true);
  xhr.onload = () => {
    callback(xhr);
  };

  let data = new FormData();
  data.append("id", id);

  xhr.send(data);
}

function post_update(elem, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "update.php", true);
  xhr.onload = () => {
    callback(xhr);
  };

  let data = new FormData();
  if (elem.hasOwnProperty("id"))
    data.append("id", elem.id);
  if (elem.hasOwnProperty("x"))
    data.append("x", elem.x);
  if (elem.hasOwnProperty("y"))
    data.append("y", elem.y);
  if (elem.hasOwnProperty("url"))
    data.append("url", elem.url);
  if (elem.hasOwnProperty("iconType"))
    data.append("iconType", elem.iconType);
  if (elem.hasOwnProperty("icon"))
    data.append("icon", elem.icon);

  xhr.send(data);
}
