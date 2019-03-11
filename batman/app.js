movieButton = document.getElementById("movieButton")
movieTitle = document.getElementById("movieTitle")
movieList = document.getElementById("movieList")
allInfo = document.getElementById('allInfo')

function loadPage(){

let movieURL = "http://www.omdbapi.com/?s=batman&apikey=13133092"

  let request = new XMLHttpRequest()
  request.open("GET",movieURL)
  request.send()

  request.onload = function() {

    if(request.status != 200) {
      console.log("Server not found.")
    } else {
      console.log("Response Recieved")
      console.log(request.responseText)
      console.log(JSON.parse(request.responseText))
      let moviesResponse = JSON.parse(request.responseText)
      displayMovieDetails(moviesResponse)
    }
  }
}
loadPage()

function displayMovieDetails(movi) {
    let movieLIItems = movi.Search.map(function(movie){
      return `<div onclick='movieFacts("${movie.imdbID}")' id="movieDisplay">
              <div id="posters">
              <img src='${movie.Poster}' id="pics">
              </div>
              <div id="titlebtn">
              <span>${movie.Title}</span>
              </div>
              </div>`
            
    })
    movieList.innerHTML += movieLIItems.join('')

}

function movieFacts(imdbID) {
    let movieUrlAgain = "http://www.omdbapi.com/?i=" + imdbID + "&apikey=13133092"
    console.log(movieUrlAgain)
    let request = new XMLHttpRequest()
    request.open("GET",movieUrlAgain)
    request.send()
    
    request.onload = function() {
        let moviesResponse = JSON.parse(request.responseText)
        displayMovieInDepthDetails(moviesResponse)

    }
}

function displayMovieInDepthDetails(movie) {
    console.log(movie)
    let movieInfo = `
                        <div id="posters">
                        <img src='${movie.Poster}' id="pics">
                        </div>
                        <div id="yearRating">
                        <span>(${movie.Year})</span>
                        <span>${movie.Rated}</span>
                        </div>
                        <div id="plot">
                        <span>${movie.Plot}</span>
                        </div>`
    allInfo.innerHTML = movieInfo
}