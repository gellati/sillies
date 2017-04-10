
// removes elements
function removeElement(divId){
  var d = document.getElementById("dropitem-" + divId.toString())
  d.parentNode.removeChild(d);
}


$(document).ready(function() {
  var baseUrl = "http://localhost"
  var port = "5000"
  var imagesUrl = baseUrl + ":" + port + "/images"

  var dropzoneCounter = 0;

  // add event listener to movie creation button
  function addCreateMovieButtonEventListener(){
    var button = document.getElementById("button-create-movie")
    button.addEventListener("click", function(e){
      createMovie();
    })
  }

  // when page loads, load also images from server. add event listeners
  // to images so that they are copied to the dropzone when clicked on
  function onPageLoad(images){
    var imageListElement = document.getElementById("gif-imagezone")
    var ulElement = document.createElement("ul")
    ulElement.className = "gif-image-list";
    var i, li, img, url;
    for(i = 0; i < images.length; i++){
      url = baseUrl + ":" + port + "/" + images[i]
      liElement = document.createElement("li");
      imgElement = document.createElement("img")
      imgElement.className = "gif"
      imgElement.setAttribute("src", url)
      imgElement.setAttribute("data-imgname", images[i])
      imgElement.addEventListener("click", function(e){
        console.log(e)
        console.log(e.target.src)
        console.log(e.target.dataset.imgname)

        addImageToDropzone(e.target);
      }, false);
      liElement.appendChild(imgElement)
      ulElement.appendChild(liElement);
    }
    imageListElement.appendChild(ulElement);
  }

  // add image to dropzone
  function addImageToDropzone(image){
    var dropzone = document.getElementById("gif-movie-elements")
    var liElement = document.createElement("li");
    liElement.id = "dropitem-" + dropzoneCounter
    var imgClone = image.cloneNode(true);
    imgClone.className = "gif clone";

    // image block contains both image and deletion button
    var imgBlock = document.createElement("div")
    imgBlock.appendChild(imgClone)

    // add deletion functionality to element
    var deleteButton = document.createElement("button")
    deleteButton.innerHTML = "x";
    var deleteString = "removeElement(" + dropzoneCounter + ")"
    deleteButton.setAttribute("onclick", deleteString)
    imgBlock.appendChild(deleteButton)

    liElement.appendChild(imgBlock)
    dropzone.appendChild(liElement)

    dropzoneCounter++;
  }


  // create movie from images in dropzone
  // sends a list of the gifs to the server as a get request
  function createMovie(){
    var images = getDropzoneElementsList()
    var movieRequestUrl = baseUrl + ":" + port + "/movie?gifs=" + images.join(",");
    console.log(movieRequestUrl)

    $.get(movieRequestUrl, function(data){
      console.log("createMovie")
      console.log(data.movieFile)
      showMovie(data.movieFile)

    })
  }

  // request the readymade movie from the server and show it
  function showMovie(movieFile){
    var movieElement = document.getElementById("gif-moviezone")
    url = baseUrl + ":" + port + "/" + movieFile
    console.log(url)
    var imgElement = document.createElement("img");
    imgElement.className = "gif gifmovie"
    imgElement.setAttribute("src", url)
    movieElement.appendChild(imgElement)
    console.log("showtime!")
  }

  // get a list of the images that are in the dropzone
  function getDropzoneElementsList(){
    var movieElementsUl = document.getElementById("gif-movie-elements")
    var liElements = movieElementsUl.getElementsByTagName("li")
    var i, img;
    var images = []
    for(i = 0; i < liElements.length; i++){
      img = liElements[i].getElementsByTagName("img")
      images.push(img[0].dataset.imgname)
    }
    return images;
  }


  returnImageNameList(imagesUrl)
  addCreateMovieButtonEventListener()

  //    $('img').unveil(1000);

  // get a list of available images from the server
  function returnImageNameList(url){
    var images = []
    $.get(url, function(data){onPageLoad(data.images)})
  }

});
