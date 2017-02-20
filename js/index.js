
$(document).ready(function(){
  var lat, lon;
  //default location
	var coordinates = '&q=London';
  // grab all the targets
  var locationTarget = $('#location');
  var weatherTarget = $('#weather');
  var tempTarget = $('#temp');
  var humidityTarget = $('#humidity');
  // grab the text from the input
	var locationText = $('#locationText').keyup(function(){
	   coordinates = '&q=' + $(this).val();
	})
	$('#locationBtn').click(function(){
		generate();
	})

  function getLocation() {
    var xmlhttp = new XMLHttpRequest();
    var ip_address = '8.8.8.8';
    var auth = '60262ad8-e6c4-4fd8-bfb1-d48383f50897';
    var locationUrl = "https://ipfind.co/me?auth=" + auth;

    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var data = JSON.parse(this.responseText);
				console.log(data);
        lat = data.latitude;
        lon = data.longitude;
				coordinates = '&lat=' + lat + '&lon=' + lon;
				generate();
      } else if (this.status === 429 || this.status === 400) {
        error();
      }
    }
    xmlhttp.open("GET", locationUrl, true);
    xmlhttp.send();

    function error(){
      // if there is error
      weatherTarget.html("<p>You knocked me off the edge!!</br>The location API only allows 300 requests per day.</p></br><p>Please enter you location manually.</p>");
    }

    // while looking for you location would like to try using an animated gif here
    weatherTarget.html("<p>Finding your location…</p>");

  };
  getLocation();

  var api = 'http://api.openweathermap.org/data/2.5/weather?';
  var key = '&APPID=6bd81b03a64f7ae2cb9240d3271279aa';
  var units = '&units=metric'; // should change, ill do this later

  var location, weather, weatherDesc, temp, humidity, icon, checkbox;

  function generate(){
    var url = api + key + coordinates + units;
    function getIt(){
			$.getJSON(url, gotData);
    }
    function gotData(data){
      console.log(data);
      location = data.name;
      weather = data.weather[0].main;
      weatherDesc = data.weather[0].description;
      temp = Math.floor(data.main.temp);
      humidity = data.main.humidity;
      icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';

      locationTarget.html( '<h1>' + location + '</h1>');
      weatherTarget.html('<h2> ' + weather + '</h2><p>' + weatherDesc + '</p><div id="icon"><img src="' + icon + '"/></div>');
      tempTarget.html( '<h1> ' + temp + '°C</h1>');
      humidityTarget.html('<p>Humidity: ' + humidity + '%</p>');
    };
		getIt();
  }
});