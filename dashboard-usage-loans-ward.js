jQuery(function () {

    // Number of issues by Ward.
    L.mapbox.accessToken = 'pk.eyJ1IjoiZHhyb3dlIiwiYSI6ImNqMnI5Y2p2cDAwMHQzMm11cjZlOGQ2b2oifQ.uxhJoz3QCO6cARRQ8uKdzw';
    var map = L.mapbox.map('map-issues-ward', 'mapbox.light').setView([50.97, -2.76], 8);

    var wards = L.mapbox.featureLayer()
        .loadURL(issuesbywardurl)
        .on('ready', function () {
            var totalwards = 0;
            var allwards = {};
            wards.eachLayer(function (layer) {
                allwards[layer.feature.properties.ward] = layer.feature.properties.issues;
                totalwards++;
            });
            var wardssorted = Object.keys(allwards).sort(function (a, b) { return allwards[a] - allwards[b] });
            wards.eachLayer(function (layer) {
                layer.bindPopup('<h3>' + layer.feature.properties.ward + '</h3><p>Issues: ' + layer.feature.properties.issues + '</p>');
                layer.setStyle({ weight: 1, color: '#6699FF', fillColor: '#6699FF', fillOpacity: (wardssorted.indexOf(layer.feature.properties.ward) / totalwards).toFixed(1) });
            });
        })
        .addTo(map);
});