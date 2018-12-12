const { app, BrowserWindow, dialog } = require('electron');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({width: 600, height: 500, resizable: false});
    mainWindow.loadFile(__dirname + '/assets/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    app.quit()
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});
