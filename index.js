const fs = require('fs');
const config = require('./config.json');
const Shopify = require('shopify-api-node');
const parse = require('csv-parse');
const ProgressBar = require('progress');
let csvData = [];
const shopify = new Shopify({
  shopName: config.shop,
  apiKey: config.api_key,
  password: config.password,
  autoLimit: true
});

fs.createReadStream(config.csv_name)
    .pipe(parse({delimiter: ',', columns: true }))
    .on('data', function(csvrow) {
        csvData.push(csvrow);        
    })
    .on('end',function() {
        uploadCollections();
    });

function uploadCollections(){
    const bar = new ProgressBar('importing: :current/:total [:bar] :percent', {
        complete: '=',
        incomplete: '-',
        width: 75,
        total: csvData.length
    })

    for(const [index, row] of csvData.entries()){
        shopify.smartCollection.create({
            title: row.Title,
            body_html: row.Description,
            rules: [
                {
                    "column": row.Column,
                    "relation": row.Relation,
                    "condition": row.Condition
                }
            ]
        }).then(function(){
            if (bar.complete) {
                console.log('\ncomplete\n');
            }
            else {
                bar.tick();
            }
        })
    }
}