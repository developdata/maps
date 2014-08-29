(function(window, document, undefined){
		//create a Leaflet map and attach to div element
		var map = L.map('map_leaflet').setView([32.546813 , -1.054688], 1);
		
        var mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';

        //add a tile layer    
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 5,
            minZoom:1,
            }).addTo(map);
    
})(this, document);