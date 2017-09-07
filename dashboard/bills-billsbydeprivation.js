jQuery(function () {
    Papa.parse(billsbydeprivationurl, {
        header: true,
        download: true,
        complete: function (results) {
            var authorities = {};
            var datasets = [];
            var labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            var tabledata = [];

            jQuery.each(results.data, function (i, r) {
                if (r.bill_authority == '') return true;
                if (!authorities[r.bill_authority]) authorities[r.bill_authority] = {};
                if (authorities[r.bill_authority] && !authorities[r.bill_authority][r.imd_decile]) authorities[r.bill_authority][r.imd_decile] = 0;
                authorities[r.bill_authority][r.imd_decile] = authorities[r.bill_authority][r.imd_decile] + parseInt(r.total_billed);
                tabledata.push([r.bill_authority, r.reason, r.imd_decile, r.number_of_bills, r.total_billed]);
            });

            jQuery.each(Object.keys(authorities), function (i, a) {
                var linecolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)';
                var bgcolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.2)';
                var data = [];
                for (x = 0; x < labels.length; x++) data.push(authorities[a][labels[x]] || 0);
                datasets.push({ label: a, data: data, borderWidth: 1, borderColor: linecolour, backgroundColor: bgcolour });
            });

            var chI = document.getElementById("cht-bills-billsbydeprivation");
            var cht = new Chart(chI, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    animation: { animateScale: true },
                    scales: {
                        xAxes: [{ scaleLabel: { display: true, labelString: 'Index of Multiple Deprivation (1-10)' } }],
                        yAxes: [{ scaleLabel: { display: true, labelString: 'Value of bills (pounds)' } }]
                    },
                    title: { display: true, text: 'Multiple deprivation index by number of bills' }
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