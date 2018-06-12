/**
 * main
 */
// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain, Tray } from 'electron';
import path from 'path';
import image from './baseline_alarm_black_18dp.png';


let window;
let tray;

// Creates tray & window
app.on('ready', () => {
    createTray();
    createWindow();
});

// Quit the app when the window is closed
app.on('window-all-closed', () => {
    app.quit()
});

// Creates tray image & toggles window on click
const createTray = () => {
    const trayIconPath = path.resolve(__dirname, image);
    tray = new Tray(trayIconPath);
    tray.on('click', function (event) {
        toggleWindow()
    })
};

const getWindowPosition = () => {
    const windowBounds = window.getBounds();
    const trayBounds = tray.getBounds();

    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));

    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 3);

    return { x: x, y: y }
};

// Creates window & specifies its values
const createWindow = () => {
    window = new BrowserWindow({
        width: 250,
        height: 310,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        transparent: true,
        'node-integration': false
    });
    const indexPath = path.resolve(__dirname, 'index.html');
    window.loadFile(indexPath);

    // Hide the window when it loses focus
    window.on('blur', () => {
        if (!window.webContents.isDevToolsOpened()) {
            window.hide()
        }
    });

    // Open the DevTools.
    window.webContents.openDevTools();
};

const toggleWindow = () => {
    if (window.isVisible()) {
        window.hide()
    } else {
        showWindow()
    }
};

const showWindow = () => {
    const position = getWindowPosition();
    window.setPosition(position.x, position.y, false);
    window.show();
    window.focus()
};

ipcMain.on('show-window', () => {
    showWindow()
});
