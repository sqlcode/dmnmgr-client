import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as NodeGit from 'nodegit';

require('v8-compile-cache');

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

// const NodeGit = require('nodegit');
(<any>global).nodegit = NodeGit;
(<any>global).getCredentials = (privateKey: string, publicKey: string) => {
    return {
        callbacks: {
            certificateCheck: () => 1,
            credentials: (gitUrl: string, userName) => {
                const cred = NodeGit.Cred.sshKeyMemoryNew(userName, publicKey, privateKey, '');
                return cred;
            },
        }
    };
};

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    title: 'dmnmgr',
    icon: path.join(__dirname, 'favicon.64x64.png'),
    webPreferences: {
        devTools: serve,
        nodeIntegration: true,
    }
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('browser-window-created', (e, window) => {
    window.setMenu(null);
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
