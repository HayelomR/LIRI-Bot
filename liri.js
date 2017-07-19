//check before you start
//console.log("start working.")
// Used to access Twitter keys in local file, keys.js.
var keys = require("./keys.js");
// Takes in all of the command line arguments
var input = process.argv;
//the type of commands that will be given to liri
var action = process.argv[2];
//holds the input value
//var value = process.argv[3];
// The switch-case will direct which function gets run.
switch (action) {
  case "my-tweets":
  showMyTweets();
  break;

  case "spotify-this-song":
  song = process.argv[3];
  spotifyThis();
  break;

  case "movie-this":
  movie = process.argv[3];
  movieSearch();
  break;

  case "do-what-it-says":
  //dataArr = process.argv[3];
  doThis();
  break;
}
// console.log(keys);
function showMyTweets (){
  //npm used to access to twiiter
  var Twitter = require("twitter");
  var client = new Twitter(keys.twitterKeys);
// Search parameters includes my tweets up to last 20 tweets;
var params = {screen_name: "@class_DU2017", count: 20};
//trying to show about 20 tweets
client.get('/statuses/user_timeline.json', params, function(error, tweets,response) {
	if(!error){
		for(var i = 0; i < tweets.length; i++){
			var tweetText = tweets[i].text;
      var tweetsCreated = tweets[i].created_at;
      console.log("my-tweets: " + tweetText);
      console.log("This tweet was created: " + tweetsCreated);
    }
  }
  else {
    console.log(error);
  }
});
}


function spotifyThis (){
  var song = "";
  for(var i = 3; i < input.length; i++){
  if (i > 3 && i < input.length) {
    song = song + "+" + input[i];
  }
  else {
    song += input[i];
  }
  }
  if (song === undefined) {
        //force song name if it is not passed
        song = "All I want for christmas";
      }
  // npm used to access twitter
  // var spotify = require("spotify");
  var Spotify = require("node-spotify-api");
  var spotify = new Spotify({
    id:"34a105be2d514337a9c197608bee75fb",
    secret:"3f5ca307143d41b690c854ff181a9b4f"
  });
  spotify.search({ type: "track", query: song }, function(error, data) {
      //var movie = JSON.parse(data);
      if (error) {
        console.log("Error occurred: " + error);
        return
      } 
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name)
      console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url)
      console.log("Album Name: " + data.tracks.items[0].album.name);
    });
};

function movieSearch(){
  var dmovie = "";
  for(var i = 3; i < input.length; i++){
  if (i > 3 && i < input.length) {
    movie = movie + "+" + input[i];
  }
  else {
    dmovie += input[i];
  }
  }
  console.log("movie name " + movie);
  //npm to acess imdb
  var request = require("request");
 //var queryUrl = "http://www.omdbapi.com/?t=" + movie +"&y=&plot=long&tomatoes=true&r=json";
 request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=40e9cece",function(error, response, body){
  //stringfy the body 
  var data = JSON.parse(body);
  if(!error && response.statusCode == 200){
    var data = JSON.parse(body);
    console.log("Title of the movie: " + data.Title);
    console.log("Year the movie came out: " + data.Year);
    console.log("IMDB Rating: " +  data.imdbRating);
    console.log("Country Produced: " + data.Country);
    console.log ("Language of the movie: " + data.Language);
    console.log ("Plot of the movie: " + data.Plot);
    console.log ("Actors: " + data.Actors);
    console.log("Rotten Tomato rating is: " + data.Ratings[1].Value);
    console.log("Rotten Tomatoes URL: " + data.tomatoURL);
  }
  else {
    request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {
     var data = JSON.parse(body);
                // PARSE THE BODY OF THE SITE WITH THE FOLLWING INFORMATION 
                console.log("Movie name: " + data.Title);
                console.log("Movie released: " + data.Year);
                console.log("Movie's rating is: " + data.imdbRating);
                console.log("Movie was produced in the: " + data.Country);
                console.log("The language for this movie is in: " + data.Language);
                console.log("movie's Plot: " + data.Plot);
                console.log("Movie Actor's: " + data.Actors);
                console.log("Rotten Tomato rating is: " + data.Ratings[1].Value);
                console.log("Rotten Tomato URL is: " + data.tomatoURL);
              });
  }
});
}


function doThis(){
    //fs an npm package for reading and writing files
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        console.log(error);
      }  

  // We will then print the contents of data
  console.log(data);
       // Then split it by commas (to make it more readable)
       var data = data.split(",");
       if (data[0] == "spotify-this-song") {
        spotifyThis(data[1]);
      }
      //if multi-word search term, add.
        for(i=2; i<data.length; i++){
        };

      if (data[1] == "movie-this") {
        movieSearch(data[1]);
        
      }
    });

    }
  
  

