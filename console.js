const products = require("./functions/get-products");


products.then(resp => {
    console.log(resp);
})