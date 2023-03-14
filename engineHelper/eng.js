import { fetchPokemonData } from '../modules/testApi.js';
import * as engineHelper from '../engineHelper/camera.js';
import * as UIHelper from '../engineHelper/uiHelper.js';

export function loadEngine() {
	// Create a new scene and engine
	var canvas = document.getElementById('renderCanvas');
	var engine = new BABYLON.Engine(canvas, true);
	var scene = new BABYLON.Scene(engine);

	// Create a new camera and position it
	engineHelper.createCamera(scene, canvas);
	// Create a new assets manager
	var assetsManager = new BABYLON.AssetsManager(scene);

	// Create a new GUI
	var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

	// Define the onProgress function
	function onProgress(remainingCount, totalCount, lastFinishedTask) {
		console.log(remainingCount + ' out of ' + totalCount + ' assets still loading.');
	}

	// Call the fetchPokemonData function to get the Pokemon data
	fetchPokemonData(186).then((pokemonData) => {
		// Create a new button for the Pokemon and add it to the GUI
		var pokemonName = pokemonData.name;
		var button = UIHelper.createButton(pokemonName, -100, 0);
		advancedTexture.addControl(button);
	});

	fetchPokemonData(25).then((pokemonData) => {
		// Create a new button for the Pokemon and add it to the GUI
		var pokemonName = pokemonData.name;
		var button = UIHelper.createButton(pokemonName, 100, 0);
		advancedTexture.addControl(button);
	});

	// Start the assets manager
	assetsManager.onFinish = function (tasks) {
		// Start the engine and render loop after all assets have loaded
		engine.runRenderLoop(function () {
			scene.render();
		});
	};
	assetsManager.load();
}
