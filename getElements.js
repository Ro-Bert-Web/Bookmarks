let elements = JSON.parse(localStorage.getItem("BookmarksIcons"));
let version = localStorage.getItem("BookmarksVersion");
if (elements == null) {
    if (localStorage.getItem("data") != null) {
        elements = JSON.parse(localStorage.getItem("data"));
        version = "beta";
    }
    else {
        elements = [];
    }
}
updateVersion();

for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    createElement(
        element.id,
        element.x,
        element.y,
        element.url,
        element.iconType,
        element.icon
    );
}
