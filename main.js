// Modules to control application life and create native browser window
const {app,Tray, Menu, BrowserWindow} = require('electron')
const path = require('path')
//app.dock.bounce()
//app.dock.setMenu(null)
//app.dock.setIcon(new Tray(path.join(__dirname,"./logo.png")))
Menu.setApplicationMenu(null)
function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    title: 'Teachable Machine',
    frame: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadURL('https://train.aimaker.space/train')
  mainWindow.webContents.addListener('page-title-updated', (event, title, explicitSet)=>{
    if (title === '英荔 AI 训练平台 | Teachable Machine'){
      mainWindow.title = "Teachable Machine"
    }
  })
  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
