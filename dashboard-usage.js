jQuery(function () {

    // Chart 1: Number of issues by authority.
    Papa.parse(issuesurl, {
        download: true,
        complete: function (results) {
            var months = {};
            var authorities = [];
            var datasets = [];
            var labels = [];

            jQuery.each(results.data, function (i, r) {
                if (!months[r[1]]) months[r[1]] = {};
                if (!months[r[1]][r[0]]) months[r[1]][r[0]] = r[2];
                if (labels.indexOf(r[1]) == -1 && r[1]) labels.push(r[1]);
                if (authorities.indexOf(r[0]) == -1 && r[0]) authorities.push(r[0]);
            });

            jQuery.each(authorities, function(i, a){
                datasets.push({
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.4)',
                    borderColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)',
                    borderWidth: 0.5,
                    pointBorderColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)',
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 0.5,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)',
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 1,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false,
                    label: a,
                    data: jQuery.map(labels.sort(), function (m, i) { return months[m][a]  })
                });
            });

            var chI = document.getElementById("cht-issues");
            var chtIssues = new Chart(chI, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options:
                {
                    scales: {
                        xAxes: [{ scaleLabel: { display: true, labelString: 'Month' } }],
                        yAxes: [{ scaleLabel: { display: true, labelString: 'Number of Issues' } }]
                    }
                }
            });
        }
    });

    // Chart 2: Number of issues by library.
    Papa.parse(issuesbylibraryurl, {
        download: true,
        complete: function (results) {

            var datasets = [];

            datasets.push({
                fill: false,
                lineTension: 0.1,
                // backgroundColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.4)',
                // borderColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)',
                borderWidth: 0.5,
                // pointBorderColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)',
                pointBackgroundColor: "#fff",
                pointBorderWidth: 0.5,
                pointHoverRadius: 5,
                // pointHoverBackgroundColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)',
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 1,
                pointRadius: 1,
                pointHitRadius: 10,
                spanGaps: false,
                label: '',
                data: jQuery.map(results.data, function (l, i) { return l[1] })
            });

            var chI = document.getElementById("cht-issues-library");
            var chtIssues = new Chart(chI, {
                type: 'bar',
                data: {
                    labels: jQuery.map(results.data, function (l, i) { return l[0] }),
                    datasets: datasets
                },
                options:
                {
                    scales: {
                        xAxes: [{ scaleLabel: { display: true, labelString: 'Library' } }],
                        yAxes: [{ scaleLabel: { display: true, labelString: 'Number of Issues' } }]
                    }
                }
            });
        }
    });

    // Chart 3: Number of issues by Ward.
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHhyb3dlIiwiYSI6ImNqMnI5Y2p2cDAwMHQzMm11cjZlOGQ2b2oifQ.uxhJoz3QCO6cARRQ8uKdzw';
    var map = new mapboxgl.Map({
        container: 'map-issues-ward',
        style: 'mapbox://styles/mapbox/light-v9',
            zoom: 12,
            center: [-122.447303, 37.753574]
    });

    var wards = L.mapbox.featureLayer()
    .loadURL(issuesbywardurl)
    .on('ready', function() {
        wards.eachLayer(function(layer) {
            layer.bindPopup(layer.features.properties.name);
            layer.setStyle({ color: '#ccc' });
        });
    })
    .addTo(map);

    // Chart 4: Number of holds by authority.
    Papa.parse(holdsurl, {
        download: true,
        complete: function (results) {
            var months = {};
            var authorities = [];
            var datasets = [];
            var labels = [];

            jQuery.each(results.data, function (i, r) {
                if (!months[r[1]]) months[r[1]] = {};
                if (!months[r[1]][r[0]]) months[r[1]][r[0]] = r[2];
                if (labels.indexOf(r[1]) == -1 && r[1]) labels.push(r[1]);
                if (authorities.indexOf(r[0]) == -1 && r[0]) authorities.push(r[0]);
            });

            jQuery.each(authorities, function (i, a) {
                datasets.push({
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.4)',
                    borderColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)',
                    borderWidth: 0.5,
                    pointBorderColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)',
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 0.5,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)',
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 1,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false,
                    label: a,
                    data: jQuery.map(labels.sort(), function (m, i) { return months[m][a] })
                });
            });

            var chI = document.getElementById("cht-holds");
            var chtIssues = new Chart(chI, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options:
                {
                    scales: {
                        xAxes: [{ scaleLabel: { display: true, labelString: 'Month' } }],
                        yAxes: [{ scaleLabel: { display: true, labelString: 'Number of Holds Placed' } }]
                    }
                }
            });
        }
    });
});