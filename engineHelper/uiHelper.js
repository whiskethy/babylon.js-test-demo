function createButton(pokemonName, positionX, positionY, type) {
	var button = BABYLON.GUI.Button.CreateSimpleButton('button', capitalizeFirstLetter(pokemonName));
	button.width = '150px';
	button.height = '40px';
	button.color = '#333';
	button.background = getTypeColor(type);
	button.onPointerUpObservable.add(function () {
		console.log('Clicked the ' + pokemonName + ' button!');
	});
	button.left = positionX + 'px';
	button.top = positionY + 'px';
	return button;
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

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

export { createButton, getTypeColor };
