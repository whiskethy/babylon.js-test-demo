import * as helper from './modules/helperFunctions.js';
import * as api from './modules/api.js';
import { Pokemon } from './classes/Pokemon.js';
import { Moves } from './classes/Moves.js';

import { fetchPokemonData } from '../modules/testApi.js';
import * as UIHelper from '../engineHelper/uiHelper.js';


var Player1Pokemon = new Pokemon();
var Player2Pokemon = new Pokemon();

var gameOver = false;

export function loadGame(advancedTexture)
{
	// Call the fetchPokemonData function to get the Pokemon data
	fetchPokemonData(136).then((pokemonData) => {
		// Set the Pokemon data in our Pokemon object
		Player1Pokemon.setPokemon(pokemonData, 100, 1);

		var image = UIHelper.createImage(Player1Pokemon.getSprite(), -200, -120, 300, 300);
		advancedTexture.addControl(image);		
		
		var textString = "This is some text in multiple lines. let's see if it gets better\nLine 2\nLine 3\nLine 4";

		var textBlock = UIHelper.createTextBlock(textString,300,200, -200, 150);
		advancedTexture.addControl(textBlock);

		var button = UIHelper.createButton(Player1Pokemon.getName(), -200, 0, UIHelper.getTypeColor(Player1Pokemon.getType1()));
		advancedTexture.addControl(button); //Z HEIGHT MATTERS! IF BELOW ANOTHER LAYER, YOU CAN'T CLICK IT
	});

	fetchPokemonData(872).then((pokemonData) => {
		// Set the Pokemon data in our Pokemon object
		Player2Pokemon.setPokemon(pokemonData, 100, 2);
		

		var image = UIHelper.createImage(Player2Pokemon.getSprite(), 200, -120, 300, 300);
		advancedTexture.addControl(image);	

		var textString = "This is some text in multiple lines. let's see if it gets better\nLine 2\nLine 3\nLine 4";

		var textBlock = UIHelper.createTextBlock(textString,300, 200, 200, 150);
		advancedTexture.addControl(textBlock);

		var button = UIHelper.createButton(Player2Pokemon.getName(), 200, 0, UIHelper.getTypeColor(Player2Pokemon.getType1()));
		advancedTexture.addControl(button); 
	});

}

function attackRound(target, attackIndex)
{
	if(gameOver==false)
	{
		if(helper.whoGoesFirst(Player1Pokemon, Player2Pokemon) == 1)
		{
			Player1Pokemon.attack(target, attackIndex)

			if(Player2Pokemon.getCurrHealth() > 0) //if the pokemon is still alive
			{
				Player2Pokemon.attack(Player1Pokemon, Math.floor(Math.random() * 4))
			}
			
		}
		else if(helper.whoGoesFirst(Player1Pokemon, Player2Pokemon) == 2)
		{
			Player2Pokemon.attack(Player1Pokemon, Math.floor(Math.random() * 4))

			if(Player1Pokemon.getCurrHealth() > 0) //if the pokemon is still alive
			{
				Player1Pokemon.attack(target, attackIndex)
			}
		}
	}
	

	gameOver = checkIfFainted();
	
}

function checkIfFainted()
{
	if (Player1Pokemon.getCurrHealth() <= 0) {
		helper.addToBattleLog('Player 2: ' + Player2Pokemon.getName() + ' wins!', true);
		return true;
	} else if (Player2Pokemon.getCurrHealth() <= 0) {
		helper.addToBattleLog('Player 1: ' + Player1Pokemon.getName() + ' wins!', true);
		return true;
	}
	else
	{
		return false;
	}
}

async function game() {

	//Pull the stuff from the API and sets out objects
	// await api.loadPokemonFromAPI(helper.choosePokemon(136), 1, Player1Pokemon);
	// await api.loadPokemonFromAPI(helper.choosePokemon('random'), 2, Player2Pokemon);

	// await api.loadMoveFromAPI("flamethrower", Player1Pokemon)
	// await api.loadMoveFromAPI("headbutt", Player1Pokemon)
	// await api.loadMoveFromAPI("inferno", Player1Pokemon)
	// await api.loadMoveFromAPI("rest", Player1Pokemon)

	// await api.loadMoveFromAPI("rest", Player2Pokemon)
	// await api.loadMoveFromAPI("icy-wind", Player2Pokemon)
	// await api.loadMoveFromAPI("bug-bite", Player2Pokemon)
	// await api.loadMoveFromAPI("struggle-bug", Player2Pokemon)

	

	
}

game();