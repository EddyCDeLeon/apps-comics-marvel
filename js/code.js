angular.module('ComicApp', ['angular-md5'])
    .controller('ComicsListCtrl', ['MarvelService', function(MarvelService) {
        var vm = this;
        var datosCategoria = [];
        vm.mensajeHeader = "App Comics Marvel";
        vm.mensajewelcome = "Bienvenidos";
        vm.mensajeComic = "Los mejores comics de Super Heroes de Marvel";
        vm.mensajeSearch = "Buscar Comics por:";
        vm.categoriaSelect = '';
        vm.listarDatos = function() {
          console.log("listarDatos", datosCategoria);
          //return datosCategoria;
          return MarvelService.listCategorias();
        };
        vm.list = function() {
            return MarvelService.listCategorias();
        };
        vm.ButtonClick = function() {
            console.log("En ButtonClick, categoria seleccionada: ", vm.categoriaSelect);
            MarvelService.listComics(vm.categoriaSelect)
            .then(function (result) {
                console.log("ButtonClick resultado: ", result);
                datosCategoria = result;
            });
        };
    }])
    .service('MarvelService', ['$http', '$q', 'md5', function($http, $q, md5) {
        var marvelModel = this;
        var publicKey = 'a4703ddc654f493c1b7923a859f68e4a';
        var privateKey = '6fed95bf3af7a38b3405f2c50e65d380b9dd2758';
        var baseUrl = 'http://gateway.marvel.com/v1/';
        var limit = 20; // default is 20
        var ts = new Date().getTime();
        var hash = md5.createHash(ts + privateKey + publicKey);
        var laSeleccion = '';
        var laLista = [];
        var categories = [{
            title: 'Characters',
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
            title: 'Creators',
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
        function extraer(resultado) {
            return resultado.data.data.results;
                        //laLista = response.data.data.results;
        }
        function cacheCategorias(resultado) {
            laLista = extraer(resultado);
            //console.log("cacheCategorias: ", laLista)
            return laLista;
        }
        this.listCategorias = function() {
            return categories;
        };
        this.listComics = function(selection) {
            return (selection == laSeleccion) ? $q.when(laLista):getComics(selection);
        };
        function getComics (selection) {
            laSeleccion = selection;
            console.log('En listComics, selection: ', selection);
            var laCategoriaSeleccionada = _.find(categories, function(category) {
                return category.title == selection;
            });
            console.log('La categoria actual, objeto completo, en listComics: ', laCategoriaSeleccionada);
            console.log('La categoria para el query a Marvel: ', laCategoriaSeleccionada.title.toLowerCase());
            var laCategoria = laCategoriaSeleccionada.title.toLowerCase();
            var url = baseUrl + 'public/' + laCategoria + '?limit=' + limit + '&apikey=' + publicKey;
            url += "&ts=" + ts + "&hash=" + hash;
            console.log('url: ', url);
            return $http.get(url)
                .then(cacheCategorias);
        }; // end this.listComics
    }]);
