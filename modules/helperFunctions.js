import * as UIHelper from '../engineHelper/uiHelper.js';
import { addToBattleLog } from '../game.js';

let sharedAdvancedTexture = null;

function setAdvancedTexture(advancedTexture) {
  sharedAdvancedTexture = advancedTexture;
}

function getTypeEffString(mult) {
	if (mult >= 2) {
		return "It's super effective!";
	} else if (mult == 0) {
		return 'It has no effect...';
	} else if (mult < 1) {
		return "It's not very effective...";
	} else if (mult == 1) {
		return '';
	} else {
		return 'ERROR';
	}
}

function getFasterPoke(Player1Pokemon, Player2Pokemon) {
	if (Player1Pokemon.getSpeed() >= Player2Pokemon.getSpeed()) {
		return 1;
	} else {
		return 2;
	}
}

function choosePoke(howToChoose) {
	//random or ask or theNum
	if (howToChoose == 'random') {
		return Math.floor(Math.random() * 904);
	} else if (howToChoose == 'ask') {
		return prompt('What is the number of the Pokemon you want to use (1-905)?');
	} else {
		return howToChoose;
	}
}

export {
	getTypeEffString as getTypeEffectivenessString,
	getFasterPoke as whoGoesFirst,
	choosePoke as choosePokemon,
	setAdvancedTexture
};