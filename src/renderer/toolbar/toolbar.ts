const urlBar = document.getElementById("url-bar") as HTMLInputElement;
const urlForm = document.getElementById("url-form") as HTMLFormElement;
const goButton = document.getElementById("go") as HTMLButtonElement;

function navigateToURL(event: Event) {
  event.preventDefault();
  const url = urlBar.value.trim();
  if (url) {
    console.log("Navigating to:", url);
    window.electron.ipcRenderer.send("load-url", url);
  }
}

urlBar.addEventListener("keypress", (event) => {
  if (event.key === "Enter") navigateToURL(event);
});

goButton.addEventListener("click", navigateToURL);
urlForm.addEventListener("submit", navigateToURL);
console.log("renderer/toolbar/toolbar.ts");
