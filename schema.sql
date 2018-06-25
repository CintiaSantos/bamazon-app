DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NULL,
    departmennt_name VARCHAR(50) NULl,
    price DECIMAL(10, 2) NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, departmennt_name, price, stock_quantity)
VALUES ("coffee", "grocery", 10, 6),
 ("ipad", "electronics", 120, 10),
 ("conditioner", "hair", 40, 12),
 ("cups", "household", 14, 22),
 ("tea", "grocery", 7, 5),
 ("watermelon", "grocery", 9, 10),
 ("margaritas", "alcohol", 18, 4),
 ("martinis", "breakfast", 7, 5),
 ("bacon", "grocery", 6, 32),
 ("blanket", "household", 90, 13),
 ("applejuice", "grocery", 56, 15);