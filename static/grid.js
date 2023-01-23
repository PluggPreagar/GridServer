class Grid {

  constructor() {
    this.items = [["", 2, 3], [4, 5, 6], [7, 8, 9]];
  }

  input_end(e, val) {
    log("< END > " + e.target.id + ": " + val);
  }



  load(rowLimit = 0) {
    if (0 == rowLimit || this.items.length < rowLimit) {
      rowLimit = this.items.length;
    }
    let eGrid = document.getElementById("grid-container");
    eGrid.innerHTML = "";
    //
    eGrid.style.gridTemplateColumns = "20px" + " auto".repeat(this.items.length < 1 ? 1 : this.items[0].length - 1);
    //
    for (let r = 0; r < rowLimit; r++) {
      for (let c = 0; c < this.items[0].length; c++) {
        var item = document.createElement('div');
        item.id = "grid_" + r + "_" + c;
        if (0 == r) {
          item.classList.add("grid-head");
        } else if (0 == c) {
          item.classList.add("grid-idx");
        } else {
          item.classList.add("grid-item");
          item.onclick = function(e) { enableEditing(e.target) };
          if (r % 2 == 1) item.classList.add("grid-odd"); // ignore head row ...
        }
        item.setAttribute("contenteditable", "true");
        item.innerHTML = this.items[r][c];
        eGrid.appendChild(item);
      } // c
    } // r
    log("loaded " + this.items.length + " x " + this.items[0].length);
    document.getElementById("grid_size").innerHTML = (this.items.length < 1 ? 0 : this.items[0].length) + " x " + this.items.length;

  }

  load_add(params) {

    eGrid = document.getElementById("grid-container");
    lastId = eGrid.getLastChild.getId;
    lastRow = lastId.replace(/grid_([0-9]+)_.*/, '$1');
    // ensure same  width ....
    //
    for (let r = lastRow; r < this.items.length; r++) {
      for (let c = 0; c < this.items[0].length; c++) {
        var item = document.createElement('div');
        item.id = "grid_" + r + "_" + c;
        if (0 == r) {
          item.classList.add("grid-head");
        } else if (0 == c) {
          item.classList.add("grid-idx");
        } else {
          item.classList.add("grid-item");
          item.onclick = function(e) { enableEditing(e.target) };
          if (r % 2 == 0) item.classList.add("grid-odd");
        }
        item.setAttribute("contenteditable", "true");
        item.innerHTML = this.items[r][c];
        eGrid.appendChild(item);
      } // c
    } // r
    log("loaded " + this.items.length + " x " + this.items[0].length);
    document.getElementById("grid_size").innerHTML = (this.items.length < 1 ? 0 : this.items[0].length) + " x " + items.length;

  }


  reset() {
    let i = 1;
    for (let r = 0; r < this.items.length; r++) {
      for (let c = 0; c < this.items[0].length; c++) {
        this.items[r][c] = i++;
      }
    }
  }


  resize_items(size, size2) {
    array_resize_2dim(this.items, 3, 3, 'X');
  }

  setData(r) {
    console.debug("getDataFromUrl");
    console.debug(r);
    let d1 = r.split("\n");
    //if (d1[d1.length-1].length < 1 ) {
    d1.pop(); // closing \n
    //}
    this.resize_items(d1.length, 1);
    //for (let i = 0; i < 5; i++) {
    for (let i = 0; i < d1.length; i++) {
      let d2 = d1[i].split(";");
      this.items[i] = d2;
    }
  }

}