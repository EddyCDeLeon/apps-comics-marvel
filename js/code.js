angular.module('ComicApp', ['angular-md5'])
    .controller('ComicsListCtrl', ['MarvelService', function(MarvelService) {
        var vm = this;
        vm.mensajeHeader = "App Comics Marvel";
        vm.mensajewelcome = "Bienvenidos";
        vm.mensajeComic = "Los mejores comics de Super Heroes de Marvel";
        vm.mensajeSearch = "Buscar Comics por:";
        vm.datosCategoria = [];
        vm.list = function() {
            return MarvelService.list();
        };
        vm.ButtonClick = function () {
            //console.log(vm.repeatSelect);
            datosCategoria = MarvelService.listComics(vm.repeatSelect);
            console.log(datosCategoria);

        };
        /*var init = function() {
            MarvelService.getComics();
        };
        init();*/

    }])
    .service('MarvelService', ['$http', 'md5', function($http, md5) {
        var categories = [{
            title: 'Characteres',
            img: 'portrait_incredible',
            nombre: 'Nombre de Ejemplo 1',
            id: '1',
            autor: 'Carlos olmedo'
        }, {
            title: 'Comics',
            img: 'portrait_incredible2',
            nombre: 'Nombre de Ejemplo 2',
            id: '2',
            autor: 'Eddy Leon'
        }, {
            title: 'Creator',
            img: 'portrait_incredible3',
            nombre: 'Nombre de Ejemplo 3',
            id: '3',
            autor: 'Katarina Solar'
        }, {
            title: 'Events',
            img: 'portrait_incredible4',
            nombre: 'Nombre de Ejemplo 4',
            id: '4',
            autor: 'Melvin Castro'
        }, {
            title: 'Series',
            img: 'portrait_incredible5',
            nombre: 'Nombre de Ejemplo 5',
            id: '5',
            autor: 'Sonia Jax'
        }, {
            title: 'Stories',
            img: 'portrait_incredible6',
            nombre: 'Nombre de Ejemplo 6',
            id: '6',
            autor: 'Joel Pizarro'
        }];
        this.list = function() {
            return categories;
        };
        this.add = function(category) {
            categories.push(category);
        };
        this.listComics = function (selection) {
          //return comics;

          switch(selection) {
              case "Characteres":
                  return characteresList;
                  break;
              case "Comics":
                  return comicsList;
                  break;
              case "Creator":
                  return creatorList;
                  break;
              case "Events":
                  return eventsList;
                  break;
              case "Series":
                  return seriesList;
                  break;
              case "Stories":
                  return storiesList;
                  break;
              default:
                  console.log("En listComics", selection);
          }

        };

        var characteresList = [];
        var comicsList  = [];
        var creatorList  = [];
        var eventsList  = [];
        var seriesList  = [];
        var storiesList  = [];

        var publicKey = 'a4703ddc654f493c1b7923a859f68e4a';
        var privateKey = '6fed95bf3af7a38b3405f2c50e65d380b9dd2758';
        var baseUrl = 'http://gateway.marvel.com/v1/';
        var limit = 20; // default is 20
        var url = baseUrl + 'public/comics?limit=' + limit + '&apikey=' + publicKey;
        var ts = new Date().getTime();
        var hash = md5.createHash(ts + privateKey + publicKey);
		url += "&ts="+ts+"&hash="+hash;

        this.getComics = function() {
            console.log('url: ', url)
            return $http.get(url)
                .then(
                    function(response) {
                        comics = response.data.data.results;
                        //console.log('got Comics: ', comics)
                    });
        };
    }]);
