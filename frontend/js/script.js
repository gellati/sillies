$(document).ready(function() {
  var baseUrl = "http://localhost"
  var port = "5000"
  var imagesUrl = baseUrl + ":" + port + "/images"

  function addCreateMovieButtonEventListener(){
    var button = document.getElementById("button-create-movie")
    button.addEventListener("click", function(e){
      createMovie();
    })
  }

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

   function addImageToDropzone(image){
     var dropzone = document.getElementById("gif-movie-elements")
     var liElement = document.createElement("li");
     var imgClone = image.cloneNode(true);
     liElement.appendChild(imgClone)
     dropzone.appendChild(liElement)
     console.log("clicked" + this)
   }

   function createMovie(){
     var images = getDropzoneElementsList()
     var movieRequestUrl = baseUrl + ":" + port + "/movie?gifs=" + images.join(",");
     console.log(movieRequestUrl)
//     var imagesUrl = baseUrl + ":" + port + "/images"

$.get(movieRequestUrl, function(data){
  console.log("createMovie")
  console.log(data.movieFile)
  showMovie(data.movieFile)

})
//  console.log(data)
//var movieFile = data.movieFile;
 }

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

   console.log("hello")
   var imageZone = document.getElementById("gif-imagezone")



//    $('img').unveil(1000);

    function returnImageNameList(url){
      var images = []
      $.get(url, function(data){onPageLoad(data.images)})
    }

});
