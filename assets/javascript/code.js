$(document).ready(function(){

    function main(){
        var gif_list = ["Rat", "Dog", "Cat", "Mouse", "Lion", "Parrot", "Pokemon", "Moose", "Canada", "USA"];

        function displayGifs(){
            var gif = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=P4NmMZ3Tf65kpSQGDFj2hpXqSNrfrdh0&tag=" + gif.toLowerCase() + "&limit=15&lang=en";
            $("#gif-outputs").empty();
            for (var j = 0; j < 15; j++){
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response){
                    var object = $("<div>");
                    $(object).addClass("object-output");
                    $("#gif-outputs").append(object);
                    $(object).append("<img src =" + response.data.images.fixed_height_still.url + ">");
                    $(object).append("<div>"+response.data.rating+"</div>");
                })
            }
        }

        function showButtons() {
            $("#gif-buttons").empty();
            for (var i = 0; i < gif_list.length; i++) {
              var a = $("<button>");
              a.addClass("gifButton");
              a.attr("data-name", gif_list[i]);
              a.text(gif_list[i]);
              $("#gif-buttons").append(a);
            }
        }

        $("#category-submit").on("click", function(event) {
            // Grabbing the input from the textbox
            event.preventDefault();

            var gif = $("#category-input").val().trim();
            $("#category-input").val("");
            gif_list.push(gif);
            showButtons();
        });

        $(document).on("click", ".gifButton", displayGifs);
        showButtons();
    }
    main();

})