var divCodeMirror = document.getElementById("inputMirror");
var codeSendOnEnter = true;

var myCodeMirror = CodeMirror(divCodeMirror, {
  value: "function myScript(){return 100;}\n",
  mode: "javascript",
  extraKeys: {
    "Enter": function(cm) {
      log("capture Enter");
      return CodeMirror.Pass;
    },
    "Ctrl-Enter": function(cm){
      log("capture Ctrl-Enter");
      //getUrl2Grid( cm.cm_grid, cm);
      getUrl2GridQry(cm.cm_grid, myCodeMirror.getValue());
      //cm.getDoc().setValue('var msg = "Hi";');
      // return CodeMirror.Pass; // continue next handler
    }
  }
});

