jQuery(function () {

	var rootdataurl = 'data/';
	var lsoa_data_url = rootdataurl + 'membership_borrowersbylibraryanddeprivation_geo.geojson';

	// Number of issues by Ward.
	L.mapbox.accessToken = 'pk.eyJ1IjoiZHhyb3dlIiwiYSI6ImNqMnI5Y2p2cDAwMHQzMm11cjZlOGQ2b2oifQ.uxhJoz3QCO6cARRQ8uKdzw';
	var map = L.mapbox.map('map-borrowers-lsoa', 'mapbox.light').setView([50.97, -2.76], 8);

	var wards = L.mapbox.featureLayer()
		.loadURL(lsoa_data_url)
		.on('ready', function () {
		})
		.addTo(map);

});