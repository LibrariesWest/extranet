jQuery(function () {
    Papa.parse(rootdataurl + 'collection_itemsbytypeandlibrary.csv', {
        header: true,
        download: true,
        complete: function (results) {
            var datasets = [];
            var item_types = {};
            var labels = [];
            var tabledata = [];
            var libs = {}

            jQuery.each(results.data, function (i, r) {
                if (r.library == '' || r.item_type == '' || r.authority == '') return true;
                if (!libs[r.library]) libs[r.library] = 0;
                libs[r.library] = libs[r.library] + parseInt(r.number_of_items);
                if (!item_types[r.item_type]) item_types[r.item_type] = {};
                if (!item_types[r.item_type][r.bill_library]) item_types[r.item_type][r.library] = parseInt(r.number_of_items);
                tabledata.push([r.authority, r.library, r.item_type, r.number_of_items]);
            });

            jQuery.each(Object.keys(libs), function (i, l) {
                if (libs[l] > 20000) labels.push(l);
            });

            jQuery.each(Object.keys(itemcats), function (i, a) {
                var r = getRndInteger(0, 6);
                var auth = Object.keys(colours)[r];
                var c = colours[auth];
                var linecolour = 'rgba(' + c.colour[0] + ',' + c.colour[1] + ',' + c.colour[2] + ',1)';
                var bgcolour = 'rgba(' + c.colour[0] + ',' + c.colour[1] + ',' + c.colour[2] + ',0.2)';
                var data = [];
                for (x = 0; x < labels.length; x++) {
                    var sum = 0;
                    jQuery.each(itemcats[a], function (y, key) {
                        if (key in item_types && labels[x] in item_types[key]) sum = sum + item_types[key][labels[x]]
                    })
                    data.push(sum);
                }
                datasets.push({ label: a, data: data, borderWidth: 1, borderColor: linecolour, backgroundColor: bgcolour });
            });

            var chI = document.getElementById('cht-collection-itemsbytypeandlibrary');
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
                                labelString: 'Library'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Number of items'
                            }
                        }]
                    },
                    title: { display: true, text: 'Number of items by type and library (for top libraries)' }
                }
            });

            jQuery('#tbl-collection-itemsbytypeandlibrary').DataTable({
                data: tabledata,
                columns: [
                    { title: 'Authority' },
                    { title: 'Library' },
                    { title: 'Item type' },
                    { title: 'Number of items' }
                ]
            });
        }
    });
});