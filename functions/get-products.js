const osmosis = require('osmosis');

async function getProducts() {
    return new Promise((resolve, reject) => {
        /**
         * @type {Object[]}
         * @const
         */
        let resultsArray = [];
        osmosis.get('https://wltest.dns-systems.net')
        .find('.package')
        .set({
            title: '.header > h3',
            packageName: '.package-features .package-name',
            packageDescription: '.package-features .package-description',
            packagePrice: '.package-features .package-price > .price-big',
            packageDiscount: '.package-features .package-price > p'
        })
        .data(
            /**
             *
             * @param {Object} result
             * @property {string} result.title
             * @property {string} result.packageName
             * @property {string} result.packageDescription
             * @property {string} result.packageDiscount
             */
            result => resultsArray.push(result)
        )
        .error(e => reject(e))
        .done(() => {
            const json = resultsArray.map(result => {
            // const discount = (result.packageDiscount[i])?.match(/£[0-9.]*/)[0];
            return {
                title: result.title,
                description: result.packageName + result.packageDescription,
                price: result.packagePrice,
                discount: result.packageDiscount ? result.packageDiscount.match(/£[0-9.]*/)[0] : null // match only the price in the string
            };
            })
            json.sort((a, b) => {
            // Replace the currency and compare as numbers for best result
            // Sort in descending order
            return  Number(b.price.replace(b.price[0], '')) - Number(a.price.replace(a.price[0], ''));
            })
            resolve(
                json
            );
        })
    });
}
const products = getProducts();
module.exports = products;