import * as helper from '../modules/helperFunctions.js';
import * as api from './modules/api.js';
import { Pokemon } from './classes/Pokemon.js';
import { Moves } from './classes/Moves.js';

//Create Pokemon objects to copy data into later


// document.getElementById('p1move1').addEventListener('click', () => {
// 	attackRound(Player2Pokemon, 0);
// });
// document.getElementById('p1move2').addEventListener('click', () => {
// 	attackRound(Player2Pokemon, 1);
// });
// document.getElementById('p1move3').addEventListener('click', () => {
// 	attackRound(Player2Pokemon, 2);
// });
// document.getElementById('p1move4').addEventListener('click', () => {
// 	attackRound(Player2Pokemon, 3);
// });

const loadGame = async () => {
	return new Game;
};

export class Game
{
	constructor()
	{
		
		this.Player1Pokemon = new Pokemon();
		this.Player2Pokemon = new Pokemon();

		this.gameOver = true;
		this.load();
	}

	async load()
	{
		init(this);
	}

	attackRound(target, attackIndex) {
		if (gameOver == false) {
			var fasterPokemon = helper.whoGoesFirst(Player1Pokemon, Player2Pokemon);
	
			if (fasterPokemon == 1) {
				Player1Pokemon.attack(target, attackIndex);
	
				if (Player2Pokemon.getCurrHealth() > 0) {
					Player2Pokemon.attack(Player1Pokemon, Math.floor(Math.random() * 4));
				}
			} else if (fasterPokemon == 2) {
				Player2Pokemon.attack(Player1Pokemon, Math.floor(Math.random() * 4));
	
				if (Player1Pokemon.getCurrHealth() > 0) {
					Player1Pokemon.attack(target, attackIndex);
				}
			}
		}
	
		gameOver = checkIfFainted();
	}
	
	checkIfFainted() {
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
	

}

async function init(theGame) {
	await api.loadPokemonFromAPI(helper.choosePokemon(136), 1, theGame.Player1Pokemon, 100);
	await api.loadPokemonFromAPI(helper.choosePokemon(9), 2, theGame.Player2Pokemon, 100);

	await api.loadMoveFromAPI('flamethrower', theGame.Player1Pokemon);
	await api.loadMoveFromAPI('bite', theGame.Player1Pokemon);
	await api.loadMoveFromAPI('inferno', theGame.Player1Pokemon);
	await api.loadMoveFromAPI('tackle', theGame.Player1Pokemon);

	await api.loadMoveFromAPI('hydro-pump', theGame.Player2Pokemon);
	await api.loadMoveFromAPI('ice-beam', theGame.Player2Pokemon);
	await api.loadMoveFromAPI('surf', theGame.Player2Pokemon);
	await api.loadMoveFromAPI('iron-tail', theGame.Player2Pokemon);

	return this;
}


export{
	loadGame
}