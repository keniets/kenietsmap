//Centralized storage of application data

angular.module('dataStorage', [])

    .service('attrService', function(){

        var fonts = {
          fontSize: "12px"
        };

        var layerAttrs = {
			LayerPoly_oceans: {
				color: "rgba(214,242,237,1)",
				dataName: "_oceans"
			},

			LayerPoly_lakes: {
				color: "rgba(204,231,140,1)",
				dataName: "_lakes"
			},
			LayerPoly_labels: {
				color: "rgba(204,231,140,1)",
				dataName: "_labels"
			},

            LayerPoly_coastline: {
                color: "rgba(204,231,140,1)",
                dataName: "_coastline"
            },

            LayerPoly_countries: {
                color: "grey",
                fillColor: "#f5e213",
                fillOpacity: 0.5,
                weight: "1",
                dataName: "_countries"
            },

            LayerPoly_poly200: {
                color: "rgba(245,247,210,1)",
                dataName: "_poly200"
            },

            LayerPoly_poly500: {
                color: "rgba(237,242,80,1)",
                dataName: "_poly500"
            },

            LayerPoly_poly1000: {
                color: "rgba(245,226,19,1)",
                dataName: "_poly1000"
            },

            LayerPoly_poly2000: {
                color: "rgba(227,207,26,1)",
                dataName: "_poly2000"
            },

            LayerPoly_poly3000: {
                color: "rgba(221,191,56,1)",
                dataName: "_poly3000"
            },

            LayerPoly_poly4000: {
                color: "rgba(214,179,36,1)",
                dataName: "_poly4000"
            },

            LayerPoly_poly5000: {
                color: "rgba(214,156,36,1)",
                dataName: "_poly5000"
            },

            LayerPoly_ice: {
                color: "rgba(214,242,237,1)",
                dataName: "_ice"
            }
        };

        var icons = {
            emptydot: {
                type: 'div',
                iconSize: [0, 0]
            },

            mountain: {
                iconUrl: 'img/Mountain-vector-simple.png',
                iconRetinaUrl: 'img/Mountain-vector-simple.png',
                iconSize: [36, 28],
                iconAnchor: [35, 18],
                popupAnchor: [-3, -6]
            },

            valley: {
                iconUrl: 'img/valley-vector-simple.png',
                iconRetinaUrl: 'img/valley-vector-simple.png',
                iconSize: [36, 28],
                iconAnchor: [35, 18],
                popupAnchor: [-3, -6]
            },

            asteroid: {
                iconUrl: 'img/photo_2016-06-14_16-44-17.jpg',
                iconRetinaUrl: 'img/photo_2016-06-14_16-44-17.jpg',
                iconSize: [36, 28],
                iconAnchor: [35, 18],
                popupAnchor: [-3, -6]
            }
        };

        var mountainPeaks = {

            m13: {
                lat: 63.069403387,
                lng: -151.007313606,
                icon: icons.valley,
                focus: false,
                label: {message: 'Mt. McKinley (6194m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m46: {
                lat: 69.281073309,
                lng: -144.913624641,
                icon: icons.valley,
                focus: false,
                label: {message: 'Mt. Chamberlin (2749m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m30: {
                lat: 44.267279364,
                lng: -71.307423469,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Washington (1917m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m31: {
                lat: 45.903387762,
                lng: -68.923634407,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Katahdin (1606m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m83: {
                lat: 35.764715887,
                lng: -82.268055793,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Mitchell (2037m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m84: {
                lat: 35.586920477,
                lng: -83.497425911,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Clingmans Dome (2025m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m85: {
                lat: 38.714972235,
                lng: -79.535206672,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Spruce Knob (1482m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m86: {
                lat: 36.677008368,
                lng: -81.562001106,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Rogers (1746m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m14: {
                lat: 36.582709052,
                lng: -118.292225715,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Whitney (4421m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m32: {
                lat: 41.409308173,
                lng: -122.194996711,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Shasta (4322m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m33: {
                lat: 43.763373114,
                lng: -110.801808235,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Grand Teton (4199m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m34: {
                lat: 45.384466864,
                lng: -121.696583625,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Hood (3426m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m75: {
                lat: 38.986273505,
                lng: -114.313404914,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Wheeler Pk. (3982m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m76: {
                lat: 44.140082098,
                lng: -113.78221595,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Borah Pk. (3859m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m77: {
                lat: 45.253668524,
                lng: -117.296681282,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Sacajawea Pk. (2999m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m78: {
                lat: 45.906378485,
                lng: -114.313832161,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Trapper Pk. (3096m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m79: {
                lat: 40.782110907,
                lng: -110.372547981,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Kings Pk. (4123m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m80: {
                lat: 48.795904852,
                lng: -121.823231575,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Baker (3286m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m81: {
                lat: 39.12506745,
                lng: -106.44640052,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Elbert (4402m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m82: {
                lat: 38.073004462,
                lng: -107.477040168,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Uncompahgre Pk. (4361m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m1: {
                lat: -3.075738214,
                lng: 37.353282097,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Kilimanjaro (5895m)', options: {noHide: true}},
                layer: "eastafrica"
            },
            m35: {
                lat: -0.150079034,
                lng: 37.299937371,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Kenya (5199m)', options: {noHide: true}},
                layer: "eastafrica"
            },
            m36: {
                lat: 0.380072333,
                lng: 29.872080925,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Stanley (4979m)', options: {noHide: true}},
                layer: "eastafrica"
            },
            m54: {
                lat: 6.666693427,
                lng: 39.41675866,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Batu (4307m)', options: {noHide: true}},
                layer: "eastafrica"
            },
            m55: {
                lat: 6.109808661,
                lng: 36.747325066,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Argun (3418m)', options: {noHide: true}},
                layer: "eastafrica"
            },
            m56: {
                lat: 3.95508454,
                lng: 32.90125573,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Kinyeti (3187m)', options: {noHide: true}},
                layer: "eastafrica"
            },
            m57: {
                lat: 9.268866278,
                lng: 41.733531121,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Muleta (3405m)', options: {noHide: true}},
                layer: "eastafrica"
            },
            m58: {
                lat: 13.236761786,
                lng: 38.372325066,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Ras Dejen (4533m)', options: {noHide: true}},
                layer: "eastafrica"
            },
            m59: {
                lat: 1.123114325,
                lng: 34.5341903,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Elgon (4321m)', options: {noHide: true}},
                layer: "eastafrica"
            },
            m62: {
                lat: 10.656683661,
                lng: 37.882212761,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Talo (4413m)', options: {noHide: true}},
                layer: "eastafrica"
            },
            m63: {
                lat: -0.324761652,
                lng: 36.623667839,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Lesatima (4001m)', options: {noHide: true}},
                layer: "eastafrica"
            },
            m3: {
                lat: 27.980475165,
                lng: 86.880625847,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Everest (8848m)', options: {noHide: true}},
                layer: "tibet"
            },
            m7: {
                lat: 35.882391669,
                lng: 76.513194207,
                icon: icons.mountain,
                focus: false,
                label: {message: 'K2 (8611m)', options: {noHide: true}},
                layer: "tibet"
            },
            m8: {
                lat: 36.416510321,
                lng: 87.413218621,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Muztag Feng (6973m)', options: {noHide: true}},
                layer: "tibet"
            },
            m9: {
                lat: 31.06659577,
                lng: 81.312510613,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Kailash (6638m)', options: {noHide: true}},
                layer: "tibet"
            },
            m24: {
                lat: 29.595770575,
                lng: 101.879161004,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Gongga Shan (7556m)', options: {noHide: true}},
                layer: "tibet"
            },
            m25: {
                lat: 28.696478583,
                lng: 83.4951278,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Dhaulagiri (8172m)', options: {noHide: true}},
                layer: "tibet"
            },
            m27: {
                lat: 32.81659577,
                lng: 80.999888543,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Nganglong Kangri (6720m)', options: {noHide: true}},
                layer: "tibet"
            },
            m28: {
                lat: 33.416632391,
                lng: 91.083384636,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Geladandong (6621m)', options: {noHide: true}},
                layer: "tibet"
            },
            m45: {
                lat: 27.874701239,
                lng: 92.531993035,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Kangt (7060m)', options: {noHide: true}},
                layer: "tibet"
            },
            m66: {
                lat: 34.800116278,
                lng: 99.466563347,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Magen Gangri (6282m)', options: {noHide: true}},
                layer: "tibet"
            },
            m67: {
                lat: 33.950079657,
                lng: 107.750132683,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Taibai Shan (3767m)', options: {noHide: true}},
                layer: "tibet"
            },
            m68: {
                lat: 30.542486884,
                lng: 79.970957879,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Nanda Devi (7817m)', options: {noHide: true}},
                layer: "tibet"
            },
            m69: {
                lat: 32.249884345,
                lng: 109.000010613,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Daba Shan (2708m)', options: {noHide: true}},
                layer: "tibet"
            },
            m39: {
                lat: 38.932379462,
                lng: 72.021739129,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Pik Imeni Ismail Samani (7495m)', options: {noHide: true}},
                layer: "wasia"
            },
            m40: {
                lat: 42.289984442,
                lng: 71.054209832,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Gora Manas (4482m)', options: {noHide: true}},
                layer: "wasia"
            },
            m41: {
                lat: 34.642096259,
                lng: 67.62769616,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Shah Fuladi (5048m)', options: {noHide: true}},
                layer: "wasia"
            },
            m42: {
                lat: 33.117010809,
                lng: 64.188365105,
                icon: icons.mountain,
                focus: false,
                label: {message: 'K?h-e Jang Qaleh (4171m)', options: {noHide: true}},
                layer: "wasia"
            },
            m2: {
                lat: -78.529351495,
                lng: -85.633717414,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Vinson Massif (4892m)', options: {noHide: true}}
            },
            m11: {
                lat: 43.355169989,
                lng: 42.439219597,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Gora Elbrus (5642m)', options: {noHide: true}}
            },
            m16: {
                lat: -36.455865167,
                lng: 148.263194207,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Kosciuszko (2228m)', options: {noHide: true}}
            },
            m17: {
                lat: -32.655694269,
                lng: -70.015797493,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Cerro Aconcagua (6959m)', options: {noHide: true}},
                layer: "SouthAmerica"

            },
            m19: {
                lat: 5.451666571,
                lng: -66.375599739,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Cero Raya (2070m)', options: {noHide: true}},
                layer: "SouthAmerica"

            },
            m21: {
                lat: -76.272881769,
                lng: -112.099842903,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Takahe (3460m)', options: {noHide: true}}
            },
            m22: {
                lat: -77.031548761,
                lng: -126.066517707,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Sidley (4285m)', options: {noHide: true}}
            },
            m23: {
                lat: -85.3475888,
                lng: -167.554676887,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Fridtjof Nansen (4069m)', options: {noHide: true}}
            },
            m26: {
                lat: 49.807074286,
                lng: 86.606333855,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Belukha (4506m)', options: {noHide: true}},
                layer: "Eurasia"
            },
            m29: {
                lat: 45.833685614,
                lng: 6.865000847,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mt. Blanc (4807m)', options: {noHide: true}}
            },
            m37: {
                lat: 56.055975653,
                lng: 160.643931511,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Klyuchevskaya Sopka (4750m)', options: {noHide: true}}
            },
            m38: {
                lat: 43.795111395,
                lng: 88.317393425,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Bogda Feng (5445m)', options: {noHide: true}},
                layer: "Eurasia"

            },
            m43: {
                lat: 51.716376044,
                lng: 100.616587761,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Gora Munku-Sardyk (3491m)', options: {noHide: true}},
                layer: "Eurasia"
            },
            m44: {
                lat: 39.087591864,
                lng: 113.570201043,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Wutai Shan (3058m)', options: {noHide: true}},
                layer: "tibet"

            },
            m47: {
                lat: 6.083380438,
                lng: 116.549937371,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Gunung Kinabalu (4101m)', options: {noHide: true}},
                layer: "Eurasia"

            },
            m48: {
                lat: -4.077691339,
                lng: 137.166270379,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Puncak Jaya (4884m)', options: {noHide: true}}
            },
            m49: {
                lat: -1.469292902,
                lng: -78.81749427,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Chimborazo (6267m)', options: {noHide: true}},
                layer: "SouthAmerica"
            },
            m50: {
                lat: 8.55286286,
                lng: -71.052723762,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Pico Bolvar (4980m)', options: {noHide: true}},
                layer: "SouthAmerica"

            },
            m51: {
                lat: -31.991631769,
                lng: -64.916005012,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Cerro Champaqu (2770m)', options: {noHide: true}},
                layer: "SouthAmerica"

            },
            m52: {
                lat: 31.062079169,
                lng: -7.916127082,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Jebel Toubkal (4165m)', options: {noHide: true}},
                layer: "Eurasia"
            },
            m53: {
                lat: -29.466607355,
                lng: 29.266734246,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Thabana Ntlenyana (3482m)', options: {noHide: true}},
                layer: "Eurasia"
            },
            m64: {
                lat: 47.599982001,
                lng: 97.550181511,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Otgon Tenger (4000m)', options: {noHide: true}},
                layer: "Eurasia"
            },
            m65: {
                lat: 58.288275458,
                lng: 115.007090691,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Gora Korolenko (1647m)', options: {noHide: true}},
                layer: "Eurasia"
            },
            m70: {
                lat: 41.523810126,
                lng: 97.119395379,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Mazong Shan (2584m)', options: {noHide: true}},
                layer: "tibet"
            },
            m71: {
                lat: 49.700079657,
                lng: 109.98316491,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Gora Burun-Shibertuy (2519m)', options: {noHide: true}},
                layer: "Eurasia"
            },
            m72: {
                lat: 56.401495673,
                lng: 119.098033074,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Skalistyy Golets (2467m)', options: {noHide: true}},
                layer: "Eurasia"
            },
            m73: {
                lat: 56.364081122,
                lng: 111.631480339,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Inyaptuk Golets (2641m)', options: {noHide: true}},
                layer: "Eurasia"
            },
            m74: {
                lat: 53.925665595,
                lng: 96.038584832,
                icon: icons.mountain,
                focus: false,
                label: {message: 'Grandiozny Pk. (2891m)', options: {noHide: true}},
                layer: "Eurasia"
            }
        };

        var marValleys = {
            m12: {
                lat: 36.24225495,
                lng: -116.828236457,
                icon: icons.valley,
                focus: false,
                label: {message: 'Death Valley (-86m)', options: {noHide: true}},
                layer: "NorthAmerica"
            },
            m20: {
                lat: 11.67182038,
                lng: 42.413340691,
                icon: icons.valley,
                focus: false,
                label: {message: 'Lake Assal (-156m)', options: {noHide: true}},
                layer: "eastafrica"
            },
            m10: {
                lat: 44.257574774,
                lng: 49.009532097,
                icon: icons.valley,
                focus: false,
                label: {message: 'Caspian Sea (-28m)', options: {noHide: true}}
            },
            m60: {
                lat: 30.043585516,
                lng: 27.496226433,
                icon: icons.valley,
                focus: false,
                label: {message: 'Qattara Depression (-133m)', options: {noHide: true}}
            },
            m61: {
                lat: 21.205511786,
                lng: -11.373036262,
                icon: icons.valley,
                focus: false,
                label: {message: 'Er Richat Depression (485m)', options: {noHide: true}}
            },
            m5: {
                lat: 31.515387274,
                lng: 35.474742058,
                icon: icons.valley,
                focus: false,
                label: {message: 'Dead Sea (-416m)', options: {noHide: true}}
            },
            m4: {
                lat: 42.768683173,
                lng: 89.340098504,
                icon: icons.valley,
                focus: false,
                label: {message: 'Turpan Depression (-154m)', options: {noHide: true}}
            },
            m15: {
                lat: -28.448663019,
                lng: 137.284434441,
                icon: icons.valley,
                focus: false,
                label: {message: 'Lake Eyre (-16m)', options: {noHide: true}}
            },
            m18: {
                lat: -42.623955988,
                lng: -63.968800422,
                icon: icons.valley,
                focus: false,
                label: {message: 'Valdes Peninsula (-40m)', options: {noHide: true}}
            }
        };

        this.attrs = layerAttrs;
        this.mountainPeaks = mountainPeaks;
        this.marValleys = marValleys;
        this.fonts = fonts;
        this.icons = icons;
    });

