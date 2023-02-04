
//    https://javascript.info/bubbling-and-capturing

//document.getElementById("grid-container").addEventListener("input", function() {
// should work...
//document.querySelectorAll('.some-class').forEach(item => {


document.querySelector(".grid-container").addEventListener("input", function(e) {
  console.debug(e);
  //document.getElementById("log").value += e.data;  // just the current char
  // log( "<input> " + e.target.id + ": "+ e.target.innerHTML );  
  //if (e.key === 'Enter' || )
  if (e.inputType == 'insertParagraph') {
    e.preventDefault();
    grid.input_end(e, value_current);
    e.target.removeAttribute('contenteditable');
    e.target.innerHTML = value_current;
    document.activeElement.blur(); // unset focus
    e.target.classList.add("modified");

    updateGridValue( grid, grid.codeMirror.getValue(), value_current, grid.getIdxOf(e.target)
            ,function() {
              grid.storeCell( e.target); // update data behind grid ...
              e.target.classList.add("saved");
              setTimeout(function() {
                console.debug("simulated SAVE after CHANGE-VALUE");
                e.target.classList.remove("modified");
                e.target.classList.remove("saved");
              }, 3000);
            }
        );

    /*
    setTimeout(function() {
      grid.storeCell( e.target); // update data behind grid ...
      e.target.classList.add("saved");
      setTimeout(function() {
        console.debug("simulated SAVE after CHANGE-VALUE");
        e.target.classList.remove("modified");
        e.target.classList.remove("saved");
      }, 3000);
    }, 2000);
    */

    return false;
  } else {
    log("<input> " + e.target.id + ": " + e.target.innerHTML);
  }
  value_current = e.target.innerHTML; // as ENTER already create sub-divs...
}, false);

document.querySelector(".grid-container").addEventListener("input", function(e) {
}, false);

document.getElementById("grid_size").addEventListener("input", function(e) {
  console.debug(e);
  if (e.inputType == 'insertParagraph') {
    e.preventDefault();
    e.target.innerHTML = grid.items.length + " x " + (grid.items.length < 1 ? 0 : grid.items[0].length);
    e.target.removeAttribute('contenteditable');
    return false;
  } else {
    val = e.target.innerHTML;
    log("<input> " + e.target.id + ": " + e.target.innerHTML);
    if (m = val.match(/([0-9]+) x ([0-9]+)/)) {
      log("resize -  " + m[1] + " x " + m[2]);
      array_resize_2dim(grid.items, m[1], m[2], "X");
      value_current = val;
      grid.reset(); grid.load();
    } else {
      hint("resize - value must match /[0-9]+ x [0-9]+/");
    }
  }
}, false);

let msg_outdated ;
function msg_set( msg ) {
    e = document.getElementById("msg");
    e.innerHTML = msg;
    e.classList.remove("msgOutdated");
    e.classList.add("msgNew");
    setTimeout(function() {
      e.classList.add("saved_");
      setTimeout(function() {
        e.classList.remove("msgNew");
        e.classList.remove("saved");
      }, 500);
    }, 500);
    //
    if (msg_outdated) clearTimeout(msg_outdated);
    msg_outdated = setTimeout(function() {
                e.classList.add("msgOutdated");
              }, 5000);
    msg_init(); // re-init

}

function msg_init() {
    setTimeout(function() {
        console.debug("msg_init");
        msgConnection( msg_set );
    }, 3000);
}


