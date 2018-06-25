var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log('id:', connection.threadId);
    // run the start function after the connection is made to prompt the user
    showProducts();
});

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(
                "Item_Id: " +
                res[i].item_id +
                " || Product: " +
                res[i].product_name +
                " || Price: " +
                res[i].price
            );
        }
    sale();
    });
}

function sale() {
    inquirer
    .prompt([
        {
            name: "product",
            type: "input",
            message: "Please enter the item_id of the product you would like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return "Please enter a valid number"
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you would like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return "Please enter a valid number"
            }
        }
    ]).then(function(input) {
        var item = input.product;
        var quantity = input.quantity;

        var query = "SELECT item_id, stock_quantity, price FROM products WHERE ?";
  
        connection.query(
          query,
          {
            item_id: item
          },
          function(err, res) {
            var itemId = res[0].item_id;
            var quantityInStock = res[0].stock_quantity;
            var price = res[0].price;
            if (res.length === 0) {
              console.log('Sorry, we do not carry this product');
              showProducts();
            } else if (quantityInStock < quantity) {
              console.log('Insufficient quantity!');
              showProducts();
            } else {
              var cost = quantity * price;
              quantityInStock -= quantity;
              console.log(
                'Thanks for your purchase. Your total cost is $' + cost
              );
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: quantityInStock
                  },
                  {
                    item_id: itemId
                  }
                ],
                function(error) {
                  if (error) throw err;
                  console.log("Quantity successfully updated!");
                  showProducts();
                }
              );
            }
          }
        );
      });
}