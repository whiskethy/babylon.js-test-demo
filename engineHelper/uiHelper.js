// Creates a BABYLON.GUI.Button object with the specified text, position, background color, and text color.
// @param {string} text - The text to display on the button.
// @param {number} width - The width of the button.
// @param {number} height - The height of the button.
// @param {number} positionX - The x-coordinate position of the button.
// @param {number} positionY - The y-coordinate position of the button.
// @param {string} backgroundColor - The background color of the button. Defaults to 'green'.
// @param {string} textColor - The text color of the button. Defaults to 'white'.
// @returns {BABYLON.GUI.Button} - The created button object.
function createButton(text, width, height, positionX, positionY, backgroundColor = 'green', textColor = 'white') {
	var button = BABYLON.GUI.Button.CreateSimpleButton('button', capitalizeFirstLetter(text));
	button.width = width + 'px';
	button.height = height + 'px';
	button.color = textColor;
	button.background = backgroundColor;

	button.onPointerUpObservable.add(function () {
		console.log('Clicked the ' + text + ' button!');
	});
	button.left = positionX + 'px';
	button.top = positionY + 'px';
	return button;
}


// Creates a BABYLON.GUI.Image object with the specified image path, position, and size.
// @param {number} width - The width of the image.
// @param {number} height - The height of the image.
// @param {string} imagePath - The path to the image to display.
// @param {number} positionX - The x-coordinate position of the image.
// @param {number} positionY - The y-coordinate position of the image.
// @returns {BABYLON.GUI.Image} - The created image object.
function createImage(imagePath, width, height, positionX, positionY ) {
	var image = new BABYLON.GUI.Image('image', imagePath);
	image.left = positionX + 'px';
	image.top = positionY + 'px';
	image.width = width + 'px';
	image.height = height + 'px';
	return image;
}


// Creates a BABYLON.GUI.InputText object with the specified text, position, background color, and text color.
// @param {string} text - The text to display in the input box.
// @param {number} width - The width of the input box.
// @param {number} height - The height of the input box.
// @param {number} positionX - The x-coordinate position of the input box.
// @param {number} positionY - The y-coordinate position of the input box.
// @param {string} backgroundColor - The background color of the input box. Defaults to 'black'.
// @param {string} textColor - The text color of the input box. Defaults to 'white'.
// @returns {BABYLON.GUI.InputText} - The created input box object.
function createInputBox(text,width, height, positionX, positionY,  backgroundColor = 'black', textColor = 'white') 
{
	// create an input text control
	var input = new BABYLON.GUI.InputText();
	input.width = width + 'px';
	input.height = height + 'px';
	input.text = text;

	input.color = textColor;
	input.background = backgroundColor;
	// set the position of the input text
	input.left = positionX + 'px';
	input.top = positionY + 'px';

	return input;

}

// Creates a text block with the given text, width, height, position, and color
// @param {string} text - The text to display in the block
// @param {number} width - The width of the block
// @param {number} height - The height of the block
// @param {number} fontSize - The font size of the block
// @param {number} positionX - The x position of the block
// @param {number} positionY - The y position of the block
// @param {string} backgroundColor - The background color of the block (default: 'black')
// @param {string} textColor - The text color of the block (default: 'white')
// @returns {BABYLON.GUI.Rectangle} The created text block
function createTextBlock(text, width, height, fontSize, positionX, positionY,  backgroundColor = 'black', textColor = 'white') 
{
    var rect = new BABYLON.GUI.Rectangle();
    rect.background = backgroundColor;
    rect.color = textColor;
    rect.thickness = 0;
    rect.width = width + 'px';
    rect.height = height + 'px';
	rect.resizeToFit = true;
    // rect.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    // rect.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    rect.left = positionX + "px";
    rect.top = positionY + "px";

    var textBlock = new BABYLON.GUI.TextBlock();
    textBlock.text = text;
    textBlock.fontSize = fontSize;
    textBlock.resizeToFit = true;
    textBlock.textWrapping = true;
    rect.addControl(textBlock);

    return rect;
}

// Capitalizes the first letter of the given string.
// @param {string} string - The string to capitalize.
// @returns {string} - The capitalized string.
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// Returns the color associated with the given pokemon type.
// @param {string} type - The type of pokemon.
// @returns {string} - The color associated with the given pokemon type.
function getTypeColor(type) {
	if (type == 'bug') {
		return '#92bc2c';
	} else if (type == 'dark') {
		return '#595761';
	} else if (type == 'dragon') {
		return '#0c69c8';
	} else if (type == 'electric') {
		return '#f2d94e';
	} else if (type == 'fire') {
		return '#fba54c';
	} else if (type == 'fairy') {
		return '#ee90e6';
	} else if (type == 'fighting') {
		return '#d3425f';
	} else if (type == 'flying') {
		return '#a1bbec';
	} else if (type == 'ghost') {
		return '#5f6dbc';
	} else if (type == 'grass') {
		return '#5fbd58';
	} else if (type == 'ground') {
		return '#da7c4d';
	} else if (type == 'ice') {
		return '#75d0c1';
	} else if (type == 'normal') {
		return '#a0a29f';
	} else if (type == 'poison') {
		return '#b763cf';
	} else if (type == 'psychic') {
		return '#fa8581';
	} else if (type == 'rock') {
		return '#c9bb8a';
	} else if (type == 'steel') {
		return '#5695a3';
	} else if (type == 'water') {
		return '#539ddf';
	}
}

export { createButton, getTypeColor, createImage, createInputBox, createTextBlock };