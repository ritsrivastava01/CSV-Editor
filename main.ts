import {
  app,
  BrowserWindow,
  screen,
  Menu,
  globalShortcut,
  MenuItem
} from 'electron';
import * as path from 'path';
import * as url from 'url';
const shell = require('electron').shell;
const remote = require('electron').remote;

let win, serve;
const args = process.argv.slice(1);
const menu = new Menu();

serve = args.some(val => val === '--serve');

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  globalShortcut.register('CommandOrControl+S', () => {
    win.webContents.send('saveFile', 'save-file');
  });

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width - 200,
    height: size.height - 200,
    icon: __dirname + 'assets/icons/win/64x64.png',
    webPreferences: {
      nodeIntegration: true
    }
  });
  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  createMenu();
  // createContextMenu(win);
}

// function createContextMenu(win: BrowserWindow) {
//   // Build menu one item at a time, unlike
//   menu.append(
//     new MenuItem({
//       label: 'Save File As',
//       click() {
//         console.log(this);
//         win.webContents.send('saveFile', 'save-file');
//         // this.saveFile();
//       }
//     })
//   );

//   menu.append(new MenuItem({ type: 'separator' }));
//   menu.append(
//     new MenuItem({
//       label: 'Reload',
//       click() {
//         win.webContents.send('saveFile', 'save-file');
//       }
//     })
//   );

//   // Prevent default action of right click in chromium. Replace with our menu.
//   win.webContents.addListener('contextmenu', e => {
//     e.preventDefault();
//     menu.popup();
//   });
// }

function createMenu() {
  // Other code removed for brevity

  const ApplicationMenu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        { label: 'Upload CSV', accelerator: 'CmdOrCtrl+Shift+U' },
        { label: 'Save All', accelerator: 'CmdOrCtrl+Shift+S' },
        { label: 'Save', accelerator: 'CmdOrCtrl+S' },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'Esc',
          click() {
            app.quit();
          }
        },
        {
          label: 'GitHub',
          click() {
            shell.openExternal('http://google.com');
          }
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(ApplicationMenu);
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
