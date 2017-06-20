jQuery(function () {

    // Chart 1: Number of issues by authority.
    Papa.parse(issuesurl, {
        download: true,
        header: true,
        complete: function (results) {
            var months = {};
            var authorities = [];
            var datasets = [];
            var labels = [];
            var datatable = [];

            jQuery.each(results.data, function (i, r) {
                if (r['month'] && !months[r['month']]) months[r['month']] = {};
                if (r['month'] && !months[r['month']][r['authority']]) months[r['month']][r['authority']] = r['issues'];
                if (labels.indexOf(r['month']) == -1 && r['month']) labels.push(r['month']);
                if (authorities.indexOf(r['authority']) == -1 && r['authority']) authorities.push(r['authority']);
                if (r['authority'] != '') datatable.push([r['authority'], r['month'], r['issues']]);
            });

            $('#tbl-issues').DataTable({
                data: datatable,
                columns: [
                    {
                        title: 'Authority'
                    },
                    {
                        title: 'Month',
                        render: function (data, type, row) {
                            return moment(data).format('MMM YY');
                        }
                    },
                    { title: 'Issues' },
                ]
            });

            jQuery.each(authorities, function (i, a) {
                datasets.push({
                    backgroundColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ', 0.3)',
                    borderColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ', 0.8)',
                    borderWidth: 1,
                    spanGaps: false,
                    label: a,
                    data: jQuery.map(labels.sort(), function (m, i) { return months[m][a] })
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
                        xAxes: [{
                            scaleLabel: { display: true, labelString: 'Month' },
                            ticks: {
                                callback: function (value, index, values) {
                                    return moment(value).format('MMMM YY');
                                }
                            }
                        }],
                        yAxes: [{ scaleLabel: { display: true, labelString: 'Number of Issues' } }]
                    }
                }
            });
        }
    });

    // Chart 2: Number of issues by library.
    Papa.parse(issuesbylibraryurl, {
        download: true,
        header: true,
        complete: function (results) {
            var datasets = [];
            var authorities = [];
            var datatable = [];

            jQuery.each(results.data, function (i, r) {
                var auth = libtoauth[r['library'].substring(0, 2)];
                if (authorities.indexOf(auth) == -1 && auth) authorities.push(auth);
                datatable.push([auth, r['library'], r['month'], r['issues']]);
            });

            $('#tbl-issues-library').DataTable({
                data: datatable,
                columns: [
                    {
                        title: 'Authority'
                    },
                    {
                        title: 'Library'
                    },
                    {
                        title: 'Month',
                        render: function (data, type, row) {
                            return moment(data).format('MMM YY');
                        }
                    },
                    { title: 'Issues' },
                ]
            });

            jQuery.each(authorities, function (i, a) {
                datasets.push({
                    fill: false,
                    borderWidth: 1,
                    backgroundColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ', 0.3)',
                    borderColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ', 0.7)',
                    spanGaps: true,
                    label: a,
                    data: jQuery.map(results.data, function (l, i) {
                        var auth = libtoauth[l['library'].substring(0, 2)];
                        if (l['issues'] >= 50000) {
                            if (l['library'] != '' && auth == a) {
                                return l['issues']
                            } else {
                                return 0;
                            }
                        }
                    })
                });
            });

            var chI = document.getElementById("cht-issues-library");
            var chtIssues = new Chart(chI, {
                type: 'bar',
                data: {
                    labels: jQuery.map(results.data, function (l, i) { if (l['issues'] >= 50000) return l['library'] }),
                    datasets: datasets
                },
                options:
                {
                    scales: {
                        xAxes: [{ stacked: true, scaleLabel: { display: true, labelString: 'Library' }, ticks: { autoSkip: true, fontSize: 8 } }],
                        yAxes: [{ stacked: true, scaleLabel: { display: true, labelString: 'Number of Issues' } }]
                    },
                    legend: { display: true }
                }
            });
        }
    });

    // Chart 3: Number of issues by Ward.
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

    // Chart 4: Number of holds by authority.
    Papa.parse(holdsurl, {
        download: true,
        header: true,
        complete: function (results) {
            var months = {};
            var authorities = [];
            var datasets = [];
            var labels = [];

            jQuery.each(results.data, function (i, r) {
                if (r['month'] && !months[r['month']]) months[r['month']] = {};
                if (r['month'] && !months[r['month']][r['authority']]) months[r['month']][r['authority']] = r['holds'];
                if (labels.indexOf(r['month']) == -1 && r['month']) labels.push(r['month']);
                if (authorities.indexOf(r['authority']) == -1 && r['authority']) authorities.push(r['authority']);
            });

            jQuery.each(authorities, function (i, a) {
                datasets.push({
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.4)',
                    borderColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.9)',
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