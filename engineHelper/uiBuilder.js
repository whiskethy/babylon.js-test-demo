import * as UIHelper from './uiHelper.js';
import { Pokemon } from '../classes/Pokemon.js';

export function buildPlayer1PokemonUI(thePokemon, advancedTexture) {
	var image = UIHelper.createImage(thePokemon.getSprite(), 300, 300, -500, -120);
	advancedTexture.addControl(image);

	var textString =
		"This is some text in multiple lines. let's see if it gets better\nLine 2\nLine 3\nLine 4";

	var textBlock = UIHelper.createTextBlock(textString, 300, 200, 12, -500, 150);
	advancedTexture.addControl(textBlock);

	var color = UIHelper.getTypeColor(thePokemon.getType1());

	var button = UIHelper.createButton(thePokemon.getName(), 150, 50, -500, 0, color);
	advancedTexture.addControl(button); //Z HEIGHT MATTERS! IF BELOW ANOTHER LAYER, YOU CAN'T CLICK IT

	var moveBackground = UIHelper.createMoveButtonContainer(400, 125, -500, 300, '#333');
	advancedTexture.addControl(moveBackground);
}

export function buildPokemonMoveButtons(moveName, moveType, advancedTexture, index) {

	var color = UIHelper.getTypeColor(moveType);

	var xyArray = getButtonLocation(index, 1);

	var button = UIHelper.createButton(moveName, 100, 50, xyArray[0], xyArray[1], color);
	advancedTexture.addControl(button); //Z HEIGHT MATTERS! IF BELOW ANOTHER LAYER, YOU CAN'T CLICK IT
}

export function getButtonLocation(index, playerNumber) {
	var x = 0;
	var y = 0;
	if (playerNumber == 1) {
		if (index == 0) {
			x = -600;
			y = 275;
		} else if (index == 1) {
			x = -400;
			y = 275;
		} else if (index == 2) {
			x = -600;
			y = 325;
		} else if (index == 3) {
			x = -400;
			y = 325;
		}
	}

	var location = [x, y];
	return location;
}
