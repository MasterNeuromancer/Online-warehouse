const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "mysql88",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(err => {
    if (err) throw err;
    displayStock();
    // run the displayStock(); function after the connection is made to prompt the user

});

function displayStock() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    });
}



function start() {
    inquirer
        .prompt({
            //The first should ask them the ID of the product they would like to buy.
            //The second message should ask how many units of the product they would like to buy.
            name: "whichProduct",
            message: "What is the ID of the product you would like to buy?",
        })
        .then(answer => {
            // based on their answer, either call the bid or the post functions
            console.log(answer.whichProduct);
            productChosen = answer.whichProduct;
            // connection.end();
            howMany();
        });
}

var productChosen;


function howMany() {
    connection.query("SELECT * FROM products Where item_id = ?", [productChosen], (err, results) => {
        if (err) throw err;
        // console.table(results);
        // console.log(results[0].stock_quantity);
        const inStock = results[0].stock_quantity;

        const price = results[0].price;


        inquirer
            .prompt({
                //The first should ask them the ID of the product they would like to buy.
                //The second message should ask how many units of the product they would like to buy.
                name: "numberUnits",
                message: "How many units would you like to buy?",
            })
            .then(answer => {
                // based on their answer, either call the bid or the post functions
                // console.log(inStock - answer.numberUnits);
                if (inStock >= answer.numberUnits) {
                    // update table to new amount (current stock - answer.numberUnits)
                    console.log("hooray!");
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: inStock - answer.numberUnits
                            },
                            {
                                item_id: productChosen
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log(`Your cost is $${price* parseInt(answer.numberUnits)}.`);
                        }
                    );
                    // connection.query("SELECT * FROM products", (err, results) => {
                    //     if (err) throw err;
                    //     console.table(results);
                    //     // start();
                    // });
                }
                else {
                    console.log("not enough units!")
                }
                connection.end();
                console.log("Goodbye!");
            });
    });
}