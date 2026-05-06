const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    title: "Sim Panda - Study in China Simulator",
    icon: path.join(__dirname, 'images', 'simulator', 'hub_bg.png') // Temporary icon
  });

  // Remove the default menu bar as it's a game
  setMenu(mainWindow);

  // Load the standalone HTML file compiled earlier
  mainWindow.loadFile('index.html');
}

function setMenu(mainWindow) {
    Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
