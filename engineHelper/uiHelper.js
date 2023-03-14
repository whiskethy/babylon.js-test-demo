function createButton(pokemonName, positionX, positionY) {
    var button = BABYLON.GUI.Button.CreateSimpleButton("button", pokemonName);
    button.width = "150px";
    button.height = "40px";
    button.color = "white";
    button.background = "green";
    button.onPointerUpObservable.add(function() {
        console.log("Clicked the " + pokemonName + " button!");
    });
    button.left = positionX + "px";
    button.top = positionY + "px";
    return button;
  }


  export { createButton };