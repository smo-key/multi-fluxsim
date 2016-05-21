//*** FULL SCREEN ***//
function fullscreen() {
  if ((window.fullScreen) ||
   (window.innerWidth == screen.width && window.innerHeight == screen.height))
  {
    // fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
  else
  {
    // NOT fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  }

  fsupdateicon();
}

function fsupdateicon()
{
  //retest fullscreen and replace icon
  if ((window.fullScreen) ||
   (window.innerWidth == screen.width && window.innerHeight == screen.height))
  {
    document.getElementById('fsbutton').innerHTML = "<span class='mega-octicon octicon-screen-full fadeicon'></span>";
  }
  else
  {
    document.getElementById('fsbutton').innerHTML = "<span class='mega-octicon octicon-screen-normal fadeicon'></span>";
  }
}

//*** RESIZE CANVAS ***//
// function resizeCanvas() {
//   //camera.aspect = window.innerWidth / window.innerHeight;
//   //camera.updateProjectionMatrix();
//
//   var canvas = $('.surfacePlotCanvas')[0].getContext("2d").canvas;
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   //renderer.setSize(window.innerWidth, window.innerHeight);
//
//   fsupdateicon();
// }
// window.addEventListener('resize', resizeCanvas);

//*** READING KEYBOARD ***//
/*document.addEventListener('keydown', onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  switch (event.keyCode) {
    case 32: //spacebar
      startSimul();
      event.preventDefault(); break;
    case 82: //R key
      resetSimul();
      event.preventDefault(); break;
  }
}*/

//*** CANVAS SAVING ***//
/*function saveImage(canvas) {
  download(canvas, "image.png");
}

function download(canvas, filename) {

    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'),
        e;

    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL();

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {

        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
                         0, 0, 0, 0, 0, false, false, false,
                         false, 0, null);

        lnk.dispatchEvent(e);

    } else if (lnk.fireEvent) {

        lnk.fireEvent("onclick");
    }
}*/

//*** FILE I/O ***//
/*function createFile() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","writer.php?t=create",true);
  xmlhttp.send();
}

function saveFile() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","writer.php?t=save",true);
  xmlhttp.send();
}

function writeData(str) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","writer.php?t=append&s="+str,true);
  xmlhttp.send();
}*/


//*** ACTIVATE ANIMATION ***//
/*function runGif() {

}*/
