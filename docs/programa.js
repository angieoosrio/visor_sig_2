// Crear el mapa centrado en Bogotá
const mapa = L.map('mapa').setView([4.7110, -74.0721], 13);

// Capa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
}).addTo(mapa);

// Cargar archivo GPX sin waypoints para evitar errores por íconos
const gpx = new L.GPX("POO1.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'https://unpkg.com/leaflet-gpx@1.7.0/pin-icon-start.png',
        endIconUrl: 'https://unpkg.com/leaflet-gpx@1.7.0/pin-icon-end.png',
        shadowUrl: 'https://unpkg.com/leaflet-gpx@1.7.0/pin-shadow.png',
        wptIcons: false
    },
    polyline_options: {
        color: 'blue',
        weight: 4,
        opacity: 0.75
    }
});

// Escuchar cuando se cargue y añadir al mapa
gpx.on('loaded', function(e) {
    mapa.fitBounds(e.target.getBounds());
}).addTo(mapa);
