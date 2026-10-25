const shortcuts = [
  {name:"Copy", description:"Copy selected text, files, or items", keys:["Ctrl","C"], category:"Editing"},
  {name:"Cut", description:"Cut selected text or items", keys:["Ctrl","X"], category:"Editing"},
  {name:"Paste", description:"Paste copied or cut content", keys:["Ctrl","V"], category:"Editing"},
  {name:"Undo", description:"Undo the last action", keys:["Ctrl","Z"], category:"Editing"},
  {name:"Redo", description:"Redo or repeat an action in many apps", keys:["Ctrl","Y"], category:"Editing"},
  {name:"Select all", description:"Select all text or items", keys:["Ctrl","A"], category:"Editing"},
  {name:"Find", description:"Find text in the current page or document", keys:["Ctrl","F"], category:"Editing"},
  {name:"Save", description:"Save the current file", keys:["Ctrl","S"], category:"Editing"},
  {name:"Bold", description:"Make selected text bold in many editors", keys:["Ctrl","B"], category:"Editing"},
  {name:"New tab", description:"Open a new browser tab", keys:["Ctrl","T"], category:"Browser"},
  {name:"Close tab", description:"Close the current browser tab", keys:["Ctrl","W"], category:"Browser"},
  {name:"Reopen closed tab", description:"Restore the most recently closed tab", keys:["Ctrl","Shift","T"], category:"Browser"},
  {name:"Next tab", description:"Move to the next tab in most browsers", keys:["Ctrl","Tab"], category:"Browser"},
  {name:"Previous tab", description:"Move to the previous tab in most browsers", keys:["Ctrl","Shift","Tab"], category:"Browser"},
  {name:"Address bar", description:"Focus the browser address bar", keys:["Ctrl","L"], category:"Browser"},
  {name:"Refresh page", description:"Reload the current page", keys:["Ctrl","R"], category:"Browser"},
  {name:"Private window", description:"Open an Incognito window in Chrome", keys:["Ctrl","Shift","N"], category:"Browser"},
  {name:"Zoom in", description:"Increase page zoom in most browsers", keys:["Ctrl","+"], category:"Browser"},
  {name:"Zoom out", description:"Decrease page zoom in most browsers", keys:["Ctrl","-"], category:"Browser"},
  {name:"Screenshot selection", description:"Select an area to capture on Windows 10/11", keys:["Win","Shift","S"], category:"Screenshots"},
  {name:"Full screenshot", description:"Capture the screen to the clipboard on many systems", keys:["PrtScn"], category:"Screenshots"},
  {name:"Save screenshot", description:"Save a screenshot to Pictures/Screenshots on supported Windows versions", keys:["Win","PrtScn"], category:"Screenshots"},
  {name:"Emoji panel", description:"Open the emoji and symbol picker", keys:["Win","."], category:"Productivity"},
  {name:"Clipboard history", description:"Open clipboard history; enable it in Settings first", keys:["Win","V"], category:"Productivity"},
  {name:"Lock PC", description:"Lock your Windows computer", keys:["Win","L"], category:"Productivity"},
  {name:"Task Manager", description:"Open Task Manager directly", keys:["Ctrl","Shift","Esc"], category:"Productivity"},
  {name:"Switch apps", description:"Switch between open apps", keys:["Alt","Tab"], category:"Productivity"},
  {name:"Show desktop", description:"Show or restore desktop windows", keys:["Win","D"], category:"Productivity"},
  {name:"File Explorer", description:"Open File Explorer", keys:["Win","E"], category:"Productivity"},
  {name:"Settings", description:"Open Windows Settings", keys:["Win","I"], category:"Productivity"},
  {name:"Snap window", description:"Snap the active window using Windows Snap", keys:["Win","← / →"], category:"Productivity"}
];

let selectedCategory = "All";
const searchInput = document.getElementById("search");
const list = document.getElementById("shortcut-list");
const empty = document.getElementById("empty");
const count = document.getElementById("result-count");
const categoryButtons = [...document.querySelectorAll(".category")];

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = shortcuts.filter(item => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const searchable = [item.name, item.description, item.category, item.keys.join(" ")].join(" ").toLowerCase();
    return categoryMatch && searchable.includes(query);
  });

  list.replaceChildren();
  count.textContent = `${filtered.length} shortcut${filtered.length === 1 ? "" : "s"}`;
  empty.hidden = filtered.length > 0;

  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = "shortcut";

    const info = document.createElement("div");
    const title = document.createElement("p");
    title.className = "shortcut-name";
    title.textContent = item.name;
    const desc = document.createElement("p");
    desc.className = "shortcut-desc";
    desc.textContent = item.description;
    info.append(title, desc);

    const keys = document.createElement("div");
    keys.className = "keys";
    item.keys.forEach(key => {
      const keyEl = document.createElement("kbd");
      keyEl.textContent = key;
      keys.append(keyEl);
    });

    card.append(info, keys);
    list.append(card);
  });
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    categoryButtons.forEach(item => item.classList.toggle("active", item === button));
    render();
  });
});
searchInput.addEventListener("input", render);
render();
