export class ProductArray {
    constructor(products) {
        this.products = products.slice();
    }
    getProductById(products, someId) {
        let productMatch;
        products.forEach(product => {
            if (someId === product.id) {
                productMatch = product;
            }
        });

        return productMatch;
    }

    getRandomProduct() {
        const randomProductIndex = Math.floor(Math.random() * this.products.length);
    
        return this.products[randomProductIndex];
    }
}