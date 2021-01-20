const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    height: 350,
    width: 250,
    resizable: false,
    title: 'notevault',
    frame: false
  });
  mainWindow.loadURL(path.join(__dirname, 'login/login.html'));
});