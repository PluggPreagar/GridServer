// https://www.w3schools.com/howto/howto_js_draggable.asp
//
// Make the DIV element draggable:
//dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var elemHeader = document.getElementById(elmnt.id + "header");
  if (!elemHeader) {
    elemHeader = elmnt.getElementsByClassName("dragHandle")[0];
  }
  if (elemHeader) {
    // if present, the header is where you move the DIV from:
    elemHeader.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    // console.debug("drag " + elmnt.style.top + " " + elmnt.offsetTop + " " + pos2);
    // orig
    //elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    //elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    // FOX
    elmnt.style.top = (elmnt.style.top.replace("px","") - pos2) + "px";
    elmnt.style.left = (elmnt.style.left.replace("px","") - pos1) + "px";
    
    // console.debug("drag " + elmnt.style.top + " " + elmnt.offsetTop + " ");
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}