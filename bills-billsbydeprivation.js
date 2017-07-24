jQuery(function () {

var url = rooturl + 'bills-billsbydeprivation.csv';
    Papa.parse(url, {
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
});