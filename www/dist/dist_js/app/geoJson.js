angular.module('geoJsonVars', [])

.service('jsonVars', [function(){
	var countries = [
		{ cities: _cities },
		{ countries: _countries }
	];
	var nationalities = [
	{ coastline: _coastline }
	];
	var zones = [
		{ coastline: _coastline },
		{ poly200: _poly200 },
		{ poly500: _poly500 },
		{ poly1000: _poly1000 },
		{ poly2000: _poly2000 },
		{ poly3000: _poly3000 },
		{ poly4000: _poly4000 },
		{ poly5000: _poly5000 },
		{ ice: _ice }
	]	

	this.countries = countries;
	this.nationalities = nationalities;
	this.zones = zones;

}]);