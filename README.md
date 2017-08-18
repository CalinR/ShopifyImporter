# ShopifyImporter

[![NPM Version](http://img.shields.io/npm/v/shopify-importer.svg?style=flat)](https://www.npmjs.org/package/shopify-importer)
[![NPM Downloads](https://img.shields.io/npm/dm/shopify-importer.svg?style=flat)](https://www.npmjs.org/package/shopify-importer)

## Installation
  ```
  $ npm install -g shopify-importer
  ```
## Get API Access

  * Go to https://shopify-store-name.myshopify.com/admin/app/private and click "Generate API Credentials"
  * Fill in private app name
  * Set "Products, variants and collections" to "Read and Write"
  * Click save
  
## Usage
  ```
  $ shopify-importer [filename.csv] --apikey=[apikey] --password=[password] --shop=[shop]
  ```
  
  * apikey = apikey from private app
  * password = password from private app
  * shop = shop name without https:// and .myshopify.com