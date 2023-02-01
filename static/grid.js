class Grid {


  constructor() {
    this.items = [["", 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15]];
    this.lenMax = [];
    this.sortModeIcons = ["fa-sort", "fa-chevron-down", "fa-chevron-up"];
    this.sortModeAvail = ["", "asc", "desc", "num-asc", "num-desc"];
    this.sortMode = null;
    this.sortOrder = null;
    this.sortIdx = null;   // row mapping from itmes to sorted-display
    this.filterRowCollAttr = null; // filter rows by attributes per Column
    this.filterRowIdx = null; // filter rows - rows that are filtered .. filter = Skipped ...
    this.rowOffset = 0; // allow to scroll via rows ...
    this.colOrderIdx = null; // allow to reorder columns - without changing data 
    this.colFilterIdx = null; // just skipp columns in view ...
    this.colsDef = [];
  }

  input_end(e, val) {
    log("< END > " + e.target.id + ": " + val);
  }

  updateData(r, c, value) {
    this.items[r][c] = value;
    let elem = document.querySelector('[srcd="' + r + ',' + c + '"]');
    if (elem) {
      elem.innerHTML = value;
    }
    // check if visible and update grid ...
  }

  storeCell(elem) {
    if (elem) {
      let src = this.getIdxOf(elem).split(",");
      this.items[src[0], src[1]] = elem.innerHTML;
    }
  }

  getIdxOf(elem) {
    // reverse sorting, paging and filtering ...
    return elem.getAttribute("srcd");
  }


  load(rowLimit = 0, updateDataOnly = 0) {
    if (0 == rowLimit || this.items.length < rowLimit) {
      rowLimit = this.items.length;
    }
    let eGrid = document.getElementById("grid-container");
    if (0 == updateDataOnly) {
      eGrid.innerHTML = "";
      eGrid.style.gridTemplateColumns = ( this.lenMax[0] ?  (this.lenMax[0]+2)+"ch" : "auto") + " auto".repeat(this.items.length < 1 ? 1 : this.items[0].length - 1);
    }

    // if (this.sortIdx) { console.debug("use sortIdx " + this.sortIdx[ 1 ][ 1 ] + " "+ this.sortIdx[ 2 ][ 1 ] + " "+ this.sortIdx[ 3 ][ 1 ] + " ");}

    for (let r_ = updateDataOnly; r_ < rowLimit; r_++) {

      let r = this.sortIdx ? this.sortIdx[r_][0] : r_;
      //console.debug( 'resort row: ' + r_ + " -> "+ r);

      // TODO if r is filteredRow - than skipp it and go for next ...  


      for (let c = 0; c < this.items[0].length; c++) {
        var item = document.createElement('div');
        let icon = "";
        item.id = "grid_" + r_ + "_" + c;
        if (0 == r) {
          item.classList.add("grid-head");
          if (c > 0) {
            icon += '<i class="fa fa-filter icon-inactiv" onclick="controller(grid, \'FILTER:' + c + '\', this);" ></i>';
            icon += '<i class="fa ' + this.sortModeIcons[ this.sortModeAvail.indexOf( this.sortMode ? (this.sortMode[ c ] ?? "" ) : "" ) ] + '" onclick="controller(grid, \'SORT:' + c + '\', this);" >';
            if (this.sortOrder && this.sortOrder[c]>0) {
              icon += '<i class="superscript">' + this.sortOrder[c] + '</i>';
            }
            icon += '</i>';
          }
        } else if (0 == c) {
          item.classList.add("grid-idx");
        } else {
          item.classList.add("grid-item");
          item.onclick = function(e) { enableEditing(e, e.target) };
          if (r_ % 2 == 1) item.classList.add("grid-odd"); // ignore head row ...
        }
        if (c >0 && r_ % 3 == 0) item.classList.add("grid-3rd");
        //item.setAttribute("contenteditable", "true");
        item.innerHTML = this.items[r][c] + ("" == icon ? "" : "<i class='headlineIconSpace'></i>" + icon);
        // back-refer
        item.setAttribute('srcD', r + "," + c); // here use r/c of item - no matter of sort and filter
        if (0 == updateDataOnly) {
          eGrid.appendChild(item);
        } else {
          let e = document.getElementById(item.id);
          if (!e) {
            // only limited rows in view ... just stop
            rowLimit = r_; // just break outer loop
            break;
          } else {
            //console.debug("update " + item.id);
            e.replaceWith(item);
          } // view-row-limit reached ...
        } // updateDataOnly
      } // c
    } // r
    log((updateDataOnly > 0 ? "updated" : "loaded ") + this.items.length + " x " + this.items[0].length);
    document.getElementById("grid_size").innerHTML = (this.items.length < 1 ? 0 : this.items[0].length) + " x " + this.items.length;

  }
  load_add(params) {
    load_add();
  }



  sort(col, sortMode) {
    if (!this.sortMode || !this.sortOrder) {
      // init
      this.sortMode = [];
      this.sortOrder = [];
      for (let index = 0; index < this.items.length; index++) {
        this.sortMode[index] = 0;
        this.sortOrder[index] = 0;
      }
    }
    //
    this.sortMode[col] = sortMode;
    //   sortOrder[ col ] = position  --> wenn sortMode=0 dann löschen und neu idx // sonst aktuallisiern // sonst position anfügen 
    //   sortOrderIdx[ position ] = col --> !!! position 0 is to skipp
    let sortOrderIdx = [];
    for (let c = 0; c < this.sortOrder.length; c++) {
      sortOrderIdx[this.sortOrder[c]] = c;
    }
    //
    if (sortMode != "" && 0 == this.sortOrder[col]) {
      // add col
      this.sortOrder[col] = sortOrderIdx.length; // tricky at least Dummy-[0] makes inital len -> 1
      sortOrderIdx[this.sortOrder[col]] = col;
    } else if ("" == sortMode && this.sortOrder[col] > 0) {
      // remove col
      sortOrderIdx.splice(this.sortOrder[col], 1);
      for (let i = this.sortOrder[col]; i < sortOrderIdx.length; i++) { // updated shifted indexes
        this.sortOrder[sortOrderIdx[i]] = i;
      }
      this.sortOrder[col] = 0;
    }
    //
    if (sortOrderIdx.length > 1) {
      let idx = [];
      // should have idx-column to ease sorting -  just store key-values-joined and use custom-sorting by only that column
      for (let r = 1; r < this.items.length; r++) {  // exlude haedlines from sorting
        let keys = [r]; // current row
        for (let i = 1; i < sortOrderIdx.length; i++) { // skipp dummy at index 0
          // TODO FIXME -- create inverse key for reverse sorting !!!!
          keys.push('' + this.items[r][sortOrderIdx[i]]); // enforce string for sorting ... later numberformat
        }
        idx.push(keys);
      }
      // get sortMode indexed by keys
      let idxSortOrderModeId = [""]; // dummy for row-num at position 0
      for (let i = 1; i < sortOrderIdx.length; i++) { // skipp dummy at index 0
        idxSortOrderModeId.push(grid.sortModeAvail.indexOf(this.sortMode[sortOrderIdx[i]]));
      }
      console.debug(idxSortOrderModeId);
      console.table(idx);
      console.debug("sorting ... (" + this.sortMode.toString() + ")");
      //
      idx.sort(function(a, b) {
        let cmp = 0;
        let i = 0;
        do {
          i = i + 1; // skipp row at position 0 
          cmp = (a[i]).localeCompare(b[i]);
          if (0 == idxSortOrderModeId[i] % 2) {
            cmp = -cmp; // reverse order
          }
        } while (0 == cmp && i < a.length);
        return cmp;
      });
      idx.unshift([0, 0]); // add Head-Dummy
      console.table(idx);
      console.debug(this.sortMode.toString() + " " + (idx.length > 1 ? idx[1][1] : "") + " " + (idx.length > 2 ? idx[2][1] : "") + " " + (idx.length > 3 ? idx[3][1] : ""));
      /*
      let items=[ this.items[0] ]; // exlude haedlines from sorting
      for (let r = 0; r < idx.length; r++) {  
          items.push( this.items[ idx[ r ][ 1 ] ] );
      }    
      this.items = items;
      */
      this.sortIdx = idx;
      //this.load(0, 1); // do not update head !!
      this.load(0, 0);// do update head as Sort-Order may have changed !!
      

    }
  }


  reset() {
    let i = 1;
    for (let r = 0; r < this.items.length; r++) {
      for (let c = 0; c < this.items[0].length; c++) {
        this.items[r][c] = i++;
      }
    }
  }


  resize_items(size1, size2) {
    array_resize_2dim(this.items, size1, size2, 'X');
  }

  setData(r) {
    console.debug("getDataFromUrl");
    //console.debug(r);
    let d1 = r.split("\n");
    //if (d1[d1.length-1].length < 1 ) {
    if (d1.length > 0 && "" == d1[d1.length - 1]) {
      d1.pop(); // closing \n  optional
    }
    //}
    if (d1.length > 0) {
        let delim = ";";
        let char0 = d1[0].charAt(0);
        if ( '"' == char0 || "'" == char0 ) {
            delim = new RegExp( char0 + "[;,]" + char0);  // separator ...
        } else {
            char0 = "";
        }
        this.resize_items(d1.length, d1[0].split( delim ).length);
        //for (let i = 0; i < 5; i++) {
        for (let i = 0; i < d1.length; i++) {
            let d2 = d1[i];
            if (char0 != "") {
                d2 = d2.substring( 1, d2.length - 1  );
            }
            let d3 = d2.split( delim );
            this.items[i] = d3;

            // determine max len per col
            for (let ii = 0; ii < d3.length; ii++) {
                let len = d3[ii].length;
                if (this.lenMax.length < ii || !this.lenMax[ii] || this.lenMax[ii] < len){
                    this.lenMax[ii] = len;
                }
            }

        }
    } else {
        this.resize_items(0, 0);
    }
    console.table(this.items);
  }


  setDataJson(jsonData){
    let json = JSON.parse( jsonData );
    /*  metadata  */
    
    /*  data  */
    let data = json.data;
    data = data.replace("\\n","\n"); // unescape 
    this.setData( data );
    
  }


  
}