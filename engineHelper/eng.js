import * as engineHelper from '../engineHelper/camera.js';
import { loadGame } from '../game.js';


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


	loadGame(advancedTexture);
	

	// Start the assets manager
	assetsManager.onFinish = function (tasks) {
		// Start the engine and render loop after all assets have loaded
		engine.runRenderLoop(function () {
			scene.render();
		});
	};
	assetsManager.load();
}
