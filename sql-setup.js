let username = "root"; //"___YOUR_USERNAME___"
let password = "12345678"; //"___PASSWORD___"
let host = "localhost"; 
let database = "invoices-db";

module.exports.username = username;
module.exports.password = password; 
module.exports.host = host;
module.exports.database = database;

/*
CREATE TABLE invoices ( id SERIAL, invoice_number VARCHAR(64) NOT NULL,po_number VARCHAR(64) NOT NULL, due_date DATE NOT NULL, amount_cents BIGINT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
*/