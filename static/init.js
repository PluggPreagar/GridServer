
let value_current = "";

function getDataFromUrl(grid) {
  getDataFromUrlAsync(grid);
}



let grid_master = document.getElementById( "grid" );
let grid = new Grid( grid_master.getElementsByClassName( "grid-container" )[0] );
dragElement(grid_master); // has class "draggable"
grid.codeMirror = createCodeMirror( grid_master.getElementsByClassName("codeMirrorAnker")[0] );
grid.codeMirror.cm_grid = grid; // add grid to cm - to allow cm call matching  grid


grid.load();
getDataFromUrl(grid);




let container = document.getElementById( "grid_container" );
let grid_tmpl = document.getElementById( "grid_tmpl" );
let grid_master2 = grid_tmpl.cloneNode(true);
//grid_master2.innerHTML = grid_tmpl.innerHTML;
container.appendChild( grid_master2 );
let grid2 = new Grid( grid_master2.getElementsByClassName( "grid-container" )[0] );
dragElement(grid_master2);
grid2.codeMirror = createCodeMirror( grid_master2.getElementsByClassName("codeMirrorAnker")[0] );
grid2.codeMirror.cm_grid = grid2; // add grid to cm - to allow cm call matching  grid
grid_master2.style.display = "block";
//
grid2.load();
getDataFromUrl(grid2);



// msg_init();

// dragElement(document.getElementById("mydiv"));

document.getElementById("logDiv").addEventListener('click', function init() {
  resizeInit(this);
}, false);
