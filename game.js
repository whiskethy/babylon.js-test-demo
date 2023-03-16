import * as helper from './modules/helperFunctions.js';
import * as api from './modules/api.js';
import { Pokemon } from './classes/Pokemon.js';
import { Moves } from './classes/Moves.js';

import * as UIHelper from '../engineHelper/uiHelper.js';
import * as UIBuilder from '../engineHelper/uiBuilder.js';

var Player1Pokemon = new Pokemon();
var Player2Pokemon = new Pokemon();

var battleLogHook = null;

var tasksLoaded = 0;

var gameOver = false;

export function loadGame(advancedTexture, assetsManager) {
	//build the ui, and get the battle log hook to add text to the battle log
	battleLogHook = UIBuilder.buildGameUI(advancedTexture).getDescendants()[1];

	var pokemonId = 135;

	//var pokemonData = null;
	// Add a text file task that loads the Pokemon data
	//var pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemonId;

	var pokemonUrl_local = 'jsonData/flareon.json';
	var pokemonTask = assetsManager.addTextFileTask('pokemonTask' + tasksLoaded, pokemonUrl_local);
	pokemonTask.onSuccess = function (task) {
		
		var pokemonData = JSON.parse(task.text);
		tasksLoaded++;
		//console.log('Loaded Pokemon data:', pokemonData);

		Player1Pokemon.setPokemon(pokemonData, 100, 1);
		UIBuilder.buildPokemonUI(Player1Pokemon, advancedTexture);

		var move1 = Player1Pokemon.learnableMoves[0];
		var move2 = Player1Pokemon.learnableMoves[1];
		var move3 = Player1Pokemon.learnableMoves[2];
		var move4 = Player1Pokemon.learnableMoves[3];

		var movesToLearn = [move1, move2, move3, move4];

		//teachMoves(Player1Pokemon, movesToLearn, assetsManager, advancedTexture);
	};
	pokemonTask.onError = function (task, message, exception) {
		console.error('Error loading Pokemon data:', message, exception);
	};

	pokemonId = 133;

	//var pokemonData = null;
	// Add a text file task that loads the Pokemon data
	//var pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemonId;

	pokemonUrl_local = 'jsonData/frosmoth.json';
	tasksLoaded++;

	var pokemonTask2 = assetsManager.addTextFileTask('pokemonTask' + tasksLoaded, pokemonUrl_local);
	pokemonTask2.onSuccess = function (task) {
		var pokemonData = JSON.parse(task.text);
		
		//console.log('Loaded Pokemon data:', pokemonData);

		Player2Pokemon.setPokemon(pokemonData, 100, 2);
		UIBuilder.buildPokemonUI(Player2Pokemon, advancedTexture);

		var move1 = Player2Pokemon.learnableMoves[0];
		var move2 = Player2Pokemon.learnableMoves[1];
		var move3 = Player2Pokemon.learnableMoves[2];
		var move4 = Player2Pokemon.learnableMoves[3];

		var movesToLearn = [move1, move2, move3, move4];

		//teachMoves(Player2Pokemon, movesToLearn, assetsManager, advancedTexture);
	};
	pokemonTask2.onError = function (task, message, exception) {
		console.error('Error loading Pokemon data:', message, exception);
	};

	//NEED TO COMMENT OUT THIS CODE SO THAT WE DON'T GET EXTRA API CALLS WHILE WORKING ON THE GAME
	teachMoves(Player1Pokemon, 1, 0, 'fire-fang', assetsManager, advancedTexture);
	teachMoves(Player1Pokemon, 1, 1, 'flamethrower', assetsManager, advancedTexture);
	teachMoves(Player1Pokemon, 1, 2, 'charm', assetsManager, advancedTexture);
	teachMoves(Player1Pokemon, 1, 3, 'tackle', assetsManager, advancedTexture);

	teachMoves(Player2Pokemon, 2, 0, 'blizzard', assetsManager, advancedTexture);
	teachMoves(Player2Pokemon, 2, 1, 'bug-buzz', assetsManager, advancedTexture);
	teachMoves(Player2Pokemon, 2, 2, 'hyper-beam', assetsManager, advancedTexture);
	teachMoves(Player2Pokemon, 2, 3, 'play-rough', assetsManager, advancedTexture);


	//teachMoves(Player1Pokemon, "pay-day", assetsManager, advancedTexture);
}

function teachMoves(thePokemon, playerNum, index, moveName, assetsManager, advancedTexture) {
	tasksLoaded++;
	//var url = 'https://pokeapi.co/api/v2/move/' + moveName;
	var url = 'jsonData/' + moveName + '.json';
	var pokemonTask3 = assetsManager.addTextFileTask('pokemonTask' + tasksLoaded, url);

	pokemonTask3.onSuccess = function (task) {
		var data = JSON.parse(task.text);
		thePokemon.setMove(data);

		var moveName = data.name;
		var moveType = data.type.name;

		UIBuilder.buildPokemonMoveButtons(
			moveName,
			moveType,
			thePokemon.getPlayerNumber(),
			index,
			advancedTexture
		);
	};
	pokemonTask3.onError = function (task, message, exception) {
		console.error('Error loading Pokemon data:', message, exception);
	};
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

export function game() {
	
	var numEntries = 0;
	var pokemonName1 = UIHelper.capitalizeFirstLetter(Player1Pokemon.getName()); //done to reduce number of calls to capitalizeFirstLetter and get name
	var pokemonName2 = UIHelper.capitalizeFirstLetter(Player2Pokemon.getName());

	UIHelper.addToBattleLog(battleLogHook, 'Welcome to the world of Pokemon!');
	numEntries++;
	UIHelper.addToBattleLog(
		battleLogHook,
		"It's a battle between " + pokemonName1 + ' and ' + pokemonName2 + '!'
	);
	numEntries++;

	UIHelper.addToBattleLog(
		battleLogHook,
		pokemonName1 + ' used Flamethrower for 268 damage!'
	);
	numEntries++;

	UIHelper.addToBattleLog(
		battleLogHook,
		'			It was super effective!'
	);
	numEntries++;
}

// game();
