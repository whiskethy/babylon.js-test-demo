import * as engineHelper from '../engineHelper/camera.js';
import { loadGame, game } from '../game.js';

export function loadEngine() {
	// Create a new scene and engine
	var canvas = document.getElementById('renderCanvas');
	var engine = new BABYLON.Engine(canvas, true);
	var scene = new BABYLON.Scene(engine);

	scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);

	// Create a new camera and position it
	engineHelper.createCamera(scene, canvas);

	// Create a new assets manager
	var assetsManager = new BABYLON.AssetsManager(scene);

	// Create a new GUI
	var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
	// Set the scaling mode to always maintain a fixed size
	advancedTexture.scaleToWidth = 1376;
	advancedTexture.scaleToHeight = 768;


	loadGame(advancedTexture, assetsManager);


	assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
		console.log(lastFinishedTask.name + " is done. " + remainingCount + ' out of ' + totalCount + ' assets still loading.');
	};

	// Start the assets manager
	assetsManager.onFinish = function (tasks) {
		console.log("finished loading assets");
		// Call the gameplay loop function here as a callback
		//gameplayLoop(pokemonData);
		game(advancedTexture);

		// Start the engine and render loop after all assets have loaded
		engine.runRenderLoop(function () {
			scene.render();
		});
	};
	assetsManager.load();

	window.addEventListener('resize', function () {
		engine.resize();
	});
}
