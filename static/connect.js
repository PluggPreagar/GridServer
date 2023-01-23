
  async function getDataFromUrlAsync(grid) {
  console.debug("getDataFromUrl");
  // https://javascript.info/fetch
  // fetch("http://localhost:8080/size", {mode: "no-cors"}).then( response  => setData( response.text()  ));
  // let response = await fetch("http://localhost:8080/size", {mode: "no-cors"}); // https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors/43268098#43268098
  let size = document.getElementById("grid_size").innerHTML;
  url = new URL("http://localhost:8080/size");
  url.searchParams.append("size", size);
  let response = await fetch(url);
  console.debug(response);
  let text = await response.text(); // read response body as text  
  grid.setData(text);
  grid.load(10);
}


