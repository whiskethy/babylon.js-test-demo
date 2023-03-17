import * as UIHelper from './uiHelper.js';
import { Pokemon } from '../classes/Pokemon.js';

// WIDTH:1376 pixels
// HEIGHT: 768 pixels

export function buildGameUI(advancedTexture)
{
	var title = UIHelper.createTextBlock('Pokemon Battle', '40%', '10%', 64, '0%', '-40%', '#333');
	advancedTexture.addControl(title);

	var subtitle = UIHelper.createTextBlock('By: Mr. G', '30%', '5%', 16, '0%', '-32%', '#333');
	advancedTexture.addControl(subtitle);

	var battleLog = UIHelper.createBattleLog('', '35%', '70%', 18, '0%', '10%');
	advancedTexture.addControl(battleLog.container);

	return battleLog;
}


export function buildPokemonUI(thePokemon, advancedTexture) {
	var side = '';
	if (thePokemon.getPlayerNumber() == 1) {
		side = '-';
	}

	//Pokemon Sprite
	var image = UIHelper.createImage(thePokemon.getSprite(), '29.1%', '52.08%', side + '35%', '-30%');
	advancedTexture.addControl(image);

	//Pokemon Name
	var color = UIHelper.getTypeColor(thePokemon.getType1());
	var text = UIHelper.capitalizeFirstLetter(thePokemon.getName());
	var button = UIHelper.createTextBlock(text, '16%', '7%', 32, side + '35%', '-10%', color);
	advancedTexture.addControl(button);

	//Pokemon Health
	  // Usage
	  
	var temp = '';
	temp += 'HP: ' + thePokemon.getCurrHealth() + '/' + thePokemon.getMaxHP();
	
	var healthBarWithText = UIHelper.createHealthBarWithText(temp, 21.8, 6.51, 32, side + '35%', '0%', '#333', color);
	advancedTexture.addControl(healthBarWithText.container);


	//Pokemon Stats
	temp = '';
	temp += 'Attack: ' + thePokemon.getAttack() + '\n';
	temp += 'Defense: ' + thePokemon.getDefense() + '\n';
	temp += 'Sp. Attack: ' + thePokemon.getSpecialAttack() + '\n';
	temp += 'Sp. Defense: ' + thePokemon.getSpecialDefense() + '\n';
	temp += 'Speed: ' + thePokemon.getSpeed();

	var textBlock = UIHelper.createTextBlock(temp, '20%', '20.04%', 24, side + '30.3%', '14%', '#333');
	advancedTexture.addControl(textBlock);

	//Pokemon Type
	textBlock = UIHelper.createTextBlock('', '9%', '20.04%', 24, side + '45%', '14%', '#333');
	advancedTexture.addControl(textBlock);

	if (thePokemon.getType2() == '') {
		var url =
			'https://duiker101.github.io/pokemon-type-svg-icons/icons/' + thePokemon.getType1() + '.svg';
		var type1 = UIHelper.createIcon(url, 100, side + '45%', '14%', color);
		advancedTexture.addControl(type1);
	} else if (thePokemon.getType2() != '') {
		var url =
			'https://duiker101.github.io/pokemon-type-svg-icons/icons/' + thePokemon.getType1() + '.svg';
		var type1 = UIHelper.createIcon(url, 70, side + '45%', '9%', color);
		advancedTexture.addControl(type1);

		color = UIHelper.getTypeColor(thePokemon.getType2());

		url =
			'https://duiker101.github.io/pokemon-type-svg-icons/icons/' + thePokemon.getType2() + '.svg';
		var type2 = UIHelper.createIcon(url, 70, side + '45%', '19%', color);
		advancedTexture.addControl(type2);
	}

	//Pokemon Moves
	var moveBackground = UIHelper.createMoveButtonContainer(
		'29.5%',
		'22.79%',
		side + '35%',
		'35.8%',
		'#333'
	);
	advancedTexture.addControl(moveBackground);

	return healthBarWithText;
}

export function getButtonLocation(index, playerNumber) {
	var x = 0;
	var y = 0;
	if (playerNumber == 1) {
		if (index == 0) {
			x = '-41.78%';
			y = '30.6%';
		} else if (index == 1) {
			x = '-28.34%';
			y = '30.6%';
		} else if (index == 2) {
			x = '-41.78%';
			y = '41.01%';
		} else if (index == 3) {
			x = '-28.34%';
			y = '41.01%';
		}
	} else if (playerNumber == 2) {
		if (index == 0) {
			x = '41.78%';
			y = '30.6%';
		} else if (index == 1) {
			x = '28.34%';
			y = '30.6%';
		} else if (index == 2) {
			x = '41.78%';
			y = '41.01%';
		} else if (index == 3) {
			x = '28.34%';
			y = '41.01%';
		}
	}

	var location = [x, y];
	return location;
}
