
  function log(e) {
    eLog = document.getElementById("log");
    eLog.value += e + "\n";
    eLog.scrollTop = eLog.scrollHeight;
    //
    eLog = document.getElementById("logDiv");
    eEntry = document.createElement("div");
    eEntry.innerHTML = e;
    eLog.appendChild( eEntry);
    eLog.scrollTop = eLog.scrollHeight;
  }

  function hint(e) {
    eLog = document.getElementById("hint");
    eLog.value += e + "\n";
    eLog.scrollTop = eLog.scrollHeight;
  }


  function enableEditing(e , element) {
    if (!e.button === 1 /*left*/) {
      console.debug("enableEditing surpressed");
      return true;
    }
    console.debug("enableEditing");
    //Adds the content editable property to passed element
    element.setAttribute('contenteditable', true)
    //Focuses the element
    element.focus()
  }




/*
       Array Helper
*/



  function array_resize(arr, size, defval) {
    while (arr.length > size) { arr.pop(); }
    while (arr.length < size) { arr.push(defval); }
  }

  function array_resize_2dim(arr, size1, size2, defval) {
    let a1 = arr[0];
    array_resize(a1, size2, "X");
    array_resize(arr, size1, a1);
  }


