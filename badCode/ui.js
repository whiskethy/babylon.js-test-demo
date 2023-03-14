// ui.js

function createPokemonImage(name, url) {
    // Create an image panel
    var imagePanel = new BABYLON.GUI.Image("imagePanel", url);
    imagePanel.width = "200px";
    imagePanel.height = "200px";
    imagePanel.paddingTop = "20px";
    
    // Add the Pokemon name as a text label
    var nameLabel = new BABYLON.GUI.TextBlock("nameLabel", name);
    nameLabel.fontSize = 24;
    nameLabel.color = "white";
    nameLabel.paddingTop = "10px";
    imagePanel.addControl(nameLabel);
    
    // Add buttons for the Pokemon moves
    for (var i = 1; i <= 4; i++) {
      var button = BABYLON.GUI.Button.CreateSimpleButton("button", "Flamethrower");
      button.width = "150px";
      button.height = "40px";
      button.color = "white";
      button.background = "green";
      button.paddingTop = "10px";
      imagePanel.addControl(button);
    }
    
    return imagePanel;
  }
  
  function createVsText() {
    // Create a text label for the VS text
    var vsText = new BABYLON.GUI.TextBlock("vsText", "VS");
    vsText.fontSize = 36;
    vsText.color = "white";
    vsText.paddingTop = "100px";
    return vsText;
  }
  
  function createUI(pokemon1, pokemon2) {
    // Create a GUI panel to hold the UI elements
    var guiPanel = new BABYLON.GUI.StackPanel("guiPanel");
    guiPanel.width = "100%";
    guiPanel.height = "100%";
    guiPanel.isVertical = false;
  
    // Add the Pokemon images and VS text to the GUI panel
    guiPanel.addControl(createPokemonImage(pokemon1.name, pokemon1.imageUrl));
    guiPanel.addControl(createVsText());
    guiPanel.addControl(createPokemonImage(pokemon2.name, pokemon2.imageUrl));
  
    return guiPanel;
  }
  
  export { createUI };
  