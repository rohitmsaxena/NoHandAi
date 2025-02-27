import { ipcRenderer } from "electron";

// Listen for the `load-url` event
ipcRenderer.on("load-url", (event, url) => {
  console.log("Loading URL in main view:", url);
  // Add logic here to load the URL in your main view
  // This might involve using an iframe or a <webview> tag
});
console.log("renderer/index.ts");
