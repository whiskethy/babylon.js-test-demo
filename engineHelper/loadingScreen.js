export function createLoadingScreen(canvas) {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loadingScreen';
    loadingScreen.style.position = 'absolute';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.backgroundColor = '#F4F5F8';
    loadingScreen.style.zIndex = '100';
  
    const loadingGif = document.createElement('img');
    loadingGif.src = 'media/pokeball.gif';
    loadingGif.alt = 'Loading...';
    loadingScreen.appendChild(loadingGif);
  
    canvas.parentElement.appendChild(loadingScreen);
  
    return loadingScreen;
  }
  
  
export function removeLoadingScreen(loadingScreen) {
    loadingScreen.remove();
  }