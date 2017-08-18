# ShopifyImporter

[![NPM Version](http://img.shields.io/npm/v/shopify-importer.svg?style=flat)](https://www.npmjs.org/package/shopify-importer)
[![NPM Downloads](https://img.shields.io/npm/dm/shopify-importer.svg?style=flat)](https://www.npmjs.org/package/shopify-importer)

A tool for importing smart collections into Shopify

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
  
## CSV Format
  | Handle        | Title         | Image         | Description    | Column        | Relation      | Condition     |
  | ------------- | ------------- | ------------- | -------------- | ------------- | ------------- | ------------- |
  | product-title | Product Title | http://...    | Lorem Ipsum... | tag           | equals        | tag-name      |
  
  1. handle (optional)
  2. title (required)
  3. image (optional)
  4. description (optional)
  5. column (required)
    
      **The following columns are restricted to text relations:**
      * title
      * type
      * vendor
      * variant_title
      
      **The following columns are restricted to number relations:**
      * variant_compare_at_price
      * variant_weight
      * variant_inventory
      * variant_price
      
      **The following column is restricted to the equals relation:**
      * tag
    
  6. relation (required)
  
      **Number relations:**
      * greater_than
      * less_than
      * equals
      * not_equals
      
      **Text relations:**
      * equals
      * not_equals
      * starts_with
      * ends_with
      * contains
      * not_contains
      
  7. condition (required)
  