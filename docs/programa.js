const map = L.map('map').setView([4.628, -74.065], 16);

// Capa satelital ESRI
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri',
    maxZoom: 19
}).addTo(map);

// Ruta GPX
new L.GPX("ruta.gpx", {
    async: true,
    marker_options: {
        startIconUrl: null,
        endIconUrl: null,
        shadowUrl: null
    }
}).on('loaded', function(e) {
    map.fitBounds(e.target.getBounds());
}).addTo(map);

// Ícono personalizado
const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// Cargar los puntos
fetch('puntos.gpx')
    .then(res => res.text())
    .then(gpxText => {
        const parser = new DOMParser();
        const gpxDoc = parser.parseFromString(gpxText, "application/xml");
        const points = gpxDoc.getElementsByTagName("wpt");

        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const lat = point.getAttribute("lat");
            const lon = point.getAttribute("lon");
            const imgNumber = i + 1;
            const imageUrl = `img/img${imgNumber}.png`; // ✅ Cambiado a carpeta img/

            const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);
            marker.bindPopup(`<img src="${imageUrl}" width="200" alt="Imagen ${imgNumber}">`);
        }
    });
