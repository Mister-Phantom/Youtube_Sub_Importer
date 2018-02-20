var fs = require('fs'),
    childProc = require('child_process'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/subscription_manager.xml', function (err, data) {
    parser.parseString(data, function (err, result) {
        var nodes = result.opml.body[0].outline[0].outline;

        nodes.forEach(function (node, index) {
            var url = node['$'].xmlUrl;
            url = url.substring(url.indexOf('=') + 1, url.length);
            var channel = 'https://www.youtube.com/channel/' + url;
            
            if (index == 1) { // Remove this if you have less than 50 subs or if you have a beefy PC!
                childProc.exec('open -a "Google Chrome" ' + channel);
            } //Remove this bit too!
        });
    });
});
