(function(window, document, undefined){

		var map = L.map('map').setView([32.546813 , -1.054688], 1);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 12,
            minZoom:1
            }).addTo(map);
    
})(this, document);