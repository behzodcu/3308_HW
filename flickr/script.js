page = 1
photoID = 0
results = document.getElementById('results')
// Checking if at bottom based on reference from Piazza Post and MDN documentation 
window.addEventListener('scroll', () =>{
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        page += 1
        photoID = 0
        makeApiCall()
    }
})
$("form").submit(function(event){
    results.innerHTML = ''
    page = 1
    photoID = 0
    makeApiCall()
    event.preventDefault()
})
function makeApiCall(){
    numPhotos = parseInt(document.getElementById('numPhotos').value)
    searchQuery = document.getElementById('searchQuery').value
    url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=22dbfba688ad5efbf8dd4c75e7504174&tags='+searchQuery+'&privacy_filter=1&safe_search=1&extras=url_sq&page='+page+'&format=json&nojsoncallback=1'
    $.ajax({url:url, dataType:"json"}).then(function(data) {
        for(i = 0; i < numPhotos/5; i++){
            deck = document.createElement('DIV')
            deck.className = 'card-deck'
            for(j = 0; j < 5; j++){
                src = data.photos.photo[photoID].url_sq
                title = data.photos.photo[photoID].title
                photoID++

                card = document.createElement('DIV')
                cardImg = document.createElement('IMG')
                cardBody = document.createElement('DIV')
                cardText = document.createElement('P')
                
                card.className = 'card'
                cardImg.className = 'card-img-top'             
                cardBody.className = 'card-body'
                cardText.className = 'card-text'

                cardText.innerHTML = title
                cardImg.src = src

                card.appendChild(cardImg)
                card.appendChild(cardBody)
                cardBody.appendChild(cardText)
                deck.appendChild(card)
            }
            results.appendChild(deck)
        }
    })
}
