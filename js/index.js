$(function() {
	var clock = $('.clock'),
			weather = $('.weather');
	
	var digits = {
		hours: {},
		minutes: {},
		seconds: {}
	};
	
	for (var key in digits) {
		digits[key] = {
			tens: $('div.' + key + '-tens'),
			ones: $('div.' + key + '-ones')
		} 
	}
	
	function animate(){
		window.requestAnimationFrame(animate);
		var now = new Date();
		var time = {
			hours: now.getHours(),
			minutes: now.getMinutes(),
			seconds: now.getSeconds()
		}
		
		for (var key in time) {
			digits[key].tens.attr('data-digit', Math.floor(time[key] / 10));
			digits[key].ones.attr('data-digit', time[key] % 10);
		}
	};
	
	animate();
	
	function getWeather(){
		$.getJSON( "http://api.openweathermap.org/data/2.5/weather?appid=7fa67d9388cf537869f59cd506677adc&units=metric&q=Nova Odessa,BR", function( data ) {
			if ( data.cod == 200 ) {
				var temp = data.main.temp,
						temp_min = data.main.temp_min,
						temp_max = data.main.temp_min,
						icon = data.weather[0].icon.substring(0, data.weather[0].icon.length - 1);

				console.log(data);
				console.log();
				weather.html( 
					'<div class="icon"><img src="images/' + icon + '.svg"></div>' +
					'<div class="min">' + Math.round( data.main.temp_min ) + 'ºC</div>' +
					'<div class="current">' + Math.round( data.main.temp ) + 'ºC</div>' +
					'<div class="max">' + Math.round( data.main.temp_max ) + 'ºC</div>'
				);
			}
		});
	}
	
	getWeather();

	setInterval(function () {
		getWeather();
	}, 60000);
});