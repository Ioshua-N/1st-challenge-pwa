// Declara as variáveis de latitude e longitude no escopo global
var latitude;
var longitude;
var map;
var coordenadas;
var marker;

// Função para receber latitude e longitude
if ("geolocation" in navigator) 
{
    navigator.geolocation.getCurrentPosition(function (position) 
    {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        
        // Após receber as coordenadas, chama a função para inicializar o mapa
        initMap();
        readJSON();
    });
} 
else 
{
    // Problema na localização
    alert("Não foi possível usar a localização.");
}

// Função para inicializar o mapa
function initMap() 
{
    // Verifica se as coordenadas estão definidas
    if (typeof latitude !== 'undefined' && typeof longitude !== 'undefined') 
    {
        // Cria um objeto LatLng com as coordenadas
        coordenadas = new google.maps.LatLng(latitude, longitude);

        // Opções de configuração do mapa
        var mapOptions = 
        {
            center: coordenadas,
            zoom: 15, // Nível de zoom (0 a 21)
        };

        // Cria o objeto do mapa
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Adiciona um marcador para indicar a localização
        marker = new google.maps.Marker(
        {
            position: coordenadas,
            map: map,
            title: 'Você está aqui'
        });
    } 
    else 
    {
        alert("Latitude e/ou longitude não definidas.");
    }
}

function readJSON() 
{
    fetch('academiadacidade.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                // Create a LatLng object with the coordinates
                const coordenadas = new google.maps.LatLng(element.latitude, element.longitude);

                // Create a marker
                const marker = new google.maps.Marker({
                    position: coordenadas,
                    map: map, // Make sure 'map' is defined in your code
                    title: element.nome_oficial
                });

                // Optionally, you can add an event listener to the marker
                marker.addListener('click', () => {
                    // Handle marker click event here
                    console.log(`Marker clicked: ${element.nome_oficial}`);
                });
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}