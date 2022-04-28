const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration : true,
      contextIsolation : false
    }
  })
  win.webContents.openDevTools();
  ipcMain.on('search', (event, data) => {
    win.webContents.findInPage(data.txt, data.opts);
  })
  win.on('found-in-page', (event, result) => {
    if (result.finalUpdate) {
      win.webContents.send('search-result', {
	total : result.matches,
        current : result.activeMatchOrdinal
      });
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
