jQuery(function () {
    Papa.parse(longtransitsurl, {
        download: true,
        complete: function (results) {
            $('#tbl-long-transits').DataTable( {
                data: results,
                columns: [
                    { title: "Name" },
                    { title: "Position" },
                    { title: "Office" },
                    { title: "Extn." },
                    { title: "Start date" },
                    { title: "Salary" }
                ]
            } );
        }
    });
});