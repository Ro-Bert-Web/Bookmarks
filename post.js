function save() {
    localStorage.setItem("BookmarksIcons", JSON.stringify(elements));
    localStorage.setItem("BookmarksVersion", DataVersion);
}



function post_create(url, iconType, icon, callback) {
    let id = 0;
    for (let i = 0; i < elements.length; i++)
        if (id <= elements[i].id)
            id = elements[i].id + 1;

    let element = {
        "id": id,
        "x": null,
        "y": null,
        "url": url,
        "iconType": iconType,
        "icon": icon
    };
    elements.push(element);
    save();
    callback(200, id);
}

function post_remove(id, callback) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].id == id) {
            elements.splice(i, 1);
            save();
            callback(200);
            return;
        }
    }
    callback(500);
}

function post_update(elem, callback) {
    if (elem.id == undefined) {
        callback(400);
        return;
    }
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].id == elem.id) {
            if (elem.x != undefined)
                elements[i].x = elem.x
            if (elem.y != undefined)
                elements[i].y = elem.y
            if (elem.url != undefined)
                elements[i].url = elem.url;
            if (elem.iconType != undefined)
                elements[i].iconType = elem.iconType;
            if (elem.icon != undefined)
                elements[i].icon = elem.icon;

            save();
            callback(200);
            return;
        }
    }
    callback(500);
}
