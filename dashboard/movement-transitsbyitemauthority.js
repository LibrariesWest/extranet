jQuery(function () {
    Papa.parse(rootdataurl + 'movement_transitsbyitemauthority.csv', {
        header: true,
        download: true,
        complete: function (results) {
            var datasets = [];
            var item_types = {};
            var labels = Object.keys(itemcats);
            var tabledata = [];
            var authorities = {};

            jQuery.each(results.data, function (i, r) {
                if (r.item_type == '' || r.from_authority == '') return true;
                if (!authorities[r.from_authority]) authorities[r.from_authority] = {};
                if (!authorities[r.from_authority][r.item_type]) authorities[r.from_authority][r.item_type] = 0;
                authorities[r.from_authority][r.item_type] = (authorities[r.from_authority][r.item_type] + parseInt(r.number_of_items))
                tabledata.push([r.from_authority, r.item_type, r.to_authority, r.number_of_items]);
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

            var chI = document.getElementById('cht-movement-transitsbyitemauthority');
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
                    title: { display: true, text: 'Number of items in transit by item type and from authority' }
                }
            });

            jQuery('#tbl-movement-transitsbyitemauthority').DataTable({
                data: tabledata,
                columns: [
                    { title: 'From authority' },
                    { title: 'Item type' },
                    { title: 'To authority' },
                    { title: 'Number of items' }
                ]
            });
        }
    });
});