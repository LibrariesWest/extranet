jQuery(function () {
    Papa.parse(rootdataurl + 'bills_billsbyreasonauthority.csv', {
        header: true,
        download: true,
        complete: function (results) {
            var reasons = {};
            var datasets = [];
            var labels = [];
            var tabledata = [];

            jQuery.each(Object.keys(libtoauth), function (i, a) {
                labels.push(a);
            });

            jQuery.each(results.data, function (i, r) {
                var authcode = authlongtoshort[r.bill_authority];
                if (r.bill_authority == '') return true;
                if (!reasons[r.reason]) reasons[r.reason] = {};
                if (!reasons[r.reason][authcode]) reasons[r.reason][authcode] = parseInt(r.total_billed);
                tabledata.push([r.bill_authority, r.reason, r.number_of_bills, r.total_billed]);
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

            var chI = document.getElementById('cht-bills-billsbyreasonauthority');
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
                                labelString: 'Authority'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Value of bills (pounds)'
                            }
                        }]
                    },
                    title: { display: true, text: 'Value of bills by authority and bill reason' }
                }
            });

            jQuery('#tbl-bills-billsbyreasonauthority').DataTable({
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