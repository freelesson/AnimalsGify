$(document).ready(function () {
    //for loop to start array to dynamically display initial buttons
    var buttonArray = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehod", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
    for (i = 0; i < buttonArray.length; i++) {
        // $(".buttonDisplay").append("<button>" + buttonArray[i] + "</button>");
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("gify-btn");
        // Adding a data-attribute
        a.attr("data-name", buttonArray[i]);
        // Providing the initial button text
        a.text(buttonArray[i]);
        // Adding the button to the buttons-view div
        $(".buttonDisplay").append(a);
    }

    //dynamically create form and submit
    //create text
    // var a = $("<p>");
    // a.addClass("normalText");
    // a.text("Add an Animal");
    // $(".animalForm").append(a);

    // //create form
    // var a = $("<label>");
    // a.addClass("formAnimal");
    // //a.text("Add an Animal");
    // $(".animalForm").append(a);

    //create button
    var a = $("<button>");
    a.addClass("animalButton");
    a.attr("data-name", buttonArray[i]);
    a.text("Submit");
    $(".animalForm").append(a);


});



function displayGify() {
    //clear div
    $(".giffyDisplay").empty();

    var animal = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=7noUkTFzs8VToSoelsrj21GOFUlx5ulX&limit=10";

    ratingArray=[];
    stillArray=[];
    giphyArray=[];


    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        jiffs = response.data;
        //for loop to display all giphys
        for (i = 0; i < jiffs.length; i++) {
            $(".giffyDisplay").append("<div>");
            $(".giffyDisplay").append("<p>Rating:  " + jiffs[i].rating + "</p>");
            ratingArray[i]=jiffs[i].rating
            //$(".giffyDisplay").append("<img src='" + jiffs[i].images.original_still.url + "' style='height:350px; width:350px;'/>");
            var a = $("<img src='" + jiffs[i].images.original_still.url + "' style='height:200px; width:200px;'/>");
            a.addClass("jiffs-display aa" + i);
            a.attr("data-name", + i);
            a.attr("gif_v", jiffs[i].images.original.url);
            //a.attr("gif_v", jiffs[i].images.fixed_width.url);
            giphyArray[i]=jiffs[i].images.original.url;
            a.attr("img_v", jiffs[i].images.original_still.url);
            stillArray[i]=jiffs[i].images.original_still.url;
            console.log(stillArray[i]);      
            $(".giffyDisplay").append(a);
        };
    })
};

//function to add new button
function addNewAnimal() {
    var newAnimal = $(".form-control").val().trim();
    console.log(newAnimal)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("gify-btn");
    // Adding a data-attribute
    a.attr("data-name", newAnimal);
    // Providing the initial button text
    a.text(newAnimal);
    // Adding the button to the buttons-view div
    $(".buttonDisplay").append(a);

    //displays giphy of new button
    //**this does not work */
   // displayGify(newAnimal);
    $(".form-control").empty();

};

function liveGify() {
    // console.log(object);
    // //console.log("your mom");
    // //var x = document.getAttribute("onclick");
    // console.log(x);
};



//add new button
$(document).on("click", ".animalButton", addNewAnimal);

//display giphy for existing buttons
$(document).on("click", ".gify-btn", displayGify);

//change giphy to live
$(document).on("click", ".jiffs-display", function () {

    console.log(this);

    var currImg = $(this).attr('src');
    //console.log(currImg);
    

    var staticImg = $(this).attr("img_v");
    var dynamicImg = $(this).attr("gif_v");
    var divDisplay=$(this).attr("data-name");
    console.log(divDisplay);
    console.log("Current Image:  " + currImg);
    console.log("Dynamic Image: " + dynamicImg);
    console.log("Static Image:  "+ staticImg);
    console.log(stillArray[0])


    if (currImg === staticImg) {
       $(".jiffs-display.aa"+divDisplay).attr('src', dynamicImg);
       //$(divDisplay).attr('src', dynamicImg);
       console.log("test");
       return false;
       
       //$(".jiffsDisplay 0").attr('src', "https://media0.giphy.com/media/VcDqJibr7niDK/giphy.gif");

    } else {
        $(this).attr('src', staticImg);
    }

});