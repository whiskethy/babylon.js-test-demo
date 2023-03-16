import * as UIHelper from './uiHelper.js';
import { Pokemon } from '../classes/Pokemon.js';

export function buildPlayer1PokemonUI(thePokemon, advancedTexture) {
	var image = UIHelper.createImage(thePokemon.getSprite(), 400, 400, "-35%", "-30%");
	advancedTexture.addControl(image);

    var color = UIHelper.getTypeColor(thePokemon.getType1());
    var text = UIHelper.capitalizeFirstLetter(thePokemon.getName());
    var button = UIHelper.createTextBlock(text, 200, 50, 32, "-35%", "-10%", color);
	advancedTexture.addControl(button);

	var textString =
		"This is some text in multiple lines. let's see if it gets better\nLine 2\nLine 3\nLine 4";

	var textBlock = UIHelper.createTextBlock(textString, 300, 200, 12, "-35%", "10%");
	advancedTexture.addControl(textBlock);

	
	var moveBackground = UIHelper.createMoveButtonContainer(400, 175, "-35%", 275, '#333');
	advancedTexture.addControl(moveBackground);
}

export function buildPokemonMoveButtons(moveName, moveType, advancedTexture, index) {

	var color = UIHelper.getTypeColor(moveType);

	var xyArray = getButtonLocation(index, 1);

	var button = UIHelper.createButton(moveName, 175, 65, xyArray[0], xyArray[1], color);
	advancedTexture.addControl(button); 
}

export function getButtonLocation(index, playerNumber) {
	var x = 0;
	var y = 0;
	if (playerNumber == 1) {
		if (index == 0) {
			x = -575;
			y = 235;
		} else if (index == 1) {
			x = -390;
			y = 235;
		} else if (index == 2) {
			x = -575;
			y = 315;
		} else if (index == 3) {
			x = -390;
			y = 315;
		}
	}

	var location = [x, y];
	return location;
}
