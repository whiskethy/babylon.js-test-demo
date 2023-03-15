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

// const loadMoveFromAPI = async (name, pokemonObject) => {
// 	const url = `https://pokeapi.co/api/v2/move/${name}`;
// 	fetch(url)
// 		.then((response) => response.json())
// 		.then((theMove) => {
// 			const dataMap = new Map();

// 			for (const [key, value] of Object.entries(theMove)) {
// 				dataMap.set(key, value);
// 			}

// 			pokemonObject.setMove(dataMap);
// 		})
// 		.catch((error) => {
// 			console.error('Error fetching move data:', error);
// 		});
// };

// const loadMoveDataToWebPage = (theMove, pokemonObject, attackIndex) => {

// };

export { loadPokemonFromAPI, loadMoveFromAPI };