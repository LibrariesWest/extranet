jQuery(function () {
    Papa.parse(rootdataurl + 'bills_paymentsbyauthorityanditemtypeandmonth.csv', {
        header: true,
        download: true,
        complete: function (results) {
            var authorities = {};
            var datasets = [];
            var labels = Object.keys(itemcats);
            var tabledata = [];

            jQuery.each(results.data, function (i, r) {
                if (r.payment_authority == '') return true;
                if (!authorities[r.payment_authority] && r.payment_authority != '') authorities[r.payment_authority] = {};
                if (!authorities[r.payment_authority][r.item_type]) authorities[r.payment_authority][r.item_type] = 0;
                if (r.payment_authority != '' && r.number_of_payments != '') authorities[r.payment_authority][r.item_type] = authorities[r.payment_authority][r.item_type] + parseFloat(r.total_paid);
                tabledata.push([r.payment_authority, r.payment_month, r.item_authority, r.item_type, r.reason, r.payment_type, r.number_of_payments, r.total_paid]);
            });

            jQuery.each(Object.keys(authorities), function (i, a) {
                var linecolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)';
                var bgcolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.2)';
                var data = jQuery.map(labels, function (l, i) {
                    var sum = 0;
                    jQuery.each(authorities[a], function (z, i) {
                        if (itemcats[l].indexOf(z) != -1) sum = sum + i;
                    });
                    return sum || 0;
                });
                datasets.push({ label: a, data: data, borderWidth: 1, borderColor: linecolour, backgroundColor: bgcolour });
            });

            var chI = document.getElementById('cht-bills-paymentsbyauthorityanditemtypeandmonth');
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
                                labelString: 'Item type'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Value of payments'
                            }
                        }]
                    },
                    title: { display: true, text: 'Value of payments by authority and item type' }
                }
            });

            jQuery('#tbl-bills-paymentsbyauthorityanditemtypeandmonth').DataTable({
                data: tabledata,
                columns: [
                    { title: 'Authority' },
                    { title: 'Month' },
                    { title: 'Item authority' },
                    { title: 'Item type' },
                    { title: 'Reason' },
                    { title: 'Payment type' },
                    { title: 'Number of payments' },
                    { title: 'Total paid (&pound;)' }
                ]
            });
        }
    });
});