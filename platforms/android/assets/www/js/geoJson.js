angular.module('geoJsonVars', [])

.service('jsonVars', [function(){

	var countries = [
		{ _cities: _cities },
		{ _countries: _countries }
	];
	this.countries = countries;

	var nationalities = [
	{ _coastline: _coastline }
	];
	this.nationalities = nationalities;

	var zones = [
		{ _coastline: _coastline },
		{ _poly200: _poly200 },
		{ _poly500: _poly500 },
		{ _poly1000: _poly1000 },
		{ _poly2000: _poly2000 },
		{ _poly3000: _poly3000 },
		{ _poly4000: _poly4000 },
		{ _poly5000: _poly5000 },
		{ _ice: _ice }
	]	
	this.zones = zones;
	
}]);