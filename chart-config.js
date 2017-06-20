var rootdataurl = '/data/';

var colours = {
    'Bath and North East Somerset': { colour: [37, 164, 69] },
    'Somerset': { colour: [184, 0, 80] },
    'North Somerset': { colour: [206, 245, 242] },
    'South Gloucestershire': { colour: [0, 10, 139] },
    'Dorset': { colour: [239, 155, 31] },
    'Poole': { colour: [0, 148, 170] },
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

// Usage page URLs
var issuesurl = rootdataurl + 'issues.csv';
var issuesbylibraryurl = rootdataurl + 'issuesbylibrary.csv';
var issuesbywardurl = rootdataurl + 'issuesbyward.json';
var holdsurl = rootdataurl + 'holds.csv';

// Stock movement URLs
var longtransitsurl = rootdataurl + 'longtransits.csv';
