const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');


let loginWindow, vaultWindow;
app.on('ready', () => {
  loginWindow = new Window({
    height: 350,
    width: 250,
    resizable: false,
    title: 'notevault',
    frame: false
  }, 'login/login.html', [ 'login', login ]);


  app.on('close', e => {
    console.log(e);
  });
});

function createVault() {
  vaultWindow = new Window({
    height: 750,
    width: 600,
    title: 'vault',
    resizable: true,
    frame: false
  }, 'vault/vault.html', ['login', login]);

}


class Window {
  constructor(attributes, url, ipc) {
    const win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      },
      height: attributes.height,
      width: attributes.width,
      resizable: attributes.resizable,
      title: attributes.title,
      frame: false
    });
    win.loadURL(path.join(__dirname, url));
    // Receive confirmation
    ipcMain.on(ipc[0], ipc[1]);
  }
}

function login(e) {
  console.log(`received login request.`);
  if(!vaultWindow) createVault();
  loginWindow = null;
}