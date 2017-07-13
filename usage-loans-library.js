jQuery(function () {
    // Number of issues by library.
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
});