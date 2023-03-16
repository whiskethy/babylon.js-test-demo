import * as helper from './modules/helperFunctions.js';
import * as api from './modules/api.js';
import { Pokemon } from './classes/Pokemon.js';
import { Moves } from './classes/Moves.js';

import * as UIHelper from '../engineHelper/uiHelper.js';
import * as UIBuilder from '../engineHelper/uiBuilder.js';

var Player1Pokemon = new Pokemon();
var Player2Pokemon = new Pokemon();

var gameOver = false;

export function loadGame(advancedTexture) {
	// Call the fetchPokemonData function to get the Pokemon data
	api.loadPokemonFromAPI(136).then((pokemonData) => {
		// Set the Pokemon data in our Pokemon object
		Player1Pokemon.setPokemon(pokemonData, 100, 1);
		UIBuilder.buildPlayer1PokemonUI(Player1Pokemon, advancedTexture);

		teachMove(Player1Pokemon, 0, 'pay-day', advancedTexture);
		teachMove(Player1Pokemon, 1, 'flamethrower', advancedTexture);
		teachMove(Player1Pokemon, 2, 'charm', advancedTexture);
		teachMove(Player1Pokemon, 3, 'fire-blast', advancedTexture);
	});

	api.loadPokemonFromAPI(872).then((pokemonData) => {
		// Set the Pokemon data in our Pokemon object
		Player2Pokemon.setPokemon(pokemonData, 100, 2);

		var image = UIHelper.createImage(Player2Pokemon.getSprite(), 300, 300, 500, -120);
		advancedTexture.addControl(image);
	});
}

function teachMove(thePokemon, index, move, advancedTexture) {
	if (thePokemon.isMoveLearnable(move) == true) {
		api.loadMoveFromAPI(move).then((moveData) => {
			thePokemon.setMove(moveData);
			var moveName = thePokemon.learnedMoves[index].getName();
			var moveType = thePokemon.learnedMoves[index].getMoveType();

			UIBuilder.buildPokemonMoveButtons(moveName, moveType, advancedTexture, index);
		});
	} else {
		console.log('Move not learnable');
	}
}

function attackRound(target, attackIndex) {
	if (gameOver == false) {
		if (helper.whoGoesFirst(Player1Pokemon, Player2Pokemon) == 1) {
			Player1Pokemon.attack(target, attackIndex);

			if (Player2Pokemon.getCurrHealth() > 0) {
				//if the pokemon is still alive
				Player2Pokemon.attack(Player1Pokemon, Math.floor(Math.random() * 4));
			}
		} else if (helper.whoGoesFirst(Player1Pokemon, Player2Pokemon) == 2) {
			Player2Pokemon.attack(Player1Pokemon, Math.floor(Math.random() * 4));

			if (Player1Pokemon.getCurrHealth() > 0) {
				//if the pokemon is still alive
				Player1Pokemon.attack(target, attackIndex);
			}
		}
	}

	gameOver = checkIfFainted();
}

function checkIfFainted() {
	if (Player1Pokemon.getCurrHealth() <= 0) {
		helper.addToBattleLog('Player 2: ' + Player2Pokemon.getName() + ' wins!', true);
		return true;
	} else if (Player2Pokemon.getCurrHealth() <= 0) {
		helper.addToBattleLog('Player 1: ' + Player1Pokemon.getName() + ' wins!', true);
		return true;
	} else {
		return false;
	}
}

async function game() {

}

game();
