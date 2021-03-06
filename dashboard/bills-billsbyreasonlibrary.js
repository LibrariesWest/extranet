jQuery(function () {
    Papa.parse(rootdataurl + 'bills_billsbyreasonlibrary.csv', {
        header: true,
        download: true,
        complete: function (results) {
            var reasons = {};
            var datasets = [];
            var labels = [];
            var tabledata = [];
            var libs = {};

            jQuery.each(results.data, function (i, r) {
                if (r.bill_authority == '') return true;
                if (!libs[r.bill_library]) libs[r.bill_library] = 0;
                libs[r.bill_library] = libs[r.bill_library] + parseInt(r.number_of_bills);
                if (!reasons[r.reason]) reasons[r.reason] = {};
                if (!reasons[r.reason][r.bill_library]) reasons[r.reason][r.bill_library] = parseInt(r.total_billed);
                tabledata.push([r.bill_authority, r.bill_library, r.reason, r.number_of_bills, r.total_billed]);
            });

            jQuery.each(Object.keys(libs), function (i, l) {
                if (libs[l] > 15000) labels.push(l);
            });

            jQuery.each(Object.keys(reasons), function (i, a) {
                var r = getRndInteger(0, 6);
                var auth = Object.keys(colours)[r];
                var c = colours[auth];
                var linecolour = 'rgba(' + c.colour[0] + ',' + c.colour[1] + ',' + c.colour[2] + ',1)';
                var bgcolour = 'rgba(' + c.colour[0] + ',' + c.colour[1] + ',' + c.colour[2] + ',0.2)';
                var data = [];
                for (x = 0; x < labels.length; x++) data.push(reasons[a][labels[x]]);
                datasets.push({ label: a, data: data, borderWidth: 1, borderColor: linecolour, backgroundColor: bgcolour });
            });

            var chI = document.getElementById('cht-bills-billsbyreasonlibrary');
            var cht = new Chart(chI, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Library'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Value of bills (pounds)'
                            }
                        }]
                    },
                    title: { display: true, text: 'Value of bills by reason and library (for biggest libraries)' }
                }
            });

            jQuery('#tbl-bills-billsbyreasonlibrary').DataTable({
                data: tabledata,
                columns: [
                    { title: 'Authority' },
                    { title: 'Library' },
                    { title: 'Reason' },
                    { title: 'Number of bills' },
                    { title: 'Total billed' }
                ]
            });
        }
    });
});