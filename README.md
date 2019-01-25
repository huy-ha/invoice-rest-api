# Invoice REST API
Invoice REST API is an implementation of a simple Invoice REST API in Node.js, Express and MySQL.

## Installation
Use the package manager **npm** to install all dependencies
```bash
npm install invoice-rest-api
```
## Usage
First, start the server
```bash
npm start
```
Now your server is listening on port 3000. You can make GET and POST requests to localhost:3000/v1/invoices.

GET parameters:
 - **invoice_number**: the invoice number you want to query (alphanumerial)
 - **po_number**: the product number you want to query (alphanumerical)
 - **page**: the page number you want in the query results (integer, defaults to 1)
 - **page_limit**: the number of items in one query results page (integer, defaults to 100)

NOTE: if no parameters are specified, all invoices in databases are matched
