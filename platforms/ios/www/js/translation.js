angular.module('translate', [])

.service('lang', function(){

	var langs = {};
	langs.ru = { 
		   labels: {
		﻿
		"Mt. McKinley (6194m)": "Гора МакКинли (6194m)",
		"Mt. Chamberlin (2749m)": "Гора Чемберлин (2749m)",
		"Mt. Washington (1917m)": "Гора Вашингтон (1917m)",
		"Mt. Katahdin (1606m)": "Гора Катадин (1606m)",
		"Mt. Mitchell (2037m)": "Гора Митчелл (2037m)",
		"Mt. Blanc (4807m)": "Гора Блан (4807m)",
		"Jebel Toubkal (4165m)": "Джебел Тубкал (4165m)",
		"Thabana Ntlenyana (3482m)": "Табана Нетленная (3482m)",
		"Gora Elbrus (5642m)": "Гора Эльбрус (5642m)",
		"Wutai Shan (3058m)": "Ватаи Шан (3058m)",
		"Klyuchevskaya Sopka (4750m)": "Ключевская сопка (4750m)",
		"Gunung Kinabalu (4101m)": "Гуну Кинабалу (4101m)",
		"Puncak Jaya (4884m)": "Панкак Джайя (4884m)",
		"Mt. Kosciuszko (2228m)": "Гора Косчюшко (2228m)"
		﻿
		  },

		  mapNames: {
		  	"Nationalities": "Народы",
		  	"Climate Zones": "Климатические зоны",
		  	"Lakes": "Озера",
		  	"Countries": "Страны"
		  },

		  settings: {
		  	"Language": "Язык"

		  },

		  menu: {
		  	"Countries": "Страны",
		  	"Countries map": "Карта стран",
		  	"Lakes": "Озера",
		  	"Lakes map": "Карта озер",
		  	"Nationalities": "Народы",
		  	"Nationalities map": "Карта народов",
		  	"Zones": "Зоны",
		  	"Zones map": "Карта зон"
		  }
		}
	this.langs = langs;

})