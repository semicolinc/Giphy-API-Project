$(document).ready(function(){

    function main(){
        var gif_list = ["Rat", "Dog", "Cat", "Mouse", "Lion", "Parrot", "Pokemon", "Moose", "Canada", "USA"];
        var gif_move = [];
        function displayGifs(){
            var gif = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=P4NmMZ3Tf65kpSQGDFj2hpXqSNrfrdh0&tag=" + gif.toLowerCase() + "&limit=15&lang=en";
            $("#gif-outputs").empty();
            gif_move = [];
            gif_still = [];
            for (let j = 0; j < 15; j++){
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response){
                    let object = $("<div>");
                    $(object).addClass("still");
                    $(object).attr('id', j);
                    $("#gif-outputs").append(object);
                    let image = $("<img src =" + response.data.images.fixed_height_still.url + ">")
                    $(object).append(image);
                    // $(image).addClass("object");
                    // $(image).attr('id', j);
                    // $(image).idx = j;
                    gif_move.push(response.data.images.fixed_height.url);
                    gif_still.push(response.data.images.fixed_height_still.url);
                    $(object).append("<div>"+response.data.rating+"</div>");
                })
            }
        }
        
        function showButtons() {
            $("#gif-buttons").empty();
            for (let i = 0; i < gif_list.length; i++) {
                let a = $("<button>");
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
        
        $(document.body).on("click", ".still", function() {
            $(this).removeClass("still");
            let oldImage = jQuery("img", this);
            let idName = $(this).attr('id');
            let newImage = $("<img src =" + gif_move[idName] + ">");
            $(oldImage).replaceWith(newImage);
            $(this).addClass("moving");
        });

        $(document.body).on("click", ".moving", function() {
            $(this).removeClass("moving");
            let oldImage = jQuery("img", this);
            let idName = $(this).attr('id');
            let newImage = $("<img src =" + gif_still[idName] + ">");
            $(oldImage).replaceWith(newImage);
            $(this).addClass("still");
        });
        
        $(document).on("click", ".gifButton", displayGifs);
        showButtons();
        
    }
    main();
    
})