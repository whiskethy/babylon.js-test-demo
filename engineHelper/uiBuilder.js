import * as UIHelper from './uiHelper.js';
import { Pokemon } from '../classes/Pokemon.js';

// WIDTH:1376 pixels
// HEIGHT: 768 pixels

export function buildPlayer1PokemonUI(thePokemon, advancedTexture) {
	//Pokemon Sprite
	var image = UIHelper.createImage(thePokemon.getSprite(), "29.1%", "52.08%", "-35%", "-30%");
	advancedTexture.addControl(image);

	//Pokemon Name
    //var color = UIHelper.getTypeColor(thePokemon.getType1());
    var color = UIHelper.getTypeColor('ice');
	var text = UIHelper.capitalizeFirstLetter(thePokemon.getName());
    var button = UIHelper.createTextBlock(text, "14.53%", "6.51%", 32, "-35%", "-10%", color);
	advancedTexture.addControl(button);

	//Pokemon Health
	var textString ="";
	textString += "HP: " + thePokemon.getCurrHealth() + "/" + thePokemon.getMaxHP();
	var textBlock = UIHelper.createTextBlock(textString, "21.8%","6.51%", 24, "-35%", "0%", "#333");
	advancedTexture.addControl(textBlock);

	//Pokemon Stats
	textString ="";
	textString += "Attack: " + thePokemon.getAttack() + "\n";
	textString += "Defense: " + thePokemon.getDefense() + "\n";
	textString += "Sp. Attack: " + thePokemon.getSpecialAttack() + "\n";
	textString += "Sp. Defense: " + thePokemon.getSpecialDefense() + "\n";
	textString += "Speed: " + thePokemon.getSpeed();

	textBlock = UIHelper.createTextBlock(textString, "16.8%","17.04%", 18, "-30%", "15%", "#333")
	advancedTexture.addControl(textBlock);

	//Pokemon Type
	textString ="";
	textBlock = UIHelper.createTextBlock(textString, "7%", "17.04%", 24, "-45%", "15%", "#333");
	advancedTexture.addControl(textBlock);

	var url = "https://duiker101.github.io/pokemon-type-svg-icons/icons/"+ thePokemon.getType1() + ".svg";
	var type1 = UIHelper.createIcon(url, 60,  "-45%", "15%", color);
	advancedTexture.addControl(type1);

	//Pokemon Moves
	var moveBackground = UIHelper.createMoveButtonContainer("29.1%", "22.79%", "-35%", "35.8%", '#333');
	advancedTexture.addControl(moveBackground);
}

export function buildPokemonMoveButtons(moveName, moveType, advancedTexture, index) {

	var color = UIHelper.getTypeColor(moveType);

	var xyArray = getButtonLocation(index, 1);

	var button = UIHelper.createButton(moveName, "12.7%", "6.51%", xyArray[0], xyArray[1], color);
	advancedTexture.addControl(button); 
}

export function getButtonLocation(index, playerNumber) {
	var x = 0;
	var y = 0;
	if (playerNumber == 1) {
		if (index == 0) {
			x = "-41.78%";
			y = "30.6%";
		} else if (index == 1) {
			x = "-28.34%";
			y = "30.6%";
		} else if (index == 2) {
			x = "-41.78%";
			y = "41.01%";
		} else if (index == 3) {
			x = "-28.34%";
			y = "41.01%";
		}
	}

	var location = [x, y];
	return location;
}
