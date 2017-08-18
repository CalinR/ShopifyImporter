#! /usr/bin/env node
const fs = require('fs');
const program = require('commander');
const Shopify = require('shopify-api-node');
const parse = require('csv-parse');
const ProgressBar = require('progress');
let filename;
let apiKey;
let password;
let shop;
let csvData = [];

program.arguments('<file>')
    .option('-a, --apikey <apikey>', 'The Shopify API Key')
    .option('-p, --password <password>', 'The Shopify API Password')
    .option('-s, --shop <shop>', 'The Shopify Shop Name')
    .action(function(file) {
        filename = file;
        apiKey = program.apikey;
        password = program.password;
        shop = program.shop;
    }).parse(process.argv);

if(!filename){
    console.error('filename is required');
    process.exit(1);
}
if(!apiKey){
    console.error('apikey is required');
    process.exit(1);
}
if(!password){
    console.error('password is required');
    process.exit(1);
}
if(!shop){
    console.error('shop is required');
    process.exit(1);
}

const shopify = new Shopify({
  shopName: shop,
  apiKey: apiKey,
  password: password,
  autoLimit: true
});

function uploadCollections(){
    const bar = new ProgressBar('importing: :current/:total [:bar] :percent', {
        complete: '=',
        incomplete: '-',
        width: 75,
        total: csvData.length
    })

    for(const [index, row] of csvData.entries()){
        let data = {
            title: row.Title,
            rules: [
                {
                    "column": row.Column,
                    "relation": row.Relation,
                    "condition": row.Condition
                }
            ]
        };

        if(row.Description){
            data.body_html = row.Description;
        }
        if(row.Handle){
            data.handle = row.Handle;
        }
        if(row.Image){
            data.image = {
                src: row.Image
            }
        }

        shopify.smartCollection.create(data).then(function(){
            if (bar.complete) {
                console.log('\ncomplete\n');
            }
            else {
                bar.tick();
            }
        })
    }
}

fs.createReadStream(filename)
    .pipe(parse({delimiter: ',', columns: true }))
    .on('data', function(csvrow) {
        csvData.push(csvrow);        
    })
    .on('end',function() {
        uploadCollections();
    });