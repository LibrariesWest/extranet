jQuery(function () {
    Papa.parse(paymentsbyauthorityurl, {
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
                if (labels.indexOf(r.payment_type) == -1 && r.payment_type) labels.push(r.payment_type);
                if (!authorities[r.authority] && r.authority != '') authorities[r.authority] = [];
                if (r.authority != '' && r.number_of_payments != '') authorities[r.authority].push(r.number_of_payments);
                tabledata.push([r.authority, r.payment_type, r.number_of_payments, r.total_paid]);
            });

            jQuery.each(Object.keys(authorities), function (i, a) {
                var linecolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)';
                var bgcolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.2)';
                datasets.push({ label: a, data: authorities[a], borderWidth: 1, borderColor: linecolour, backgroundColor: bgcolour });
            });

            var chI = document.getElementById('cht-bills-paymentsbyauthority');
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
                            labelString: 'Payment Type'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of payments'
                        }
                    }]
                }
            });

            $('#tbl-bills-paymentsbyauthority').DataTable({
                data: tabledata,
                columns: [
                    { title: 'Authority' },
                    { title: 'Payment type' },
                    { title: 'Number of payments' },
                    { title: 'Total paid' }
                ]
            });
        }
    });
});