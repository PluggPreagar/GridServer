function classNext(elem, classes) {
  // toggle classe with multiple states .. wenn nichts gefunden wird nimmt ersten wert
  let i = 0;
  for (let index = 0; index < classes.length; index++) {
    if (elem.classList.contains(classes[index])) {
      elem.classList.remove(classes[index]);
      i = index + 1 < classes.length ? index + 1 : 0;
      break;
    }
  }
  console.debug("classNext: " + i);
  elem.classList.add(classes[i]);
  return i; // not found
}






function controller(grid, qry, elem) {
  console.debug("controller >> " + qry + "  " + (elem ?? ""));
  if (qry.match(/READ:/)) {
    contextMenuCircularClose(); getDataFromUrlAsync(grid);
  } else if (qry.match(/RESET:/)) {
    contextMenuCircularClose(); grid.resize_items(5, 5); grid.reset(); grid.load();
  } else if (qry.match(/FILTER:/)) {
    elem.classList.toggle('icon-inactiv');
  } else if (qry.match(/SORT:/)) {
    //var sort = classNext( elem, [ "fa-sort", "fa-sort-alpha-asc", "fa-sort-alpha-desc" ]);
    //var sort = classNext( elem, [ "fa-sort", "fa-sort-asc", "fa-sort-desc" ]);
    var sortModeIdx = classNext(elem, ["fa-sort", "fa-chevron-down", "fa-chevron-up"]);
    // grid.sortModeAvail = ["","asc","desc","num-asc","num-desc"];
    // expect "SORT:<col>"
    grid.sort(1 * qry.replace(/.*:/, ""), grid.sortModeAvail[sortModeIdx]); // enforce int //or from parent node ...
  }

}