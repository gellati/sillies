$(document).ready(function() {
  var baseUrl = "http://localhost"
  var port = "5000"
  var imagesUrl = baseUrl + ":" + port + "/images"

  console.log("hello")

  var elementCounter = 0;

  function imageClick(image){
    console.log("clicked" + this)
  }

   function onPageLoad(images){
     var imageListElement = document.getElementById("imageList")
     var ulElement = document.createElement("ul")
     ulElement.className = "gifDropdownList";
     var i, li, img, url;
     for(i = 0; i < images.length; i++){
       url = baseUrl + ":" + port + "/" + images[i]
       liElement = document.createElement("li");
       imgElement = document.createElement("img")
       imgElement.addEventListener()
       imgElement.setAttribute("src", url);
       liElement.appendChild(imgElement)
       ulElement.appendChild(liElement);
     }
     imageListElement.appendChild(ulElement);
   }

   returnImageNameList(imagesUrl)

//    $('img').unveil(1000);

    function returnImageNameList(url){
      var images = []
      $.get(url, function(data){onPageLoad(data.images)})
    }

    function createMovie(){

    }






});
