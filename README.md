# Invoice REST API
Invoice REST API is an implementation of a simple Invoice REST API in Node.js, Express and MySQL.

## Installation
With [git](https://git-scm.com/downloads) and [npm](https://www.npmjs.com/get-npm) installed, clone the repo and install all dependencies
```bash
git clone https://github.com/huy-ha/invoice-rest-api.git
cd invoice-rest-api
npm install
```
## Usage
Firstly, with [MySQL Server](https://dev.mysql.com/downloads/mysql/) installed, create a new database, then import the dump file include with the repo:
``` bash
mysql -u root -p #login to root account
mysql> CREATE DATABASE invoice_db; #create new database called invoice_db
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '__PASSWORD__';
mysql> exit
mysql -u root -p invoice_db < invoices-db_invoices.sql #import included dump file into new database
```
The line above ```mysql> exit``` is to prevent authentication errors. Replace ```'__PASSWORD__'``` with the root password. The dumpfile contains 5 invoice entries.

Secondly, input your login details into the sql-setup.js file:
```js
let username = "___USERNAME___";
let password = "___PASSWORD___";
```

Thirdly, start the server:
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

## Using the API with other databases
To connect to other MySQL databases other than the included ```invoices-db_invoices.sql```, input the database details into sql-setup.js
```js
let username = "___USERNAME___";
let password = "___PASSWORD___";
let host = "__HOST__"; 
let database = "__DATABASE__";
```
NOTE: The database must have an "invoices" table in the following schema:
```sql
CREATE TABLE invoices ( 
    id SERIAL, 
    invoice_number VARCHAR(64) NOT NULL,
    po_number VARCHAR(64) NOT NULL, 
    due_date DATE NOT NULL,
    amount_cents BIGINT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);
```