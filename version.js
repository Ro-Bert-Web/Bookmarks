function updateVersion() {
    if (version == DataVersion)
        return;
    if (version == "beta") {
        let temp = elements.elements;
        elements = [];
        for (let i = 0; i < temp.length; i++) {
            let element = {
                id: i,
                x: temp[i].x,
                y: temp[i].y,
                url: temp[i].url,
                iconType: temp[i].type,
                icon: temp[i].icon
            };
            elements.push(element);
        }
        console.log("Updated from beta to 1.0");
    }
    save();
}
