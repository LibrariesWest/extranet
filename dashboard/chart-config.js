var rootdataurl = '/data/';

var colours = {
    'Bath and North East Somerset': { colour: [255, 99, 132] },
    'Somerset': { colour: [54, 162, 235] },
    'North Somerset': { colour: [255, 206, 86] },
    'South Gloucestershire': { colour: [75, 192, 192] },
    'Dorset': { colour: [153, 102, 255] },
    'Poole': { colour: [255, 159, 64] },
    'Bristol': { colour: [255, 204, 0] }
};

var libtoauth = {
    'BN': 'Bath and North East Somerset',
    'SO': 'Somerset',
    'NS': 'North Somerset',
    'SG': 'South Gloucestershire',
    'DO': 'Dorset',
    'PO': 'Poole',
    'BS': 'Bristol'
};

var authlongtoshort = {
    'Bath and North East Somerset': 'BN',
    'Somerset': 'SO',
    'North Somerset': 'NS',
    'South Gloucestershire': 'SG',
    'Dorset': 'DO',
    'Poole': 'PO',
    'Bristol': 'BS'
};

// Bills URLs
var billsbydeprivationurl = rootdataurl + 'bills_billsbydeprivation.csv';
var billsbyreasonauthorityurl = rootdataurl + 'bills_billsbyreasonauthority.csv';
var billsbyreasonlibraryurl = rootdataurl + 'bills_billsbyreasonlibrary.csv';
var paymentsbyauthorityurl = rootdataurl + 'bills_paymentsbyauthority.csv';
var paymentsbylibraryurl = rootdataurl + 'bills_paymentsbylibrary.csv';

jQuery(function () {
    jQuery('.data-link').attr('href', rootdataurl + jQuery('.data-link').attr('href'));

});

var getRndInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};