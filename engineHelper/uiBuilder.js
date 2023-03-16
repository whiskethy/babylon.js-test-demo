import * as UIHelper from './uiHelper.js';
import { Pokemon } from '../classes/Pokemon.js';

// WIDTH:1376 pixels
// HEIGHT: 768 pixels

export function buildPlayer1PokemonUI(thePokemon, advancedTexture) {

	var xLoc = "";

	if(thePokemon.getPlayerNumber() == 1)
	{
		xLoc = "-";
	}
	else if (thePokemon.getPlayerNumber() == 2)
	{
		xLoc = "";
	}

	//Pokemon Sprite
	var image = UIHelper.createImage(thePokemon.getSprite(), "29.1%", "52.08%", xLoc+"35%", "-30%");
	advancedTexture.addControl(image);

	//Pokemon Name
    var color = UIHelper.getTypeColor(thePokemon.getType1());
	var text = UIHelper.capitalizeFirstLetter(thePokemon.getName());
    var button = UIHelper.createTextBlock(text, "16%", "7%", 32, xLoc+"35%", "-10%", color);
	advancedTexture.addControl(button);

	//Pokemon Health
	var textString ="";
	textString += "HP: " + thePokemon.getCurrHealth() + "/" + thePokemon.getMaxHP();
	var textBlock = UIHelper.createTextBlock(textString, "21.8%","6.51%", 32, xLoc+"35%", "0%", "#333");
	advancedTexture.addControl(textBlock);

	//Pokemon Stats
	textString ="";
	textString += "Attack: " + thePokemon.getAttack() + "\n";
	textString += "Defense: " + thePokemon.getDefense() + "\n";
	textString += "Sp. Attack: " + thePokemon.getSpecialAttack() + "\n";
	textString += "Sp. Defense: " + thePokemon.getSpecialDefense() + "\n";
	textString += "Speed: " + thePokemon.getSpeed();

	textBlock = UIHelper.createTextBlock(textString, "20%","20.04%", 24, xLoc+"30.3%", "14%", "#333")
	advancedTexture.addControl(textBlock);

	//Pokemon Type
	textBlock = UIHelper.createTextBlock("", "9%", "20.04%", 24, xLoc+"45%", "14%", "#333");
	advancedTexture.addControl(textBlock);

	if(thePokemon.getType2() == '') {
		var url = "https://duiker101.github.io/pokemon-type-svg-icons/icons/"+ thePokemon.getType1() + ".svg";
		var type1 = UIHelper.createIcon(url, 100,  xLoc+"45%", "14%", color);
		advancedTexture.addControl(type1);
	}
	else if (thePokemon.getType2() != '') {
		var url = "https://duiker101.github.io/pokemon-type-svg-icons/icons/"+ thePokemon.getType1() + ".svg";
		var type1 = UIHelper.createIcon(url, 70,  xLoc+"45%", "9%", color);
		advancedTexture.addControl(type1);

		color = UIHelper.getTypeColor(thePokemon.getType2());

		url = "https://duiker101.github.io/pokemon-type-svg-icons/icons/"+ thePokemon.getType2() + ".svg";
		var type2 = UIHelper.createIcon(url, 70,  xLoc+"45%", "19%", color);
		advancedTexture.addControl(type2);
	}
	

	//Pokemon Moves
	var moveBackground = UIHelper.createMoveButtonContainer("29.5%", "22.79%", xLoc+"35%", "35.8%", '#333');
	advancedTexture.addControl(moveBackground);
}

export function buildPokemonMoveButtons(moveName, moveType, playerNumber, index, advancedTexture) {

	var color = UIHelper.getTypeColor(moveType);

	var xyArray = getButtonLocation(index, playerNumber);

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
	else if (playerNumber == 2) {
		if (index == 0) {
			x = "41.78%";
			y = "30.6%";
		} else if (index == 1) {
			x = "28.34%";
			y = "30.6%";
		} else if (index == 2) {
			x = "41.78%";
			y = "41.01%";
		} else if (index == 3) {
			x = "28.34%";
			y = "41.01%";
		}
	}

	var location = [x, y];
	return location;
}
