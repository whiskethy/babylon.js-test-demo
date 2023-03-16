import * as helper from './modules/helperFunctions.js';
import * as api from './modules/api.js';
import { Pokemon } from './classes/Pokemon.js';
import { Moves } from './classes/Moves.js';

import * as UIHelper from '../engineHelper/uiHelper.js';
import * as UIBuilder from '../engineHelper/uiBuilder.js';

var Player1Pokemon = new Pokemon();
var Player2Pokemon = new Pokemon();

var battleLogHook = null;

var gameOver = false;

export function loadGame(advancedTexture) {

	//build the ui, and get the battle log hook to add text to the battle log
	battleLogHook = UIBuilder.buildGameUI(advancedTexture).getDescendants()[1];

	// Call the fetchPokemonData function to get the Pokemon data
	api.loadPokemonFromAPI(136).then((pokemonData) => {
		// Set the Pokemon data in our Pokemon object
		Player1Pokemon.setPokemon(pokemonData, 100, 1);
		UIBuilder.buildPokemonUI(Player1Pokemon, advancedTexture);

		var move1 = 'pay-day';
		var move2 = 'flamethrower';
		var move3 = 'charm';
		var move4 = 'fire-blast';

		var movesToLearn = [move1, move2, move3, move4];

		//teachMoves(Player1Pokemon, movesToLearn, advancedTexture);

	});

	api.loadPokemonFromAPI(872).then((pokemonData) => {
		// Set the Pokemon data in our Pokemon object
		Player2Pokemon.setPokemon(pokemonData, 100, 2);

		UIBuilder.buildPokemonUI(Player2Pokemon, advancedTexture);

		var move1 = Player2Pokemon.learnableMoves[0];
		var move2 = Player2Pokemon.learnableMoves[1];
		var move3 = Player2Pokemon.learnableMoves[2];
		var move4 = Player2Pokemon.learnableMoves[3];

		var movesToLearn = [move1, move2, move3, move4];

		//teachMoves(Player2Pokemon, movesToLearn, advancedTexture);
	});

	game();
	
}

//Will sometimes not load all moves : need to build into a "loading screen"
function teachMoves(thePokemon, movesToLearn, advancedTexture) {

	for (let i = 0; i < movesToLearn.length; i++) {
		if (thePokemon.isMoveLearnable(movesToLearn[i]) == true) {
			api.loadMoveFromAPI(movesToLearn[i]).then((moveData) => {
				thePokemon.setMove(moveData);
				var moveName = thePokemon.learnedMoves[i].getName();
				var moveType = thePokemon.learnedMoves[i].getMoveType();
				console.log(thePokemon.learnedMoves[i].getName());

				UIBuilder.buildPokemonMoveButtons(moveName, moveType, thePokemon.getPlayerNumber(), i, advancedTexture);
			});
		}
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
	UIHelper.addToBattleLog(battleLogHook, 'Welcome to the world of Pokemon!');
	UIHelper.addToBattleLog(battleLogHook, "It's a battle between " + Player1Pokemon.getName() + ' and ' + Player2Pokemon.getName() + '!');
}

// game();
