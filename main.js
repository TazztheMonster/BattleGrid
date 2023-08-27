var csInterface = new CSInterface();
var doc = app.activeDocument;

function updateInputs() {    
  console.log("Updating inputs");
 
  var numRows = parseInt(document.getElementById('numRows').value);
  var numCols = parseInt(document.getElementById('numCols').value);
  var boxSize = parseInt(document.getElementById('boxSize').value);

  if (this == dialog.numRowsInput) {
      numCols = Math.ceil(doc.width / doc.height * numRows);
      boxSize = doc.height / numRows;
  } else if (this == dialog.numColsInput) {
      numRows = Math.ceil(doc.height / doc.width * numCols);
      boxSize = doc.width / numCols;
  } else {
      numRows = Math.ceil(doc.height / boxSize);
      numCols = Math.ceil(doc.width / boxSize);
  }

  dialog.numRowsInput.text = numRows;
  dialog.numColsInput.text = numCols;
  dialog.boxSizeInput.text = boxSize;
}

function addGrid() {
  console.log("Adding grid");
    
  var numRows = parseInt(document.getElementById('numRows').value);
  var numCols = parseInt(document.getElementById('numCols').value);
  var boxSize = parseInt(document.getElementById('boxSize').value);

  var layer = doc.artLayers.add();
  layer.name = "grid";

  for (var y = 0; y < numRows; y++) {
      for (var x = 0; x < numCols; x++) {
          var left = x * boxSize;
          var top = y * boxSize;
          var right = Math.min(left + boxSize, doc.width);
          var bottom = Math.min(top + boxSize, doc.height);
          doc.selection.select([
              [left, top],
              [right, top],
              [right, bottom],
              [left, bottom]
          ]);
          doc.selection.stroke(app.foregroundColor, 1); // 1 pixel stroke width
      }
  }
}

document.getElementById("btnGenerate").addEventListener("click", function() {
  console.log("Button clicked");
  addGrid();
});