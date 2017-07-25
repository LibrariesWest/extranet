jQuery(function () {
    Papa.parse(billsbyreasonauthorityurl, {
        header: true,
        download: true,
        complete: function (results) {
            var authorities = {};
            var datasets = [];
            var labels = [];
            var tabledata = [];

            jQuery.each(results.data, function (i, r) {
                if (labels.indexOf(r.reason) == -1 && r.reason) labels.push(r.reason);
                if (!authorities[r.authority] && r.authority != '') authorities[r.authority] = [];
                if (r.authority != '' && r.number_of_bills != '') authorities[r.authority].push(r.number_of_bills);
                tabledata.push([r.authority, r.reason, r.number_of_bills, r.total_billed]);
            });

            jQuery.each(Object.keys(authorities), function (i, a) {

                var linecolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)';
                var bgcolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.2)';
                datasets.push({ label: a, data: authorities[a], borderWidth: 1, borderColor: linecolour, backgroundColor: bgcolour });
            });

            var chI = document.getElementById('cht-bills-billsbyreasonauthority');
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

            $('#tbl-bills-billsbyreasonauthority').DataTable({
                data: tabledata,
                columns: [
                    { title: 'Authority' },
                    { title: 'Reason' },
                    { title: 'Number of bills' },
                    { title: 'Total billed' }
                ]
            });
        }
    });
});