jQuery(function () {

    // Number of issues by authority.
    Papa.parse(issuesurl, {
        download: true,
        header: true,
        complete: function (results) {
            var months = {};
            var authorities = [];
            var datasets = [];
            var labels = [];
            var datatable = [];

            jQuery.each(results.data, function (i, r) {
                if (r['month'] && !months[r['month']]) months[r['month']] = {};
                if (r['month'] && !months[r['month']][r['authority']]) months[r['month']][r['authority']] = r['issues'];
                if (labels.indexOf(r['month']) == -1 && r['month']) labels.push(r['month']);
                if (authorities.indexOf(r['authority']) == -1 && r['authority']) authorities.push(r['authority']);
                if (r['authority'] != '') datatable.push([r['authority'], r['month'], r['issues']]);
            });

            $('#tbl-issues').DataTable({
                data: datatable,
                columns: [
                    {
                        title: 'Authority'
                    },
                    {
                        title: 'Month',
                        render: function (data, type, row) {
                            return moment(data).format('MMM YY');
                        }
                    },
                    { title: 'Issues' },
                ]
            });

            jQuery.each(authorities, function (i, a) {
                datasets.push({
                    backgroundColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ', 0.3)',
                    borderColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ', 0.8)',
                    borderWidth: 1,
                    spanGaps: false,
                    label: a,
                    data: jQuery.map(labels.sort(), function (m, i) { return months[m][a] })
                });
            });

            var chI = document.getElementById("cht-issues");
            var chtIssues = new Chart(chI, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options:
                {
                    scales: {
                        xAxes: [{
                            scaleLabel: { display: true, labelString: 'Month' },
                            ticks: {
                                callback: function (value, index, values) {
                                    return moment(value).format('MMMM YY');
                                }
                            }
                        }],
                        yAxes: [{ scaleLabel: { display: true, labelString: 'Number of Issues' } }]
                    }
                }
            });
        }
    });
});