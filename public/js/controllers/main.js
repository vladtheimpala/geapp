app.controller('mainController', function($scope, $http, API_URL, $rootScope) {

  //*******************************************//
  // 01 ) INITIALISATION
  //*******************************************//

    /**
     * 1.1 Récupère les données des commissions, leurs membres et le dernier PV dans le local storage s'il y a Internet
     *
     * @param aucun paramètre
     */
    if(navigator.onLine){
      $.getJSON( "../js/data/commissions.json", function( data ) {
        localStorage.setItem('commissions', JSON.stringify(data));
      });
      $.getJSON( "../js/data/deputes.json", function( data ) {
        localStorage.setItem('deputes', JSON.stringify(data));
      });
      $.getJSON( "../js/data/dernierpv.json", function( data ) {
        localStorage.setItem('mesDerniersPv', JSON.stringify(data));
      });
    }

    /**
     * 1.2 Récupère les PV dans le scope depuis le local storage ou crée le espace de stockage la première fois
     *
     * @param aucun paramètre
     */
    if(localStorage.getItem('mesPv')){

      var mesPv = JSON.parse(localStorage.getItem('mesPv'));

      $rootScope.mesPv = mesPv;
    }else{
      var mesPv = [];
      localStorage.setItem('mesPv', JSON.stringify(mesPv));
      $rootScope.mesPv = mesPv;


    }

    /**
     * 1.3 Récupère les PV de la corbeille dans le scope depuis le local storage ou crée le espace de stockage la première fois
     *
     * @param aucun paramètre
     */
    if(localStorage.getItem('mesPvCorbeille')){

      var mesPvCorbeille = JSON.parse(localStorage.getItem('mesPvCorbeille'));

      $rootScope.mesPvCorbeille = mesPvCorbeille;
    }else{
      var mesPvCorbeille = [];
      localStorage.setItem('mesPvCorbeille', JSON.stringify(mesPvCorbeille));
      $rootScope.mesPvCorbeille = mesPvCorbeille;

    }


    /**
     * 1.4 Récupère dernier PV de la commission dans le scope depuis le local storage ou crée le espace de stockage la première fois
     *
     * @param aucun paramètre
     */
    if(localStorage.getItem('mesDerniersPv')){

      var mesDerniersPv = JSON.parse(localStorage.getItem('mesDerniersPv'));

      $rootScope.mesDerniersPv = mesDerniersPv;
    }else{
      var mesDerniersPv = [];
      localStorage.setItem('mesDerniersPv', JSON.stringify(mesDerniersPv));
      $rootScope.mesDerniersPv = mesDerniersPv;

    }


    /**
     * 1.5 Initialisation et enregistrement du SW (Service Worker) pour la mise en cache
     *
     * @param aucun paramètre
     */
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('../../js/sw/service-worker.js', {})
            .then(function (registration) {
                console.log(registration);
            })
            .catch(function (e) {
                console.error(e);
            })
    } else {
        console.log('Service Worker is not supported in this browser.')
    }



    //*******************************************//
    // 02 ) EVENEMENTS
    //*******************************************//

    /**
     * 2.1 Récupère les PV stocker dans le local storage
     *
     * @param aucun paramètre
     */
      $rootScope.refreshSeance = function(){

        var mesPv = JSON.parse(localStorage.getItem('mesPv'));

        $rootScope.mesPv = mesPv;

      }



      /**
       * 2.2 Affiche / masque le conteneur de l'uploader de fichier audio / lecteur audio
       *
       * @param aucun paramètre
       */
      $scope.toggleAudio = function(){

        $('#audio-panel').toggle();
        $('#toggle-audio-icon').hide();

      }


});
