
export const compare = (products, id) => {
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product.id === id) {
            return product;
        }
    }
};