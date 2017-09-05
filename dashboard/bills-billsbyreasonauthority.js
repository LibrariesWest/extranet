jQuery(function () {
    Papa.parse(billsbyreasonauthorityurl, {
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
                var authcode = authlongtoshort[r.authority];
                if (r.authority == '') return true;
                if (!reasons[r.reason]) reasons[r.reason] = {};
                if (!reasons[r.reason][authcode]) reasons[r.reason][authcode] = parseInt(r.number_of_bills);
                tabledata.push([r.authority, r.reason, r.number_of_bills, r.total_billed]);
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