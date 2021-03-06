function render(scale) {
  $canvases = document.getElementsByClassName('thing');
  for (var i=0; i<$canvases.length; i++) {
    var width = 12;
    var character = JSON.parse($canvases[i].dataset.character);
    var context = $canvases[i].getContext("2d");
    context.clearRect(0, 0, $canvases[i].width, $canvases[i].height);
    $canvases[i].width = scale*width;
    $canvases[i].height = scale*width;

    var imagedata = context.createImageData(width*scale, width*scale);

    for (var y=0; y<width; y++) {
      for (var x=0; x<width; x++) {
        var pixel = (y*width*scale + x) * 4 * scale;
        for (var n=0; n<scale; n++)
          for (var m=0; m<scale; m++)
            if (character.BITMAP[y][x] == '1')
              imagedata.data[pixel+n*4+m*scale*width*4+3] = 255;
      }
    }

    context.putImageData(imagedata, 0, 0);
  };
}

document.addEventListener('DOMContentLoaded', function () {
  render(2);
});

document.addEventListener('click', function (e) {
  var textArea = document.createElement("textarea");
  if (!e.target.classList.contains("thing")) return;

  textArea.value = String.fromCharCode(parseInt(JSON.parse(e.target.dataset.character).ENCODING));
  e.target.parentElement.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
  } catch (err) {
    console.log(err);
  }

  e.target.parentElement.removeChild(textArea);
})
