jQuery(function () {
    Papa.parse(billsbyauthorityandmonthunpaidurl, {
        header: true,
        download: true,
        complete: function (results) {
            var authorities = {};
            var datasets = [];
            var labels = [];
            var tabledata = [];

            jQuery.each(results.data, function (i, r) {
                if (r.authority == '') return true;
                var year = r.month.substring(0, 4);
                if (labels.indexOf(year) == -1) labels.push(year);
                if (!authorities[r.authority]) authorities[r.authority] = {};
                if (authorities[r.authority] && !authorities[r.authority][year]) authorities[r.authority][year] = 0;
                authorities[r.authority][year] = authorities[r.authority][year] + parseInt(r.total_billed);
                tabledata.push([r.authority, r.month, r.number_of_bills, r.total_billed]);
            });

            labels = labels.sort();

            jQuery.each(Object.keys(authorities), function (i, a) {
                var linecolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)';
                var bgcolour = 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.2)';
                var data = [];
                for (x = 0; x < labels.length; x++) data.push(authorities[a][labels[x]] || 0);
                datasets.push({ label: a, data: data, borderWidth: 1, borderColor: linecolour, backgroundColor: bgcolour });
            });

            var chI = document.getElementById("cht-bills-billsbyauthorityandmonthunpaid");
            var cht = new Chart(chI, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    animation: { animateScale: true },
                    scales: {
                        xAxes: [{ scaleLabel: { display: true, labelString: 'Year' } }],
                        yAxes: [{ scaleLabel: { display: true, labelString: 'Value of bills (pounds)' } }]
                    },
                    title: { display: true, text: 'Value of unpaid bills by authority and year' }
                }
            });

            $('#tbl-bills-billsbyauthorityandmonthunpaid').DataTable({
                data: tabledata,
                columns: [
                    { title: 'Authority' },
                    { title: 'Month' },
                    { title: 'Number of bills' },
                    { title: 'Total billed' }
                ]
            });
        }
    });
});