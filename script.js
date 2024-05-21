document.addEventListener("DOMContentLoaded", function () {
    // создание карты + координаты камеры + масштаб
    var map = L.map('map').setView([60, -70], 3);

    // локальные тайлы
    L.tileLayer('tiles/{z}/{x}/{y}.jpg', {
        minZoom: 3, // мин зум
        maxZoom: 6, // макс зум
        tileSize: 256,
        attribution: '&copy; Тихов Роман, 4ИС-22, Дипломный проект',
        noWrap: true,
        dumpToCanvas: true // fix бага, dumpcanvas.js код
    }).addTo(map);

    // функция - текущий масштаб
    var zoomDisplay = L.control({position: 'bottomleft'});
    zoomDisplay.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'zoom-display');
        div.innerHTML = 'Масштаб: ' + map.getZoom();
        return div;
    };
    zoomDisplay.addTo(map);

    map.on('zoomend', function() {
        document.querySelector('.zoom-display').innerHTML = 'Масштаб: ' + map.getZoom();
    });

    window.map = map;

    // маркеры смерча
    var smercIcon = L.icon({
        iconUrl: 'smerc.png',  
        iconSize: [30, 30], 
        iconAnchor: [10, 10]
    });

    var markers = [
        {
            name: "<b>Северный смерч</b><br><i>«Когда из-за действий великих волшебников случился Катаклизм, то на континенте образовались Северный и Южный Смерчи – территории, потерянные для людей навсегда. Ветра, свирепствующие там, убивали любого, кто осмеливался пересечь невидимую границу.»<br>«Следопыт её не осуждал. Знал, как выглядит его правая половина лица. Их патруль слишком далеко зашёл в Северный смерч, и ветер настиг их. Содрал кожу, изуродовал плоть, высосал глаз. До сих пор ночами возвращалась боль, да такая, словно его сунули головой в жаровню.»</i>",
            lat: 71,
            lng: -52.7
        },
        {
            name: "<b>Южный смерч</b><br><i>«Эту легенду Дэйт прекрасно помнил. Когда из-за действий великих волшебников случился Катаклизм, то на континенте образовались Северный и Южный Смерчи – территории, потерянные для людей навсегда. Ветра, свирепствующие там, убивали любого, кто осмеливался пересечь невидимую границу. Иногда граница слабела, и тогда с бесплодных земель вырывался безжалостный путник. Бродяга. Смерть. Он рыскал по дорогам и пустошам, носился по лесам и оврагам, пока не натыкался на человека и не убивал его. А затем, насытившись, исчезал.»</i>",
            lat: 55,
            lng: -17
        }
    ];

    markers.forEach(function(marker) {
        L.marker([marker.lat, marker.lng], { icon: smercIcon })
            .bindPopup(marker.name)
            .addTo(map);
    });
});
