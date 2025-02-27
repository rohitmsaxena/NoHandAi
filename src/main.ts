import { app, BaseWindow, ipcMain, WebContentsView } from "electron";
import started from "electron-squirrel-startup";
import path from "path";
import fs from "fs";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const width = 1000;
const height = 800;

let baseWindow: BaseWindow;
let mainView: WebContentsView;
let toolbarView: WebContentsView;
// let view: WebContentsView; // possibly depricated
console.log("main.ts");

const createWindow = () => {
  // Create the browser window.
  baseWindow = new BaseWindow({
    width: width,
    height: height,
  });

  // Main content view
  mainView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainView.webContents.loadFile(path.join(__dirname, "renderer", "index.html"));
  mainView.setBounds({ x: 0, y: 50, width: width, height: height - 50 });

  toolbarView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // Verify that the ui.html file exists before loading it
  // const uiFilePath = path.join(app.getAppPath(), "public", "ui.html");
  const toolbarFilePath = path.join(
    __dirname,
    "renderer",
    "toolbar",
    "toolbar.html",
  );
  if (!fs.existsSync(toolbarFilePath)) {
    console.error(`UI file not found: ${toolbarFilePath}`);
    return;
  } else {
    console.log("file found");
  }

  toolbarView.webContents.loadFile(toolbarFilePath);
  toolbarView.setBounds({ x: 0, y: 0, width: width, height: 50 });

  // REPLACED WITH MAIN CONTENT VIEW
  // view = new WebContentsView();
  //
  // view.webContents.loadURL("https://www.google.com");
  // view.setBounds({ x: 0, y: 50, width: width, height: height - 50 });
  // baseWindow.contentView.addChildView(view);

  baseWindow.contentView.addChildView(toolbarView);
  baseWindow.contentView.addChildView(mainView);
};

// REPLACED
// ipcMain.on("load-url", (event, url) => {
//   console.log("the url is", url);
//   if (baseWindow) {
//     view.webContents.loadURL(url);
//   }
// });

// Listen for load-url event from the toolbar
ipcMain.on("load-url", (event, url) => {
  console.log("Received load-url event:", url);
  mainView.webContents.loadURL(url);
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // if (BrowserWindow.getAllWindows().length === 0) {
  // createWindow();
  // }
});
