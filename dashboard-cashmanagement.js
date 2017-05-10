jQuery(function () {
    Papa.parse(cashmanagementurl, {
        download: true,
        complete: function (results) {

        }
    });
});