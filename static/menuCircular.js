const contextMenuCircularId = "context-menu-circular";
const contextMenuCircular = document.getElementById(contextMenuCircularId);
const contextMenuCircularScope = document.querySelector("body"); // to DISABLE set body___


contextMenuCircular.style.top = "150px";
contextMenuCircular.style.left = "400px";
contextMenuCircular.style.heigth = "200px";
/*
contextMenuCircular.classList.add("visible");
contextMenuCircular.innerHTML += '<div>tada</div>';
contextMenuCircular.innerHTML += '<div class="cmc-item" style="top: 39px;left: 50px">tadata</div>';
contextMenuCircular.innerHTML += '<div class="cmc-item" style="top: 78px;left: 100px">tadata</div>';
*/


function addMenuItem() {
  //contextMenuCircular.style.top = "150px";
  //contextMenuCircular.style.left = "400px";
  //contextMenuCircular.style.heigth = "200px";
  //contextMenuCircular.classList.add("visible");
  contextMenuCircular.innerHTML = "";

  //                 -                        3  |  0       4 | 1
  //              <-   ->                    ----------    -------
  //             <-  x  ->                    2  |  1       3 | 2
  //
  items = ["read", "reset", "a", "b", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  items = [{ descr: "reset", icon: '<i class="fa fa-bars" style="color:red;"></i>', action: "controller(grid,'RESET:');" }
    , { descr: "read", icon: 'fa fa-file', action: "controller(grid,'READ:');" }
    , { descr: "update 2,2", icon: 'fa fa-file', action: "grid.updateData( 2,2, 'value from extern');return true;" }
    , { descr: "logFill", icon: 'fa fa-file', action: "log('a');log('ab');log('abc');log('abcd');log('a');log('ab');log('abc');log('abcd');" }
    , "a", "b", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  var bounding = contextMenuCircular.getBoundingClientRect();
  //left_min= ; left_max= ; top_min= ; top_max= ; 
  let i = 0;
  let l = 1;
  let width = 150;
  while (i < items.length) {
    for (let q = 0; q < 4 && i < items.length; q++) {
      x = (22 * (l < 4 ? 4 - l : 0) + 12) * (q < 2 ? 1 : -1) - (q < 2 ? 0 : width); // 1 & 3  --- 
      y = (23 * l - 10) * (3 == q || 0 == q ? -1 : 1);
      // txt = items[ i ];
      if ((bounding.top + y > 0) && (bounding.left + x > 0)) {
        if (!(typeof items[i] === 'object')) {
          items[i] = { descr: items[i], action: 'alert(\'' + items[i] + '\');' };
        }
        //console.log(items[i]);
        if (!(typeof items[i].icon === 'undefined' || items[i].icon.match(/^</))) {
          items[i].icon = '<i class="' + items[i].icon + '" style="color:lightblue;"></i>';
        }
        txt = 'class="cmc-item ' + (q < 2 ? '' : 'cmc-item-left') + '" ';
        txt = txt + ' style="top: ' + y + 'px;left: ' + x + 'px"';
        txt = txt + ' onclick="' + items[i].action + ';"';
        txt = txt + ' >';
        //txt = txt + '<i class="fa fa-file" style="font-size:10px;color:red;"></i>';
        if (q < 2) { txt = txt + (items[i].icon ?? "") + '        '; }
        txt = txt + items[i].descr;
        if (q > 1) { txt = txt + '        ' + (items[i].icon ?? ""); }
        contextMenuCircular.innerHTML += '<div ' + txt + '</div>';
        i = i + 1;

      } // check if inside viewport ...

    }
    l = l + 1;
  }

}


// -------------------------------------------------


const normalizePozitionCircular = (mouseX, mouseY) => {
  // ? compute what is the mouse position relative to the container element (scope)
  let {
    left: scopeOffsetX,
    top: scopeOffsetY,
  } = contextMenuCircularScope.getBoundingClientRect();

  scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
  scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;

  const scopeX = mouseX - scopeOffsetX;
  const scopeY = mouseY - scopeOffsetY;

  let normalizedX = mouseX;
  let normalizedY = mouseY;

  // ? normalize on X Y
  if (scopeX + contextMenuCircular.clientWidth > contextMenuCircularScope.clientWidth) {
    normalizedX = scopeOffsetX + contextMenuCircularScope.clientWidth - contextMenuCircular.clientWidth;
  }
  if (scopeY + contextMenuCircular.clientHeight > contextMenuCircularScope.clientHeight) {
    normalizedY = scopeOffsetY + contextMenuCircularScope.clientHeight - contextMenuCircular.clientHeight;
  }

  return { normalizedX, normalizedY };
};

contextMenuCircularScope.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  const { clientX: mouseX, clientY: mouseY } = event;
  const { normalizedX, normalizedY } = normalizePozitionCircular(mouseX, mouseY);

  contextMenuCircular.classList.remove("visible");
  contextMenuCircular.style.top = `${normalizedY}px`;
  contextMenuCircular.style.left = `${normalizedX}px`;
  addMenuItem();
  // hack to enable animation
  setTimeout(() => {
    contextMenuCircular.classList.add("visible");
  });
});

function contextMenuCircularClose(params) {
  contextMenuCircular.classList.remove("visible");
}

contextMenuCircularScope.addEventListener("click", (e) => {
  // ? close the menu if the user clicks outside of it
  if (e.target.offsetParent != contextMenuCircular) {
    contextMenuCircular.classList.remove("visible");
  }
});



// --------------------------------------------------


function addMenuItemDiv() { }

// addMenuItem();