/*
* Resposive Geocoder Route Google Maps
* Author :Jeferson Cunha
* www.jefersoncunha.com
*/
$(window).load(function(){
		//Carregar APIs de redirecionamento
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var geocoder = new google.maps.Geocoder(); //GEOlocalizacao	
        var latlng = new google.maps.LatLng(-29.6873416,-53.8078014); //posicao inicial
        
        var mapOptions = { // adicionar funcoes e configuracoes
            scrollwheel:false, // ativar com scroll mouse
            center: latlng, // fator de alinhamento
            zoom: 19, // valor de aproximacao
            mapTypeId: google.maps.MapTypeId.ROADMAP // tipo de mapa
        };
        var map = new google.maps.Map(document.getElementById("map"),mapOptions); //definir variavel DIV a ser exibiba do mapa
        directionsDisplay.setMap(map);
        var marker = new google.maps.Marker({ //adicionar marcador
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP, //animacao em gota para icon
            position: latlng, // posicionamento
            icon: "http://www.fribeiro.com.br/site/images/pointer-mapa.png" // icone personalizado
        });
 
        $('.botao-mapa').click(function() { // funcao de botao chamar a funcao trocar_rota
            tracar_rota();
        });
        $(".box-mapa").keypress(function(e){ //capturar valor do input
            if(e.keyCode == 13){
                    tracar_rota();
            }
        });
		
        function tracar_rota(){ //funcao para trocar mapa e realizar cauculo de rota
            if($('.box-mapa').val() == '' || $('.box-mapa').val() == 'Digite aqui seu endereço...') { //impedir envio de campo vazio
                $('.box-mapa').focus(); //tornar campo selecionado
                return false;
            }else{
                var address = $(".box-mapa").val(); //receber valor do input
                geocoder.geocode( { 'address': address}, function(results, status) { //passar variavel e iniciar reposicionamento
                    if (status == google.maps.GeocoderStatus.OK) {
                        var request = { //requisicoes 
                            origin      : results[0].geometry.location, //localizacao
                            destination : latlng,
                            travelMode  : google.maps.TravelMode.DRIVING //tipo de viagem ( carro, bicicleta, etc)
                        };
                        directionsService.route(request, function(result, status) { //testa as pocicoes iniciais e finais e faz a nova rota
                            if (status == google.maps.DirectionsStatus.OK) { //se mostrar tudo ok, apresenta painel de direcionamento
                                directionsDisplay.setDirections(result);
                            }
                        });
                    } else {
                        alert('Erro, não foi possível encontrar o endereço digitado.'); // se nao for possivel encontrar a rota, informar o usuario
                    }
                });
            }
        }
	});	