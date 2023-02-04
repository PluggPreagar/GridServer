  // https://javascript.info/fetch
  // fetch("http://localhost:8080/size", {mode: "no-cors"}).then( response  => setData( response.text()  ));
  // let response = await fetch("http://localhost:8080/size", {mode: "no-cors"});
  // https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors/43268098#43268098

async function updateGridValue(grid, qry, val, id, callback) {
  console.debug("updateGridValue");
  url = new URL("http://localhost:8080/query");
  url.searchParams.append("qry", qry);
  url.searchParams.append("val", val);
  url.searchParams.append("id", id);
  let text = null;
  try{
    let response = await fetch(url);
    console.debug(response);
    text = await response.text(); // read response body as text
  } catch (e) {
   log('!!! Connection fail !!' + url);
   console.error(e);
  }
  if (text && callback){
    callback( text );
  }
}


async function msgConnection( callback) {
  console.debug("msgConnection");
  url = new URL("http://localhost:8080/info");
  let text = null;
  try{
    let response = await fetch(url);
    console.debug(response);
    text = await response.text(); // read response body as text
  } catch (e) {
   log('!!! Connection fail !!' + url);
   console.error(e);
  }
  if (text && callback){
    callback( text );
  }
}



async function getUrl2GridQry(grid, qry) {
  console.debug("getUrl2GridQry");
  url = new URL("http://localhost:8080/query");
  url.searchParams.append("qry", qry);
  let text = null;
  try{
    let response = await fetch(url);
    console.debug(response);
    text = await response.text(); // read response body as text  
  } catch (e) {
   log('!!! Connection fail !!' + url);
   console.error(e);   
  }
  if (text){
    grid.setDataJson(text);
    grid.load(10);
    grid.codeMirror.setValue(qry);
  }
  
}


function getUrl2Grid(grid) {
  getUrl2GridQry( grid, grid.codeMirror.getValue());
}








  async function getDataJsonFromUrlAsync(grid) {
    console.debug("getDataJsonFromUrlAsync");
    // https://javascript.info/fetch
    // fetch("http://localhost:8080/size", {mode: "no-cors"}).then( response  => setData( response.text()  ));
    // let response = await fetch("http://localhost:8080/size", {mode: "no-cors"}); // https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors/43268098#43268098
    let size = document.getElementById("grid_size").innerHTML;
    url = new URL("http://localhost:8080/query");
    url.searchParams.append("size", size);
    let text = null;
    try{
      let response = await fetch(url);
      console.debug(response);
      text = await response.text(); // read response body as text  
    } catch (e) {
     log('!!! Connection fail !!' + url);
     console.error(e);   
    }
    if (text){
      grid.setDataJson(text);
      grid.load(10);      
    }
    
}



  async function getDataFromUrlAsync(grid) {
    console.debug("getDataFromUrl");
    // https://javascript.info/fetch
    // fetch("http://localhost:8080/size", {mode: "no-cors"}).then( response  => setData( response.text()  ));
    // let response = await fetch("http://localhost:8080/size", {mode: "no-cors"}); // https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors/43268098#43268098
   try{
      let size = document.getElementById("grid_size").innerHTML;
      url = new URL("http://localhost:8080/size");
      url.searchParams.append("size", size);
      let response = await fetch(url);
      console.debug(response);
      let text = await response.text(); // read response body as text  
      grid.setData(text);
      grid.load(10);      
    } catch (e) {
     log('!!! Connection fail !!' + url);
     console.error(e);   
    }
    
}


