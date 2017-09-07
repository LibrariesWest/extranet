jQuery(function () {
    Papa.parse(paymentsbylibraryurl, {
        header: true,
        download: true,
        complete: function (results) {
            var paymenttypes = {};
            var datasets = [];
            var labels = [];
            var tabledata = [];
            var libs = {};

            jQuery.each(results.data, function (i, r) {
                if (r.payment_type == '' || r.library == '') return true;
                if (!libs[r.library]) libs[r.library] = 0;
                libs[r.library] = libs[r.library] + parseInt(r.total_paid);
                if (!paymenttypes[r.payment_type]) paymenttypes[r.payment_type] = {};
                if (!paymenttypes[r.payment_type][r.library]) paymenttypes[r.payment_type][r.library] = parseInt(r.total_paid);
                tabledata.push([r.authority, r.library, r.payment_type, r.number_of_payments, r.total_paid]);
            });

            jQuery.each(Object.keys(libs), function (i, l) {
                if (libs[l] > 20000) labels.push(l);
            });

            jQuery.each(Object.keys(paymenttypes), function (i, a) {
                var r = getRndInteger(0, 6);
                var auth = Object.keys(colours)[r];
                var c = colours[auth];
                var linecolour = 'rgba(' + c.colour[0] + ',' + c.colour[1] + ',' + c.colour[2] + ',1)';
                var bgcolour = 'rgba(' + c.colour[0] + ',' + c.colour[1] + ',' + c.colour[2] + ',0.2)';
                var data = [];
                for (x = 0; x < labels.length; x++) data.push(paymenttypes[a][labels[x]]);
                datasets.push({ label: a, data: data, borderWidth: 1, borderColor: linecolour, backgroundColor: bgcolour });
            });

            var chI = document.getElementById('cht-bills-paymentsbylibrary');
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
                                labelString: 'Value of payments (pounds)'
                            }
                        }]
                    },
                    title: { display: true, text: 'Value of payments by type and library (for biggest libraries)' }
                }
            });

            $('#tbl-bills-paymentsbylibrary').DataTable({
                data: tabledata,
                columns: [
                    { title: 'Authority' },
                    { title: 'Library' },
                    { title: 'Payment Type' },
                    { title: 'Number of payments' },
                    { title: 'Total paid' }
                ]
            });
        }
    });
});