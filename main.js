var createScene = function (engine, canvas) {
    var scene = new BABYLON.Scene(engine);

    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);

    var unitVec = new BABYLON.Vector3(1, 1, 1);
    sphere.scaling = unitVec.scale(5);

    var oldgui = document.getElementById("datGUI");
    if (oldgui != null) {
        oldgui.remove();
    }

    var gui = new dat.GUI();
    gui.domElement.style.marginTop = "100px";
    gui.domElement.id = "datGUI";
    var options = {
        diameter: 0.1,
    }

    gui.add(options, "diameter", 0.1, 20).onChange(function (value) {
        sphere.scaling = unitVec.scale(value);
    });
    return scene;
}

export
{
    createScene
}