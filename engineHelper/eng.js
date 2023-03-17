import * as engineHelper from '../engineHelper/camera.js';
import { loadGame, setupGame, successfulTasks} from '../game.js';
import { createLoadingScreen, removeLoadingScreen } from './loadingScreen.js';

const totalTasks = 10;

export function loadEngine() {
	// Create a new scene and engine
	var canvas = document.getElementById('renderCanvas');
	var engine = new BABYLON.Engine(canvas, true);
	var scene = new BABYLON.Scene(engine);

	engine.displayLoadingUI = function () {};
	engine.hideLoadingUI = function () {};

	// Create a new assets manager
	var assetsManager = new BABYLON.AssetsManager(scene);

	// Create a new GUI
	var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
	// Set the scaling mode to always maintain a fixed size
	advancedTexture.scaleToWidth = 1376;
	advancedTexture.scaleToHeight = 768;

	// Create the loading screen
	var loadingScreen = createLoadingScreen(canvas);

	loadGame(loadingScreen, advancedTexture, assetsManager);


	assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
		console.log(lastFinishedTask.name + " is done. " + remainingCount + ' out of ' + totalCount + ' assets still loading.');
	};

	// Start the assets manager
	assetsManager.onFinish = function (tasks) {
		console.log("finished loading assets");

		if (successfulTasks === totalTasks) {
			removeLoadingScreen(loadingScreen);
		}

		scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);

		// Create a new camera and position it
		engineHelper.createCamera(scene, canvas);
		
		setupGame(advancedTexture);

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
