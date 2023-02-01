
let grid = new Grid();
let value_current = "";
myCodeMirror.cm_grid = grid; // add grid to cm - to allow cm call matching  grid



function getDataFromUrl(grid) {
  getDataFromUrlAsync(grid);
}

grid.load();
getDataFromUrl(grid);




document.getElementById("logDiv").addEventListener('click', function init() {
  resizeInit(this);
}, false);