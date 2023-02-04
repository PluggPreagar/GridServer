let grids = [];
let value_current = "";

function createGridContainer(qry) {
    let container = document.getElementById( "grid_container" );
    let grid_tmpl = document.getElementById( "grid_tmpl" );

    let grid_master = grid_tmpl.cloneNode(true);
    container.appendChild( grid_master );
    let grid = new Grid( grid_master.getElementsByClassName( "grid-container" )[0] );
    grid_master.grid=grid; // allow access to grid via div ...
    grid_master.id='grid'+grid.gridNo;
    dragElement(grid_master);

    grid.codeMirror = createCodeMirror( grid_master.getElementsByClassName("codeMirrorAnker")[0] );
    grid.codeMirror.cm_grid = grid; // add grid to cm - to allow cm call matching  grid
    grid_master.style.display = "block";
    //
    getUrl2GridQry(grid, qry);
    initGridInputListener(grid_master);
}


createGridContainer();
createGridContainer();




// msg_init();

// dragElement(document.getElementById("mydiv"));

document.getElementById("logDiv").addEventListener('click', function init() {
  resizeInit(this);
}, false);
