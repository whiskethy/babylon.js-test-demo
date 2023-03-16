

  
function loadMoveFromAPI(moveName) {
	var moveUrl = "https://pokeapi.co/api/v2/move/" + moveName;
	return fetch(moveUrl)
	  .then(
			response => response.json()
		)
	  .catch(error => console.error("Error fetching Move data", error));
  }

export { loadMoveFromAPI };