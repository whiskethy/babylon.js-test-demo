import * as stats from '../modules/stats.js';


function loadPokemonFromAPI(pokemonId) {
    var pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    return fetch(pokemonUrl)
      .then(
			response => response.json()
		)
      .catch(error => console.error("Error fetching Pokemon data", error));
  }
  
function loadMoveFromAPI(moveName) {
	var moveUrl = "https://pokeapi.co/api/v2/move/" + moveName;
	return fetch(moveUrl)
	  .then(
			response => response.json()
		)
	  .catch(error => console.error("Error fetching Move data", error));
  }

export { loadPokemonFromAPI, loadMoveFromAPI };