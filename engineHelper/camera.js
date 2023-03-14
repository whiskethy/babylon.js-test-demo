export function createCamera(scene, canvas)
{
    var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
        camera.setPosition(new BABYLON.Vector3(0, 0, 20));
        camera.attachControl(canvas, true);

    return camera;

}