const gridSnap = 50;
const stickyMenu = false;

let data = localStorage.getItem("data");
let menu = false;
let mode = "default";

let settings = document.createElement("img");
let menuDiv = document.createElement("div");
let popup = document.createElement("div");
let urlInput = document.createElement("input");
let iconInput = document.createElement("input");
let iconType = document.createElement("select");

let lastClick = {
	"x": -1,
	"y": -1,
};
let swap;



// Save the data structure to local storage
function save() {
	let saveData = {
		"elements": []
	};
	for (let i = 0; i < data.elements.length; i++) {
		let elem = data.elements[i];
		saveData.elements.push({
			"x": elem.x,
			"y": elem.y,
			"url": elem.url,
			"icon": elem.icon,
			"type": elem.type,
			"handle": null
		});
	}
	localStorage.setItem("data", JSON.stringify(saveData));	
}


// Sets functions
function setMenu(m) {
	menu = m;
	if (!menu) {
		setMode("default");
	}
	menuDiv.hidden = !menu;
}

function setMode(m) {
	mode = m;						// I want to have this set the backgrounds of the settings icons so you can see the mode
	if (mode != "add-making") {
		popup.style.display = "none";
	}
}



// Add an element to screen
function addElement(elem) {
	let div = document.createElement("div");
	div.style.position = "absolute";
	div.style.left = elem.x;
	div.style.top = elem.y;
	div.style.zIndex = "0";

	let icon;
	if (elem.type == "img") {
		icon = document.createElement("img");
		icon.src = elem.icon;
	}
	else if (elem.type == "text") {
		icon = document.createElement("h1");
		icon.innerText = elem.icon;
	}

	div.onclick = function () {
		if (mode == "default") {
			let a = document.createElement("a");
			a.href = elem.url;
			a.click();
		}
		else if (mode == "remove") {
			let p = div;
			document.body.removeChild(p);
			data.elements = data.elements.filter(e => e != elem);
			save();
			if (stickyMenu) {}
			else
				setMenu(false);
		}
		else if (mode == "swap-selecting") {
			swap = elem;
			setMode("swap-transition");
		}
	};

	div.appendChild(icon);
	elem.handle = div
	document.body.appendChild(div);
}


// Create settings icon
function createSettings() {
	let div = document.createElement("div");
	div.style.position = "absolute";
	div.style.left = "10px";
	div.style.top = "10px";
	div.style.zIndex = "1";

	settings.src = "https://cdn.iconscout.com/icon/free/png-512/settings-410-461751.png";

	div.onclick = function () {
		setMenu(!menu);
	};

	div.appendChild(settings);
	document.body.appendChild(div);
}


// Create the add icon
function createAddIcon() {
	let div = document.createElement("div");
	div.style.position = "absolute";
	div.style.left = "102px";
	div.style.top = "10px";
	div.style.zIndex = "1";

	let img = document.createElement("img");
	img.src = "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/add-circle-blue-512.png";

	div.onclick = function () {
		setMode("add-transition");
	}

	div.appendChild(img);
	menuDiv.appendChild(div);
}


// Create the remove icon
function createRemoveIcon() {
	let div = document.createElement("div");
	div.style.position = "absolute";
	div.style.left = "190px";
	div.style.top = "10px";
	div.style.zIndex = "1";

	let img = document.createElement("img");
	img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Flat_minus_icon.svg/768px-Flat_minus_icon.svg.png";

	div.onclick = function () {
		setMode("remove");
	}

	div.appendChild(img);
	menuDiv.appendChild(div);
}


// Create the move icon
function createMoveIcon() {
	let div = document.createElement("div");
	div.style.position = "absolute";
	div.style.left = "285px";
	div.style.top = "10px";
	div.style.zIndex = "1";

	let img = document.createElement("img");
	img.src = "https://cdn4.iconfinder.com/data/icons/basic-interface-overcolor/512/flip_horizontal-512.png";

	div.onclick = function () {
		setMode("swap-selecting");
	}

	div.appendChild(img);
	menuDiv.appendChild(div);
}


// Snap value to grid
function snap(x, minimum) {
	let gridMark = Math.round(x / gridSnap);
	let bounded = Math.max(gridMark, minimum);
	return bounded * gridSnap;
}

// Create the snap icon
function createSnapIcon() {
	let div = document.createElement("div");
	div.style.position = "absolute";
	div.style.left = "380px";
	div.style.top = "10px";
	div.style.zIndex = "1";

	let img = document.createElement("img");
	img.src = "https://cdn0.iconfinder.com/data/icons/web-user-interface-7/130/6-512.png";

	div.onclick = function () {
		for (let i = 0; i < data.elements.length; i++) {
			let elem = data.elements[i];
			elem.x = snap(parseInt(elem.x), 1) + "px";
			elem.y = snap(parseInt(elem.y), 2) + "px";
			elem.handle.style.left = elem.x;
			elem.handle.style.top = elem.y;
			save();
			if (stickyMenu)
				setMode("default");
			else
				setMenu(false);
		}
	}

	div.appendChild(img);
	menuDiv.appendChild(div);
}


// Create the popup
function createPopup() {
	popup.style.display = "none";
	popup.style.position = "fixed";
	popup.style.left = "40%";
	popup.style.top = "40%";
	popup.style.zIndex = "10";
	popup.style.border = "4px solid grey";
	popup.style.padding = "10px"
	popup.style.backgroundColor = "#ffffff";

	let t1 = document.createElement("h3");
	t1.innerText = "Link to the site:";
	popup.appendChild(t1);

	urlInput.type = "url";
	popup.appendChild(urlInput);

	let t2 = document.createElement("h3");
	t2.innerText = "Icon/Name:";
	popup.appendChild(t2);

	iconInput.type = "url";
	popup.appendChild(iconInput);


	let imgOption = document.createElement("option");
	imgOption.value = "img";
	imgOption.innerText = "Image";

	let txtOption = document.createElement("option");
	txtOption.value = "text";
	txtOption.innerText = "Text";

	iconType.appendChild(imgOption);
	iconType.appendChild(txtOption);
	popup.appendChild(iconType);


	let enter = document.createElement("button");
	enter.innerText = "Create Link";
	enter.onclick = function () {
		if (urlInput.value == "") {
			alert("Please specify a url");
			return;
		}
		if (iconInput.value == "") {
			alert("Please specify an icon");
			return;
		}
		let newElem = {
			"x": lastClick.x + "px",
			"y": lastClick.y + "px",
			"url": urlInput.value,
			"icon": iconInput.value,
			"type": iconType.value,
			"handle": null
		};

		data.elements.push(newElem);
		save();
		addElement(newElem);
		if (stickyMenu)
			setMode("add-selecting");
		else
			setMenu(false);
	}

	popup.appendChild(enter);
	document.body.appendChild(popup);
}


// Create the menu
function createMenu() {
	createSettings();
	createAddIcon();
	createRemoveIcon();
	createMoveIcon();
	createSnapIcon();
	createPopup();

	menuDiv.style.zIndex = "1";
	menuDiv.hidden = !menu;
	document.body.appendChild(menuDiv);
}


// Fill the page with links
function populatePage() {
	if (data == null) {
		data = '{"elements":[]}';
	}
	data = JSON.parse(data);

	for (let i = 0; i < data.elements.length; i++) {
		addElement(data.elements[i]);
	}
}


// Setup page
function setup() {
	createMenu();
	populatePage();

	document.onclick = function (e) {
		if (mode == "add-transition") {
			setMode("add-selecting");
		}
		else if (mode == "add-selecting") {
			lastClick.x = e.clientX - 37;
			lastClick.y = e.clientY - 37;
			popup.style.display = "block";
			setMode("add-making");
		}
		else if (mode == "swap-transition") {
			setMode("swap-moving");
		}
		else if (mode == "swap-moving") {
			swap.x = e.clientX - 37 + "px";
			swap.y = e.clientY - 37 + "px";
			swap.handle.style.left = swap.x;
			swap.handle.style.top = swap.y;
			save();
			if (stickyMenu)
				setMode("swap-selecting");
			else
				setMenu(false);
		}
	}
}

setup();