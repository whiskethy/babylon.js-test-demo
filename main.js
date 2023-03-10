import * as game from '/game.js';

var theGame = null;

function resolveAfter2Seconds(engine, canvas) {
	return new Promise(
        (resolve) => {
		    game.loadGame().then((game) => {
                console.log('loaded');
                
                //theGame = game;

                console.log(game);
                console.log(game.Player1Pokemon);
                engine.hideLoadingUI();
                loadScene(engine, canvas, game);
            });
	    }
    );
}



async function f1(engine, canvas) {
	return await resolveAfter2Seconds(engine, canvas);
	console.log("yo"); // 10
}

//f1();

var delayCreateScene = function (engine, canvas) {
    f1(engine, canvas);
};

var loadScene = function (engine, canvas, theGame) {
    
    console.log(theGame.Player1Pokemon.getName());

	var scene = new BABYLON.Scene(engine);

	scene.createDefaultCamera(true, true, true);

	createScene(engine, canvas, game);

	// BABYLON.SceneLoader.ImportMesh(
	//     "",
	//     "https://models.babylonjs.com/CornellBox/",
	//     "cornellBox.glb",
	//     scene,
	//     function () {
	//         scene.createDefaultCamera(true, true, true);
	//         scene.createDefaultEnvironment();
	//         scene.activeCamera.alpha = Math.PI / 2;

	//         engine.hideLoadingUI();

	//     });
	return scene;
}

var createScene = async function (engine, canvas, theGame) {
	await theGame.loadGame(() => {
		console.log('loaded');
		engine.hideLoadingUI();
	});
};
// var theGame = new game.Game()=>{
//     engine.hideLoadingUI();
// };

//     console.log(theGame.Player1Pokemon);

//     var scene = new BABYLON.Scene(engine);

//     var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
//     var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 100, new BABYLON.Vector3.Zero(), scene);
//     camera.attachControl(canvas, true);

//     var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);

//     const ground = BABYLON.MeshBuilder.CreateGround("ground",  {width: 6, height: 6}, scene);
//     ground.position.y = -2;

//     var unitVec = new BABYLON.Vector3(1, 1, 1);
//     sphere.scaling = unitVec.scale(5);

//     var oldgui = document.getElementById("datGUI");
//     if (oldgui != null) {
//         oldgui.remove();
//     }

//     var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
//     advancedTexture.idealWidth = 1366; // used to define the scale of the UI (set to the size of chromebooks)

//     const pokemon1ImageString = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png";

//     console.log(theGame.Player1Pokemon.getName());

//     const pokemon2ImageString = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png";

//     const button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("but", "Click Me", pokemon1ImageString);
//     button.width = "250px";
//     button.left = "-250px"
//     button.height = "250px";
//     button.color = "white";
//     //button.background = "green";
//     advancedTexture.addControl(button);

//     //1366 x 768

//     const button2 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("but", "Click Me 2", pokemon1ImageString);
//     button2.width = "250px";
//     button2.left = "250px"
//     button2.height = "250px";
//     button2.color = "white";
//     button2.background = "green";
//     advancedTexture.addControl(button2);

//     var gui = new dat.GUI(); //a hovering ui: could use for selecting pokemon maybe?
//     gui.domElement.style.marginTop = "100px";
//     gui.domElement.id = "datGUI";
//     var options = {
//         diameter: 5,
//         color: "#ff0000"
//     }

//     gui.add(options, "diameter", 5, 120).onChange(function (value) {
//         sphere.scaling = unitVec.scale(value);
//     });
//     gui.add(options, "color", 5, 120).onChange(function (value) {
//         //sphere.material = new BABYLON.StandardMaterial("sphere", scene);
//     });
//     return scene;
// }

// BABYLON.GUI.Button.CreateMyCustomButton = function (name, text, imageUrl) {
//     const result = new BABYLON.GUI.Button(name);

//     // Adding text
//     const textBlock = new BABYLON.GUI.TextBlock(name + "_button", text);
//     textBlock.textWrapping = true;
//     textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
//     textBlock.paddingLeft = "20%";
//     result.addControl(textBlock);

//     // Adding image
//     const iconImage = new BABYLON.GUI.Image(name + "_icon", imageUrl);
//     iconImage.width = "20%";
//     iconImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
//     iconImage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
//     result.addControl(iconImage);

//     return result;
//   };

export { createScene, delayCreateScene };
