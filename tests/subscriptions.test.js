const products = require("../functions/get-products");

describe("Test result is valid", () => {

    test("Any product must have the required properties", () => {
        return products.then(response => {
                expect(response[0]).toHaveProperty('title');
                expect(response[0]).toHaveProperty('description');
                expect(response[0]).toHaveProperty('price');
                expect(response[0]).toHaveProperty('discount');
            })
    });

    test("Get results is ordered by price in descending order", () => {
        return products.then(
                response => {
                    // console.log(response.body[0]);
                    let sorted;
                    for(let i = 0; i < response.length - 1; i++) {
                        const a = response[i];
                        const b = response[i + 1];
                        sorted = Number(a.price.replace(a.price[0], ''))
                            >=
                            Number(b.price.replace(b.price[0], ''))
                        if(i === false) break;
                    }

                    expect(sorted).toBeTruthy()
                }
            )
    })
});