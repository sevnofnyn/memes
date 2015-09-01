$(document).ready(function(){
//When the page loads do an ajax get call to the memes/snark route
    $.ajax({
        type: "GET",
        url: "/memes/snark"
    }).done(function(data){ // Store snark.json as var data
        console.log(data);
        obj = JSON.parse(data); //turn json obj into js array
        obj.forEach(function(elem, index){  //iterate through obj(snark array)
            var $p = $('<p class"snarky">'+elem.snark+'</p>');
            $('.meme-container').eq(elem.id-1).append($p);
        })
    });

});
