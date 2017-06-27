jQuery(function () {

    // Number of holds by authority.
    Papa.parse(holdsurl, {
        download: true,
        header: true,
        complete: function (results) {
            var months = {};
            var authorities = [];
            var datasets = [];
            var labels = [];

            jQuery.each(results.data, function (i, r) {
                if (r['month'] && !months[r['month']]) months[r['month']] = {};
                if (r['month'] && !months[r['month']][r['authority']]) months[r['month']][r['authority']] = r['holds'];
                if (labels.indexOf(r['month']) == -1 && r['month']) labels.push(r['month']);
                if (authorities.indexOf(r['authority']) == -1 && r['authority']) authorities.push(r['authority']);
            });

            jQuery.each(authorities, function (i, a) {
                datasets.push({
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.4)',
                    borderColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',0.9)',
                    borderWidth: 0.5,
                    pointBorderColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)',
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 0.5,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(' + colours[a].colour[0] + ',' + colours[a].colour[1] + ',' + colours[a].colour[2] + ',1)',
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 1,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false,
                    label: a,
                    data: jQuery.map(labels.sort(), function (m, i) { return months[m][a] })
                });
            });

            var chI = document.getElementById("cht-holds");
            var chtIssues = new Chart(chI, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options:
                {
                    scales: {
                        xAxes: [{ scaleLabel: { display: true, labelString: 'Month' } }],
                        yAxes: [{ scaleLabel: { display: true, labelString: 'Number of Holds Placed' } }]
                    }
                }
            });
        }
    });
});