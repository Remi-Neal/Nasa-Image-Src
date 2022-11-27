function outputHTML(results){
    document.getElementById("imgs").innerHTML = results;
}

function outputKeywords(keywords){
    let output = '<p>Keywords</p>';
    output += '<ul id="keywords-list">';
    for(const item of [...keywords]){
        output += '<li class="keyword selectable">' + item + '</li>'
    }
    output += '</ul>';
    document.getElementById("keywords").innerHTML = output;
}

document.getElementById("search-button").addEventListener("click", function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search-bar').value;
    if(searchTerm == ""){
        return;
    }
    const url = 'https://images-api.nasa.gov/search?q=' + searchTerm + '&media_type=image';
    console.log(url)

    fetch(url)
        .then(function(response){
            return response.json();
        }).then(function(json){
            console.log(json);
            console.log("Json length: " + json.collection.items.length);
            let jsonItems = json.collection.items;

            let results = "";
            let keywords = new Set();
            for(let i=0; i < jsonItems.length; i++){
                let item = jsonItems[i];
                results += '<div class="item">';
                results += '<div class="img-title">' + item.data[0].title + '</div>';
                results += '<img class="img-found" src="' + item.links[0].href + '" alt="Image not found"/>';

                results += '<div class="description">';
                results += '<div>Desctiption</div>'; 
                results += '<p class="img-description">' + item.data[0].description + '</p>';
                results += '</div>';

                results += '<div class="img-keywords">'
                results += '<ul class="img-keywords">';
                for(let j=0; j < item.data[0].keywords.length; j++){
                    results += '<li class="keyword selectable">' + item.data[0].keywords[j] + '</li>';
                    keywords.add(item.data[0].keywords[j]);
                }
                results += '</ul>';
                results += '</div>'

                results += '</div>';
            }
            
            outputKeywords(keywords);
            outputHTML(results);
        }).catch(function(){
            outputHTML(searchTerm + " was not found. Please try a different term.");
        })

});