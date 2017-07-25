jQuery(function () {
    Papa.parse(paymentsbyauthorityurl, {
        header: true,
        download: true,
        complete: function (results) {
            var autho = {};
            var datasets = [];
            var labels = [];
            var tabledata = [];

            jQuery.each(results.data, function (i, r) {
                if (labels.indexOf(r.reason) == -1 && r.reason) labels.push(r.reason);
                if (!libraries[r.library] && r.library != '') libraries[r.library] = [];
                if (r.library != '' && r.number_of_bills != '') libraries[r.library].push(r.number_of_bills);
                tabledata.push([r.library, r.reason, r.number_of_bills, r.total_billed]);
            });

            jQuery.each(Object.keys(libraries), function (i, a) {
                var auth = libtoauth[a.substring(0, 2)];
                var linecolour = colours[auth] ? 'rgba(' + colours[auth].colour[0] + ',' + colours[auth].colour[1] + ',' + colours[auth].colour[2] + ',1)' : '#ccc';
                var bgcolour = colours[auth] ? 'rgba(' + colours[auth].colour[0] + ',' + colours[auth].colour[1] + ',' + colours[auth].colour[2] + ',0.2)' : '#ccc';
                datasets.push({ label: a, data: libraries[a], borderWidth: 1, borderColor: linecolour, backgroundColor: bgcolour });
            });

            var chI = document.getElementById('cht-bills-billsbyreasonlibrary');
            var cht = new Chart(chI, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Reason'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of bills'
                        }
                    }]
                }
            });

            $('#tbl-bills-billsbyreasonlibrary').DataTable({
                data: tabledata,
                columns: [
                    { title: 'Library' },
                    { title: 'Reason' },
                    { title: 'Number of bills' },
                    { title: 'Total billed' }
                ]
            });
        }
    });
});