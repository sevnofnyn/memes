$(document).ready(function(){
//When the page loads do an ajax get call to the memes/snark route
    $.ajax({
        type: "GET",
        url: "/memes/snark"
    }).done(function(data){ // Store snark.json as var data
        console.log(data);
        obj = JSON.parse(data); //turn json obj into js array
        obj.forEach(function(elem, index){  //iterate through obj(snark array)
            if(elem.id == $('.meme-container').get(elem.id-1))//if the snark id is equal to the index of an image, then we append to the DOM correct position
            console.log(elem.snark, $('.meme-container').get(elem.id-1));
        })
    })



});
