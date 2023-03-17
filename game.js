import * as helper from './modules/helperFunctions.js';
import * as api from './modules/api.js';
import { Pokemon } from './classes/Pokemon.js';
import { Moves } from './classes/Moves.js';

import * as UIHelper from '../engineHelper/uiHelper.js';
import * as UIBuilder from '../engineHelper/uiBuilder.js';
import { createLoadingScreen, removeLoadingScreen } from '../engineHelper/loadingScreen.js';


var Player1Pokemon = new Pokemon();
var Player2Pokemon = new Pokemon();

var battleLogHook = null;
var Pokemon1HealthBarHook = null;
var Pokemon2HealthBarHook = null;

let sharedAdvancedTexture = null;

var tasksLoaded = 0;

export let successfulTasks = 0;

var gameOver = false;

export function loadGame(loadingScreen, advancedTexture, assetsManager) {
	//build the basic game uiui, and get the battle log hook to add text to the battle log
	battleLogHook = UIBuilder.buildGameUI(advancedTexture);
	sharedAdvancedTexture = advancedTexture;

	//advancedTexture.addControl(battleLogHook.rect);

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

		successfulTasks++;

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

		successfulTasks++;

	};
	pokemonTask2.onError = function (task, message, exception) {
		console.error('Error loading Pokemon data:', message, exception);
	};

	//NEED TO COMMENT OUT THIS CODE SO THAT WE DON'T GET EXTRA API CALLS WHILE WORKING ON THE GAME
	loadMoves(Player1Pokemon, 'fire-fang', assetsManager, loadingScreen);
	loadMoves(Player1Pokemon, 'flamethrower', assetsManager, loadingScreen);
	loadMoves(Player1Pokemon, 'charm', assetsManager, loadingScreen);
	loadMoves(Player1Pokemon, 'tackle', assetsManager, loadingScreen);

	loadMoves(Player2Pokemon, 'blizzard', assetsManager, loadingScreen);
	loadMoves(Player2Pokemon, 'bug-buzz', assetsManager, loadingScreen);
	loadMoves(Player2Pokemon, 'hyper-beam', assetsManager, loadingScreen);
	loadMoves(Player2Pokemon, 'play-rough', assetsManager, loadingScreen);

	//teachMoves(Player1Pokemon, "pay-day", assetsManager, advancedTexture);
}

function loadMoves(thePokemon, moveName, assetsManager, loadingScreen) {
	tasksLoaded++;
	//var url = 'https://pokeapi.co/api/v2/move/' + moveName;
	var url = 'jsonData/' + moveName + '.json';
	var pokemonTask3 = assetsManager.addTextFileTask('pokemonTask' + tasksLoaded, url);

	pokemonTask3.onSuccess = function (task) {
		var data = JSON.parse(task.text);
		thePokemon.setMove(data);

		successfulTasks++;

	};
	pokemonTask3.onError = function (task, message, exception) {
		console.error('Error loading Pokemon data:', message, exception);
	};
}

function attackRound(attackIndex) {
	if (gameOver == false) {
		if (helper.whoGoesFirst(Player1Pokemon, Player2Pokemon) == 1) {
			Player1Pokemon.attack(Player2Pokemon, attackIndex);

			if (Player2Pokemon.getCurrHealth() > 0) {
				//if the pokemon is still alive
				Player2Pokemon.attack(Player1Pokemon, Math.floor(Math.random() * 4));

			}
		} else if (helper.whoGoesFirst(Player1Pokemon, Player2Pokemon) == 2) {
			Player2Pokemon.attack(Player1Pokemon, Math.floor(Math.random() * 4));
			
			if (Player1Pokemon.getCurrHealth() > 0) {
				//if the pokemon is still alive
				Player1Pokemon.attack(Player2Pokemon, attackIndex);

			}
		}
	}

	gameOver = checkIfFainted();
}

function checkIfFainted() {
	if (Player1Pokemon.getCurrHealth() <= 0) {
		addToBattleLog('Player 2: ' + Player2Pokemon.getName() + ' wins!', '#333', 18, 'bold');
		return true;
	} else if (Player2Pokemon.getCurrHealth() <= 0) {
		addToBattleLog('Player 1: ' + Player1Pokemon.getName() + ' wins!', '#333', 18, 'bold');
		return true;
	} else {
		return false;
	}
}


export async function buildUI(advancedTexture) {
	UIBuilder.buildPokemonUI(Player1Pokemon, advancedTexture);
	UIBuilder.buildPokemonUI(Player2Pokemon, advancedTexture);


	buildButtons(advancedTexture);

}

async function buildButtons(advancedTexture) {
	var color = '';
	var xyArray = [];
  
	// Player 1 Move Buttons
	for (let i = 0; i < 4; i++) {
	  color = UIHelper.getTypeColor(Player1Pokemon.learnedMoves[i].getMoveType());
	  xyArray = UIBuilder.getButtonLocation(i, 1);
  
	  const button = UIHelper.createButton(
		Player1Pokemon.learnedMoves[i].getName(),
		'12.7%',
		'6.51%',
		xyArray[0],
		xyArray[1],
		color,
		'white'
	  );
  
	  button.onPointerClickObservable.add(() => {
		attackRound(i);
	  });
  
	  advancedTexture.addControl(button);
	}
  
	// Player 2 Move Buttons
	for (let i = 0; i < 4; i++) {
	  color = UIHelper.getTypeColor(Player2Pokemon.learnedMoves[i].getMoveType());
	  xyArray = UIBuilder.getButtonLocation(i, 2);
  
	  const button = UIHelper.createButton(
		Player2Pokemon.learnedMoves[i].getName(),
		'12.7%',
		'6.51%',
		xyArray[0],
		xyArray[1],
		color,
		'white'
	  );
  
	  button.onPointerClickObservable.add(() => {
		attackRound(i);
	  });
  
	  advancedTexture.addControl(button);
	}
  }
  
  export function addToBattleLog(
	text,
	color = '#333',
	size = 14,
	fontWeight = 'normal'
  ) {
	var textBlock = new BABYLON.GUI.TextBlock();
	textBlock.text = UIHelper.capitalizeFirstLetter(text);
	textBlock.color = color;
	textBlock.fontSize = size;
	textBlock.fontWeight = fontWeight;
	textBlock.height = '20px'; // Set a fixed pixel value for height
	textBlock.textWrapping = true;
	textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	textBlock.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
  
	battleLogHook.stackPanel.addControl(textBlock);
  }
  


export async function setupGame(advancedTexture) {
	helper.setAdvancedTexture(advancedTexture);
	await buildUI(advancedTexture);

	var pokemonName1 = UIHelper.capitalizeFirstLetter(Player1Pokemon.getName()); //done to reduce number of calls to capitalizeFirstLetter and get name
	var pokemonName2 = UIHelper.capitalizeFirstLetter(Player2Pokemon.getName());

	addToBattleLog('Welcome to the world of Pokemon!');
	addToBattleLog(
		"It's a battle between " + pokemonName1 + ' and ' + pokemonName2 + '!'
	);

	addToBattleLog(
		pokemonName1 + '\'s Speed:  ' + Player1Pokemon.getSpeed() + ", " + pokemonName2 + "\'s Speed:  " + Player2Pokemon.getSpeed()
	);

}

export function game() {
	//The game loop
}

// game();
