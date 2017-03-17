$(document).ready(function() {
  var baseUrl = "http://localhost"
  var port = "5000"
  var imagesUrl = baseUrl + ":" + port + "/images"

   function onPageLoad(images){
     var imageListElement = document.getElementById("imageList")
     console.log(images)
     console.log(images[0])
     for(var i = 0; i < images.length; i++){
       var imageElementDiv = document.createElement("div");
       var imageTextParagraph = document.createElement("p");
       var imageElementImg = document.createElement("img")

       var url = baseUrl + ":" + port + "/" + images[i]
       console.log(url)
       imageElementImg.setAttribute("src", url)
       imageElementImg.className = "gif"
       imageElementDiv.appendChild(imageElementImg)

//       imageTextParagraph.innerHTML = images[i]
//       imageElementDiv.appendChild(imageTextParagraph);
       imageListElement.appendChild(imageElementDiv);
     }
   }

   returnImageNameList(imagesUrl)

//    $('img').unveil(1000);

    function returnImageNameList(url){
      var images = []
      $.get(url, function(data){onPageLoad(data.images)})
    }

});
