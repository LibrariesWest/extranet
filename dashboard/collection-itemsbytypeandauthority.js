jQuery(function () {

    var rootdataurl = 'data/';

    var colours = {
        'Bath and North East Somerset': { line: '#25A445', background: '#25A445' },
        'Somerset': { line: '#B80050', background: '#B80050' },
        'North Somerset': { line: '#CEF5F2', background: '#CEF5F2' },
        'South Gloucestershire': { line: '#000A8B', background: '#000A8B' },
        'Dorset': { line: '#EF9B1F', background: '#EF9B1F' },
        'Poole': { line: '#0094AA', background: '#0094AA' },
        'Bristol': { line: '#FFCC00', background: '#FFCC00' } 
    };

    var issuesurl = rootdataurl + 'issues.csv';
    var holdsurl = rootdataurl + 'holds.csv';
    var residentsurl = rootdataurl + 'residentusers.csv';

    Papa.parse(issuesurl, {
        download: true,
        complete: function(results) {
            var authorities = {};
            var datasets = [];
            var labels = [];
            
            jQuery.each(results.data, function(i, r){
                if (labels.indexOf(r[1]) == -1 && r[1]) labels.push(r[1]);
                if (!authorities[r[0]] && r[0] != '') authorities[r[0]] = [];
                if (r[0] != '' && r[2] != '') authorities[r[0]].push(r[2]);
            });

            jQuery.each(Object.keys(authorities), function(i, a){
                datasets.push({ label: a, data: authorities[a], fill: false, borderColor: (colours[a].line || '#ccc'), backgroundColor: (colours[a].line || '#ccc') });
            });

            var chI = document.getElementById("cht-issues");
            var chtIssues = new Chart(chI, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                }
            });
        }
    });

    Papa.parse(residentsurl, {
        download: true,
        complete: function(results) {
            var data = [];
            var labels = [];
            jQuery.each(results.data, function(i, r){
                if (r[0]) labels.push(r[0]);
                if (r[3]) data.push(r[3]);
            });
            
            var chI = document.getElementById("cht-residents");
            var chtIssues = new Chart(chI, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{ data: data }]
                }
            });
        }
    });
});