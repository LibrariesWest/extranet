jQuery(function () {
    Papa.parse(rootdataurl + 'movement_transitsoversixweeks.csv', {
        header: true,
        download: true,
        complete: function (results) {
            var datasets = [];
            var item_types = {};
            var labels = Object.keys(itemcats);
            var tabledata = [];
            var authorities = {};

            jQuery.each(results.data, function (i, r) {
                if (r.date_transited == '' || r.from_authority == '' || r.to_authority == '') return true;
                if (!authorities[r.from_authority]) authorities[r.from_authority] = {};
                if (!authorities[r.from_authority][r.item_type]) authorities[r.from_authority][r.item_type] = 0;
                authorities[r.from_authority][r.item_type]++;
                tabledata.push([r.date_transited, r.item_id, r.title, r.author, r.shelving_key, r.item_type, r.home_location, r.from_library, r.from_authority, r.to_library, r.to_authority]);
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

            var chI = document.getElementById('cht-movement-transitsoversixweeks');
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
                                labelString: 'Item type category'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Number of items'
                            }
                        }]
                    },
                    title: { display: true, text: 'Number of items in transit over 6 weeks by item type and authority' }
                }
            });

            jQuery('#tbl-movement-transitsoversixweeks').DataTable({
                data: tabledata,
                columns: [
                    { title: 'Date sent' },
                    { title: 'Item ID' },
                    { title: 'Title' },
                    { title: 'Author' },
                    { title: 'Shelving key' },
                    { title: 'Item type' },
                    { title: 'Home location' },
                    { title: 'From library' },
                    { title: 'From authority' },
                    { title: 'To library' },
                    { title: 'To authority' }
                ]
            });
        }
    });
});