DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
   item_id INTEGER(50) AUTO_INCREMENT NOT NULL,
   product_name VARCHAR(255) NOT NULL,
   department_name VARCHAR(255) NOT NULL,
   price INT(12.2) NOT NULL,
   stock_quantity INT (11) NOT NULL
);

SELECT*FROM products;