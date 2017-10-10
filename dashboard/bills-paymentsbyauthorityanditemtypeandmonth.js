jQuery(function () {
    Papa.parse(paymentsbyauthorityanditemtypeandmonthurl, {
        header: true,
        download: true,
        complete: function (results) {
            var authorities = {};
            var itemcats = {
                AV: ['AV', 'AUDIO', 'DVD_EX', 'DVD_18_PR', 'DVD_U_ST', 'DVD_15_PR', 'MUS_CD', 'DVD_15_ST',
                    'VISUAL', 'DVD_U_PR', 'CSPW', 'DVD_BX_12', 'DVD_BX_15', 'DVD_PG_ST', 'DVD_BX_U', 'DVD_12_PR',
                    'DVD_BX_EX', 'DVD_PG_PR', 'DVD_18_ST', 'DVD_12_ST', 'ASPW', 'DVD_BX_PG', 'DVD_BX_18'],
                Other: ['CH_FIC', 'NEW-BOOK', 'B-O-P','LP_NF', 'FAST','ADU_GRN', 'REF-BOOK','CH_REF',
                    'ADU_FIC','LANG', 'YA_FIC', 'BOOK', 'ADU_REF', 'LP_FIC', 'ADU_NF', 'YA_NF', 'CH_NF']
            };
            var datasets = [];
            var labels = [];
            var tabledata = [];

            jQuery.each(results.data, function (i, r) {
                if (r.payment_authority == '') return true;
                if (labels.indexOf(r.item_type) == -1 && r.item_type) labels.push(r.item_type);
                if (!authorities[r.payment_authority] && r.payment_authority != '') authorities[r.payment_authority] = {};
                if (!authorities[r.payment_authority][r.item_type]) authorities[r.payment_authority][r.item_type] = 0;
                if (r.payment_authority != '' && r.number_of_payments != '') authorities[r.payment_authority][r.item_type] = authorities[r.payment_authority][r.item_type] + parseFloat(r.total_paid);
                tabledata.push([r.payment_authority, r.payment_month, r.item_authority, r.item_type, r.reason, r.payment_type, r.number_of_payments, r.total_paid]);
            });

            jQuery.each(Object.keys(authorities), function (i, a) {
                var linecolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)';
                var bgcolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.2)';
                var data = $.map(labels, function (l, i) {
                    return authorities[a][l] || 0;
                })
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

            $('#tbl-bills-paymentsbyauthorityanditemtypeandmonth').DataTable({
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