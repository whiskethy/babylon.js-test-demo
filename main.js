export var delayCreateScene = function (engine, canvas) {
	var scene = new BABYLON.Scene(engine);

	var baseUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/";

	Promise.all([
		BABYLON.SceneLoader.ImportMeshAsync(null, baseUrl + "BoomBox/glTF/", "BoomBox.gltf", scene).then(function (result) {
			result.meshes[0].position.x = 0.01;
		}),
		BABYLON.SceneLoader.ImportMeshAsync(null, baseUrl + "Avocado/glTF/", "Avocado.gltf", scene).then(function (result) {
			result.meshes[0].position.x = -0.01;
			result.meshes[0].position.y = -0.01;
			result.meshes[0].scaling.scaleInPlace(0.25);
		})
	]).then(() => {
		scene.createDefaultCameraOrLight(true, true, true);
		scene.activeCamera.alpha += Math.PI;
	});

	return scene;
};