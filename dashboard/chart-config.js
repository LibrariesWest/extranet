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

var itemcats = {
    'Audio/Visual': ['AV', 'AUDIO', 'DVD_EX', 'DVD_18_PR', 'DVD_U_ST', 'DVD_15_PR', 'MUS_CD', 'DVD_15_ST',
        'VISUAL', 'DVD_U_PR', 'CSPW', 'DVD_BX_12', 'DVD_BX_15', 'DVD_PG_ST', 'DVD_BX_U', 'DVD_12_PR',
        'DVD_BX_EX', 'DVD_PG_PR', 'DVD_18_ST', 'DVD_12_ST', 'ASPW', 'DVD_BX_PG', 'DVD_BX_18'],
    'Books and other': ['CH_FIC', 'NEW-BOOK', 'B-O-P', 'LP_NF', 'FAST', 'ADU_GRN', 'REF-BOOK', 'CH_REF',
        'ADU_FIC', 'LANG', 'YA_FIC', 'BOOK', 'ADU_REF', 'LP_FIC', 'ADU_NF', 'YA_NF', 'CH_NF']
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

jQuery(function () {
    jQuery.each(jQuery('.data-link'), function () {
        jQuery(this).attr('href', rootdataurl + jQuery(this).attr('href'));
    });
});

var getRndInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};