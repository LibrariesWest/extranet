jQuery(function () {
    Papa.parse(billsbydeprivationurl, {
        header: true,
        download: true,
        complete: function (results) {
            var authorities = {};
            var datasets = [];
            var labels = [];
            var tabledata = [];

            jQuery.each(results.data, function (i, r) {
                if (labels.indexOf(r.imd_decile) == -1 && r.reason) labels.push(r.imd_decile);
                if (!authorities[r.authority] && r.authority != '') authorities[r.authority] = [];
                if (r.authority != '' && r.number_of_bills != '') authorities[r.authority].push(r.number_of_bills);
                if (r.authority != '' && r.number_of_bills != '') tabledata.push([r.authority, r.reason, r.imd_decile, r.number_of_bills, r.total_billed]);
            });

            jQuery.each(Object.keys(authorities), function (i, a) {

                var linecolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)';
                var bgcolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.2)';
                datasets.push({ label: a, data: authorities[a], borderWidth: 1, borderColor: linecolour, backgroundColor: bgcolour });
            });

            var chI = document.getElementById("cht-bills-billsbydeprivation");
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
                            labelString: 'Index of Multiple Deprivation'
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

            $('#tbl-bills-billsbydeprivation').DataTable({
                data: tabledata,
                columns: [
                    { title: 'Authority' },
                    { title: 'Reason' },
                    { title: 'IMD Decile' },
                    { title: 'Number of bills' },
                    { title: 'Total billed' }
                ]
            });
        }
    });
});