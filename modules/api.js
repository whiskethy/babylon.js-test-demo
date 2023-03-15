import * as stats from '../modules/stats.js';


function fetchPokemonData(pokemonId, playerNumber, pokeObject, level = 100) {
    var pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    return fetch(pokemonUrl)
      .then(
			response => response.json()
		)
      .catch(error => console.error("Error fetching Pokemon data", error));
  }
  

const loadPokemonFromAPI = async (id, playerNumber, pokeObject, level = 100) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokeman = await res.json();
	return displayPokemonToWebpage(pokeman, playerNumber, pokeObject, level);
};

const displayPokemonToWebpage = (thePokemon, playerNumber, pokeObject, level) => {


	const statNumStr = thePokemon.stats.map((stat) => stat.base_stat).join(',');
	var statArray = statNumStr.split(',');

	const learnableMoves = thePokemon.moves.map((moves) => moves.move.name).join(',');
	var moveArray = learnableMoves.split(',');

	var calcHealth = stats.calculateMaxHP(statArray[0], level);

	//Used to create the nice icons showing pokemon type
	var iconStringHolder = '';

	//set the object that was passed in: don't need to import it then!
	pokeObject.setPokemon(thePokemon, typeArray, statArray, level, learnableMoves, playerNumber);

	
};

const loadMoveFromAPI = async (name, pokemonObject) => {
	const url = `https://pokeapi.co/api/v2/move/${name}`;
	fetch(url)
		.then((response) => response.json())
		.then((theMove) => {
			const dataMap = new Map();

			for (const [key, value] of Object.entries(theMove)) {
				dataMap.set(key, value);
			}

			pokemonObject.setMove(dataMap);
		})
		.catch((error) => {
			console.error('Error fetching move data:', error);
		});
};

const loadMoveDataToWebPage = (theMove, pokemonObject, attackIndex) => {

};

export { loadPokemonFromAPI, displayPokemonToWebpage, loadMoveDataToWebPage, loadMoveFromAPI };