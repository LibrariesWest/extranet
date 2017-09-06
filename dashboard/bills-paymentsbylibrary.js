jQuery(function () {
    Papa.parse(paymentsbylibraryurl, {
        header: true,
        download: true,
        complete: function (results) {
            var libraries = {};
            var datasets = [];
            var labels = [];
            var tabledata = [];

            jQuery.each(results.data, function (i, r) {
                if (labels.indexOf(r.payment_type) == -1 && r.payment_type) labels.push(r.payment_type);
                if (!libraries[r.library] && r.library != '') libraries[r.library] = [];
                if (r.library != '' && r.number_of_payments != '') libraries[r.library].push(r.total_paid);
                tabledata.push([r.authority, r.library, r.payment_type, r.number_of_payments, r.total_paid]);
            });

            jQuery.each(Object.keys(libraries), function (i, a) {
                var linecolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)';
                var bgcolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.2)';
                datasets.push({ label: a, data: libraries[a], borderWidth: 1, borderColor: linecolour, backgroundColor: bgcolour });
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
                                labelString: 'Payment Type'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Number of payments'
                            }
                        }]
                    },
                    title: { display: true, text: 'Value of payments by library and payment type' }
                }
            });

            $('#tbl-bills-paymentsbylibrary').DataTable({
                data: tabledata,
                columns: [
                    { title: 'Authority' },
                    { title: 'Library' },
                    { title: 'Payment type' },
                    { title: 'Number of payments' },
                    { title: 'Total paid' }
                ]
            });
        }
    });
});