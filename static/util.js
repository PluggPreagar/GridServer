
  function log(e) {
    eLog = document.getElementById("log");
    eLog.value += e + "\n";
    eLog.scrollTop = eLog.scrollHeight;
  }

  function hint(e) {
    eLog = document.getElementById("hint");
    eLog.value += e + "\n";
    eLog.scrollTop = eLog.scrollHeight;
  }


  function enableEditing(element) {
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

  function array_resize_2dim(arr, size, size2, defval) {
    let a1 = arr[0];
    array_resize(a1, size, "X");
    array_resize(arr, size2, a1);
  }


